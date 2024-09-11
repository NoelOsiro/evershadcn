import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a compassionate eulogy writer. Create a heartfelt and respectful eulogy based on the information provided." },
        { role: "user", content: prompt }
      ],
      max_tokens: 500,
    });

    const generatedEulogy = completion.choices[0].message.content;

    return NextResponse.json({ eulogy: generatedEulogy });
  } catch (error) {
    console.error('Error generating eulogy:', error);
    return NextResponse.json({ error: 'Failed to generate eulogy' }, { status: 500 });
  }
}