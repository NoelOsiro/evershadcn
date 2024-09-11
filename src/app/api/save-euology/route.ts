import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';




export async function POST(req: Request) {
    const supabase = createClient();
  try {
    const { postId, eulogy } = await req.json();

    if (!postId || !eulogy) {
      return NextResponse.json({ error: 'Post ID and eulogy are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('eulogies')
      .insert({ post_id: postId, content: eulogy })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error saving eulogy:', error);
    return NextResponse.json({ error: 'Failed to save eulogy' }, { status: 500 });
  }
}