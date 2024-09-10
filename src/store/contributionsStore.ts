import { create } from 'zustand';

interface Contribution {
  id: number;
  postId: string;
  channel: string;
  account_no: string;
}

interface ContributionState {
  contributions: Contribution[];
  addContribution: (contribution: Contribution) => void;
  postContribution: (postId: string, channel: string, account_no: string) => Promise<void>;
  fetchContributions: (postId: string) => Promise<void>;
}

export const useContributionsStore = create<ContributionState>((set) => ({
  contributions: [],
  
  addContribution: (contribution) => 
    set((state) => ({
      contributions: [...state.contributions, contribution],
    })),

  postContribution: async (postId: string, channel: string, account_no: string) => {
    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, channel, account_no }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to post contribution');
      }

      // Assuming the backend returns the newly created contribution
      const newContribution = await response.json();
      set((state) => ({
        contributions: [...state.contributions, newContribution],
      }));
    } catch (error) {
      console.error('Error posting contribution:', error);
    }
  },

  fetchContributions: async (postId: string) => {
    try {
      const response = await fetch(`/api/contributions?postId=${postId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contributions');
      }

      const result = await response.json();
      // Ensure that result.data is an array
      set({ contributions: Array.isArray(result.data) ? result.data : [] });
    } catch (error) {
      console.error('Error fetching contributions:', error);
      set({ contributions: [] }); // Set to empty array on error
    }
  },
}));
