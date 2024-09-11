export const maxDuration = 60;
import { NextResponse } from 'next/server';

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  throw new Error('HUGGINGFACE_API_KEY is not set in the environment variables');
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = "You are a compassionate eulogy writer. Create a heartfelt and respectful eulogy based on the following information, avoid repetition,be remorseful:";
    const fullPrompt = `${systemPrompt}\n\n${prompt}\n\nEulogy:`;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/bigscience/bloom',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API responded with status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0 || typeof data[0].generated_text !== 'string') {
      throw new Error('Unexpected response format from Hugging Face API');
    }

    const generatedEulogy = data[0].generated_text.replace(fullPrompt, '').trim();

    return NextResponse.json({ eulogy: generatedEulogy });
  } catch (error) {
    console.error('Error generating eulogy:', error);
    return NextResponse.json({ error: 'Failed to generate eulogy' }, { status: 500 });
  }
}