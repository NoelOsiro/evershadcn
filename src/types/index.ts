export type Post = {
    id: string
    title: string
    description: string
    status: 'draft' | 'published'
    createdAt: string
    content: string
    updatedAt: string
    type: 'tribute' | 'memorial' | 'obituary'
    imageUrl: string
    userId: string
    
  }