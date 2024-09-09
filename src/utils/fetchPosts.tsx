import { Post } from "@/types";


export const fetchPosts = async (userId: string): Promise<Post[] | null> => {
  try {
    const res = await fetch(`http://localhost:3000//api/posts?userId=${userId}`);

    if (!res.ok) {
      console.error('Failed to fetch posts');
      return null;
    }

    const data = await res.json();
    return data.posts;
  } catch (error) {
    return null;
  }
};
