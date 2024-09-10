import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  try {
    const searchParams = req.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    const page = parseInt(searchParams.get('page') || '1');
    const commentsPerPage = 5;
    const start = (page - 1) * commentsPerPage;
    const end = start + commentsPerPage - 1;

    if (!postId) {
      return NextResponse.json({ message: 'Post ID not provided' }, { status: 400 });
    }

    const { data, error: getError, count } = await supabase
      .from('comments')
      .select('*', { count: 'exact' })
      .eq('postId', postId)
      .range(start, end)
      .order('createdAt', { ascending: false });

    if (getError) {
      throw getError;
    }

    return NextResponse.json({ comments: data, totalComments: count }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return NextResponse.json({ message: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  try {
    const { content, name, postId } = await req.json();

    if (!content || !name || !postId) {
      return NextResponse.json({ message: 'Missing comment data' }, { status: 400 });
    }

    const { data, error: insertError } = await supabase
      .from('comments')
      .insert([
        { content, name, postId }
      ]);

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error('Failed to create comment:', error);
    return NextResponse.json({ message: 'Failed to create comment' }, { status: 500 });
  }
}
