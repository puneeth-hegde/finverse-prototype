import Groq from 'groq-sdk';
import { NextResponse } from 'next/server';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are FinVerse AI, a helpful and friendly financial advisor for users in India. 
Your goal is to provide clear, simple, and encouraging financial advice. 
You are not a licensed financial advisor, so you must always include a disclaimer: 
"Please remember, I am an AI assistant and this is not professional financial advice. Always consult with a qualified professional."
Keep your answers concise and easy to understand. Use emojis to make the conversation engaging.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      model: 'llama-3.1-8b-instant',
    });

    const reply = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Groq API Error:', error);
    return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });
  }
}