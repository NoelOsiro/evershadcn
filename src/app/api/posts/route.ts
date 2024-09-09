import { Post } from '@/types';
import { NextResponse, NextRequest } from 'next/server'


const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'In Memory of John Doe',
    description: 'A loving father and husband who touched many lives.',
    status: 'published',
    createdAt: '2023-05-01',
    updatedAt: '2023-05-15',
    content: 'John Doe was a kind and generous person',
    type: 'memorial',
    imageUrl: '/images/R.jpeg',
    userId: '2d0b51cb-2fa6-41fd-bb35-cd1f81d722f6',
  },
  {
    id: '2',
    title: 'Remembering Jane Smith',
    description: 'A brilliant scientist and a dear friend to many.',
    status: 'draft',
    createdAt: '2023-06-10',
    content: 'Jane Smith was a brilliant scientist who made many contributions to the field of physics.',
    updatedAt: '2023-06-10',
    type: 'tribute',
    imageUrl: '/images/R.jpeg',
    userId: '2d0b51cb-2fa6-41fd-bb35-cd1f81d722f6',
  },
  {
    id: '3',
    title: 'Tribute to Dr. Emily Brown',
    description: 'A dedicated physician who saved countless lives.',
    status: 'published',
    createdAt: '2023-04-22',
    content: 'Dr. Emily Brown was a dedicated physician who saved countless lives during her career.',
    updatedAt: '2023-05-05',
    type: 'obituary',
    imageUrl: '/images/R.jpeg',
    userId: '2d0b51cb-2fa6-41fd-bb35-cd1f81d722f6',
  },
  {
    id: '4',
    title: 'Honoring Captain Michael Johnson',
    description: 'A brave firefighter who put others before himself.',
    status: 'draft',
    createdAt: '2023-06-15',
    content: 'Captain Michael Johnson was a brave firefighter who put others before himself.',
    updatedAt: '2023-06-15',
    type: 'memorial',
    imageUrl: '/images/R.jpeg',
    userId: '2d0b51cb-2fa6-41fd-bb35-cd1f81d722f6',
  },
]

export async function GET(req: NextRequest) {
    try {
      const searchParams = req.nextUrl.searchParams;
      const userId = searchParams.get('userId');
      if (!userId) {
        return NextResponse.json({ message: 'User ID or Post ID not provided' }, { status: 400 });
      }
  
      let filteredPosts = dummyPosts;
  
      // Filter by userId if present
      if (userId) {
        filteredPosts = filteredPosts.filter((post) => post.userId === userId);
      }
  
      if (filteredPosts.length === 0) {
        return NextResponse.json({ message: 'No posts found' }, { status: 404 });
      }
  
      return NextResponse.json({ posts: filteredPosts }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }
  }

