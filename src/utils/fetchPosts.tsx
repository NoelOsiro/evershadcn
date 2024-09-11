import { Post } from "@/types";

export const fetchPosts = async (userId: string): Promise<Post[] | null> => {
  if (!userId) {
    console.error('fetchPosts called with empty userId');
    return null;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${apiUrl}/api/posts?userId=${userId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return null;
    }
    const data = await res.json();    
    if (!data.posts || !Array.isArray(data.posts)) {
      console.error('Invalid data structure received:', data);
      return null;
    }
    return data.posts;
  } catch (error) {
    return null;
  }
};