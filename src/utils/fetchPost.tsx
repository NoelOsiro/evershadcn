import { Post } from "@/types";

export const fetchPost = async (postId: string): Promise<Post | null> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/getPosts?postId=${postId}`);
  
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return null;
      }
  
      const data = await res.json();
      return data.posts[0];
    } catch (error) {
      return null;
    }
  };