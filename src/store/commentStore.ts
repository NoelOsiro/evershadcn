
import { create } from 'zustand';

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentStore {
  comments: Comment[];
  totalComments: number;
  currentPage: number;
  commentsPerPage: number;
  isLoading: boolean;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  fetchComments: (postId: string, page: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  totalComments: 0,
  currentPage: 1,
  commentsPerPage: 5,
  isLoading: false,

  addComment: async (postId, comment) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...comment,
          postId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        set(state => ({
          comments: [{ ...comment, id: data.data[0].id, createdAt: new Date().toISOString() }, ...state.comments],
          totalComments: state.totalComments + 1,
          isLoading: false,
        }));
      } else {
        console.error('Failed to add comment:', data.message);
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
      set({ isLoading: false });
    }
  },

  fetchComments: async (postId, page) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/comments?postId=${postId}&page=${page}`);
      const data = await response.json();

      if (response.ok) {
        set({
          comments: data.comments,
          totalComments: data.totalComments,
          currentPage: page,
          isLoading: false,
        });
      } else {
        console.error('Failed to fetch comments:', data.message);
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      set({ isLoading: false });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));
