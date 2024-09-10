
import { createClient } from '@/utils/supabase/server';
import { NextResponse, NextRequest } from 'next/server'


  export async function GET(req: NextRequest) {
    const supabase = createClient();
    try {
      const searchParams = req.nextUrl.searchParams;
      const postId = searchParams.get('postId');
  
      if (!postId) {
        return NextResponse.json(
          { message: 'Post ID not provided' },
          { status: 400 }
        );
      }
  
      // Fetch the post based on postId
      const { data: filteredPosts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId);
  
      if (error) {
        return NextResponse.json(
          { message: 'Failed to fetch post', error: error.message },
          { status: 500 }
        );
      }
  
      if (!filteredPosts || filteredPosts.length === 0) {
        return NextResponse.json(
          { message: 'No post found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ posts: filteredPosts }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to fetch post', error},
        { status: 500 }
      );
    }
  }
  