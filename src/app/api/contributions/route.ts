import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  try {
    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get('postId');
   

    if (!postId) {
      return NextResponse.json({ message: 'Post ID not provided' }, { status: 400 });
    }

    const { data, error: getError } = await supabase
      .from('contributions')
      .select('*', { count: 'exact' })
      .eq('postId', postId)

    if (getError) {
      throw getError;
    }

    return NextResponse.json({ data}, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch contributions:', error);
    return NextResponse.json({ message: 'Failed to fetch contributions' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const { channel, account_no, postId } = await req.json();

    if (!channel || !account_no || !postId) {
      return NextResponse.json({ message: 'Missing contribution data' }, { status: 400 });
    }

    const { data, error: insertError } = await supabase
      .from('contributions')
      .insert([
        { channel, account_no, postId }
      ]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Failed to create contribution:', error);
    return NextResponse.json({ message: 'Failed to create contribution' }, { status: 500 });
  }
}
