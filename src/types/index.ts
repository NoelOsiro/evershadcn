export type Post = {
  id: string
  createdAt: string
  title: string
  description: string
  status: 'draft' | 'published'
  content: string
  updatedAt: string | null
  type: 'memorial' | 'tribute' | 'obituary'
  imageUrl: string
  userId: string
  causeOfDeath: string
  dateOfBirth: string
  dateOfDeath: string
  placeOfDeath: string
  fullName: string
}
export type  Contribution = {
  id:number;
  postId: string;
  channel: string;
  account_no: string;
}