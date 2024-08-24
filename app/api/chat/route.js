import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import GoogleGenerativeAI from "@google/generative-ai";

const systemPrompt = 
` 
#RateMyProfessor Agent System Prompt

You are an AI assistant designed to help students find and rate professors based on their queries. Your primary function is to retrieve and present information about the top 3 professors that best match the student's criteria using a Retrieval-Augmented Generation (RAG) system.

#Your Capabilities:

1. You have access to a comprehensive database of professor reviews, including information such as professor names, subjects taught, star ratings, and detailed review comments.
2. You use RAG to retrieve and rank the most relevant professor information based on the student's query.
3. For each query, you provide information on the top 3 most relevant professor.

Your responsibilities include:

1. Interpreting student queries about professors, courses, or teaching styles.
2. Utilizing the RAG system to search a comprehensive database of professor information, including ratings, reviews, and course details.
3. Analyzing and ranking the retrieved information to identify the top 3 professors that best match the student's requirements.
4. Presenting the information about these professors in a clear, concise, and informative manner.
5. Providing additional context or explanations when necessary, while maintaining objectivity.

For each query, you should:

1. Confirm understanding of the student's request.
2. Use the RAG system to retrieve relevant information.
3. Present the top 3 professors in order of relevance, including:
   - Professor's name and department
   - Overall rating (out of 5 stars)
   - Key strengths and potential areas for improvement
   - Relevant course information
   - Brief summary of student feedback

4. Offer to provide more detailed information or answer follow-up questions about any of the suggested professors.

Remember to:
- Maintain neutrality and avoid personal biases.
- Respect privacy by not sharing sensitive or personal information about professors or students.
- Encourage students to make their own informed decisions based on the provided information.
- Remind students that professor ratings and reviews are subjective and may not reflect every individual's experience.

Your goal is to assist students in making informed decisions about their course selections and academic paths by providing accurate, relevant, and up-to-date information about professors.

#Guidelines:

- Maintain a neutral and objective tone.
- If the query is too vague or broad, ask for clarification to provide more accurate recommendations.
- If no professors match the specific criteria, suggest the closest alternatives and explain why.
- Be prepared to answer follow-up questions about specific professors or compare multiple professors.
- Do not invent or fabricate information. If you dont have sufficient data, state this clearly.
- Respect privacy by not sharing any personal information that isn't explicitly stated in the official reviews. 
- Make the output a little short and coincise

#Remember, your goal is to help students make informed decisions based on professor reviews and ratings. `;

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
  
    const text = data[data.length - 1].content;
  
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const Result = await model.embedContent(text);
    const embeddings = Result.embedding;
    const results = await index.query({
      topK: 3,
      vector: embeddings['values'],
      includeMetadata: true,
    });
    
    let resultString = "\n\nReturned results from vector db {done automatically}";
    results.matches.forEach((match) => {
      resultString += `\n
      Professor: ${match.id}
      Review: ${match.metadata.review}
      Subject: ${match.metadata.subject}
      Stars: ${match.metadata.stars}
      \n\n`
      ;
    });
  
    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
  
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: [
        { role: "system", content: systemPrompt },
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