# RateMyProfessor-Using-RAG

---
# Rate My Professor

**Rate My Professor** is an AI-powered assistant designed to help students find the best professors based on their specific needs and preferences. Leveraging a Retrieval-Augmented Generation (RAG) system, It analyzes a comprehensive database of professor reviews to provide concise, relevant, and personalized recommendations, streamlining the decision-making process for students.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Getting Started
npm run dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

# Install pakages
```bash
pip install pip-chill
pip-chill >requirements.txt
pip install -r requirements.txt
```
## 🚀## Features

- **Personalized Professor Recommendations**: Get top 3 professor recommendations based on your specific queries.
- **Comprehensive Review Analysis**: Analyze detailed reviews including teaching style, course difficulty, and grading fairness.
- **Real-time Chat Interface**: Interact with the AI assistant through a user-friendly chat interface.
- **Structured and Concise Information**: Receive well-organized summaries to help you make informed decisions.
- **Privacy and Security**: Handles data securely, without sharing any personal information that isn’t explicitly stated in official reviews.

## 🛠️## Technology Stack

- **Frontend**: React with Material-UI
- **Backend**: Next.js
- **AI Models**: Google Generative AI (Gemini) for text embeddings, OpenRouter for GPT-like interactions
- **Database**: Pinecone for vector storage and retrieval
- **APIs**: Google Generative AI, OpenAI

## 🔧## Installation

1. **Clone the repository**
   ```bash
    git clone https://github.com/Sakil78/RateMyProfessor-AI-Assistant.git
   cd RateMyProfessor-AI-Assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```env
   PINECONE_API_KEY=your-pinecone-api-key
   GEMINI_API_KEY=your-gemini-api-key
   OPENROUTER_API_KEY=your-openrouter-api-key
   ```

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000` in your web browser.

## Usage

- **Interact with Rate My Professor**: Open the web app in your browser and start typing your queries in the chat interface. The AI assistant will provide recommendations based on your inputs.

- **Customizing Recommendations**: You can modify the system prompt or adjust the ranking criteria in the backend to better suit your needs.


---
