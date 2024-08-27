import React from "react";
import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import * as cheerio from "cheerio";

import fetch from "cross-fetch";

global.fetch = fetch;

// Function to extract URLs from a text
function extractUrls(text) {
  const urlRegex = /https:\/\/www\.ratemyprofessors\.com\/professor\/\d+/g;
  return text.match(urlRegex) || [];
}

// Function to replace URLs in a text with processed data
function replaceUrlsInText(text, urls, processed_data) {
  for (let i = 0; i < urls.length; i++) {
    text = text.replace(
      urls[i],
      `${processed_data[i].id} with ${processed_data[i].metadata["rating"]} star rating in ${processed_data[i].metadata["department"]}`
    );
  }
  return text;
}

// Function to scrape a Rate My Professors webpage
async function scrapeWebpage(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const name = $('div.NameTitle__Name-dowf0z-0 span').first().text().trim();
    const lastName = $('div.NameTitle__Name-dowf0z-0 span.NameTitle__LastNameWrapper-dowf0z-2').first().text().trim();
    const fullName = `${name} ${lastName}`;
    const ratingText = $('div.RatingValue__Numerator-qw8sqy-2.liyUjw').text().trim();
    const comments = $('div.Comments__StyledComments-dzzyvm-0').text().trim();
    const departmentName = $('a.TeacherDepartment__StyledDepartmentLink-fl79e8-0').text().trim();

    return {
      name: fullName,
      rating: ratingText,
      review: comments,
      department: departmentName,
    };
  } catch (error) {
    console.error(`Failed to retrieve the webpage. Error: ${error}`);
    return null;
  }
}

// Function to process the text, create embeddings, and upsert to Pinecone
async function upsertPC(text, client, index) {
  const urls = extractUrls(text);
  const processed_data = [];

  for (const url of urls) {
    const data = await scrapeWebpage(url);
    if (!data) continue;

    try {
      const response = await client.embeddings.create({
        input: data.review,
        model: "text-embedding-ada-002",
      });

      const embedding = response.data[0].embedding;
      processed_data.push({
        values: embedding,
        id: data.name,
        metadata: {
          rating: data.rating,
          review: data.review,
          department: data.department,
        },
      });
    } catch (error) {
      console.error(`Failed to create embedding. Error: ${error}`);
    }
  }

  try {
    const upsert_response = await index.upsert(processed_data);
    return replaceUrlsInText(text, urls, processed_data);
  } catch (error) {
    console.error(`Failed to upsert vectors. Error: ${error}`);
    return null;
  }
}

const systemPrompt = `
You are a rate my professor agent to help students find classes, that takes in user questions and answers them.
For every user question, the top 3 professors that match the user question are returned.
Use them to answer the question if needed. Write each sentence in bullet points.
`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.Index("rag").namespace("ns1");
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  let text = data[data.length - 1].content;

  // Process any Rate My Professors URLs found in the text
  if (extractUrls(text).length > 0) {
    text = await upsertPC(text, openai, index);
  }

  // Embedding creation using Google Generative AI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  const Result = await model.embedContent(text);
  const embeddings = Result.embedding;

  // Query Pinecone with the generated embeddings
  const results = await index.query({
    topK: 3,
    vector: embeddings["values"],
    includeMetadata: true,
  });

  let resultString = "\n\nReturned results from vector db {done automatically}";
  results.matches.forEach((match) => {
    resultString += `\n
    Professor: ${match.id}
    Review: ${match.metadata.review}
    Subject: ${match.metadata.subject}
    Stars: ${match.metadata.stars}
    \n\n`;
  });

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    messages: [
      { role: "user", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    stream: true,
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream);
}
