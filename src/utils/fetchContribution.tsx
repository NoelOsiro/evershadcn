import { Contribution} from "@/types";

export const fetchContribution = async (postId: string): Promise<Contribution[] | null> => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/contributions?postId=${postId}`);
  
      if (!res.ok) {
        console.error('Failed to fetch posts');
        return null;
      }
  
      const data = await res.json();
      return data.data;
    } catch (error) {
      return null;
    }
  };