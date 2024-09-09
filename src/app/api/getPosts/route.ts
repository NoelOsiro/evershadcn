import { Post } from '@/types';
import { NextResponse, NextRequest } from 'next/server'


const dummyPosts: Post[] = [
  {
    id: "1",
    title: "In Memory of John Doe",
  description: "A loving father, husband, and friend who touched many lives with his kindness and generosity.",
    status: "published",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-15",
    content: `
      <h2>Life and Legacy of John Doe</h2>
      <p>John Doe was born on March 15, 1965, in Springfield. Throughout his life, he was known for his unwavering love for his family, his passion for helping others, and his dedication to community service. He was a man of quiet strength, patience, and humility, always putting the needs of others before his own.</p>
  
      <h3>Early Life</h3>
      <p>John grew up in a small town with his parents and three siblings. He enjoyed simple pleasures such as playing baseball, fishing, and spending time with his family. After completing high school, John pursued a degree in engineering, where he excelled and made lifelong friends.</p>
  
      <h3>Family</h3>
      <p>John married the love of his life, Jane Doe, in 1990. Together, they raised two wonderful children, Emily and Michael, who were the pride and joy of John’s life. He cherished every moment spent with his family, and his devotion to them was evident in everything he did.</p>
      
      <h3>Achievements</h3>
      <ul>
        <li>Completed a Master's degree in Engineering from Springfield University.</li>
        <li>Worked as a Senior Engineer at ABC Corporation for over 25 years.</li>
        <li>Volunteered regularly at local shelters and food banks.</li>
        <li>Coached youth baseball teams for over a decade, impacting the lives of many young athletes.</li>
      </ul>
  
      <h3>Memories Shared by Loved Ones</h3>
      <p>John’s friends and family recall fond memories of his sense of humor, his kindness, and his ability to make everyone around him feel loved and valued.</p>
      <blockquote>
        "John was a light in our lives. He had a way of making people feel important, and his laughter was infectious. He will be deeply missed." - Sarah, longtime friend.
      </blockquote>
  
      <h3>Favorite Quotes</h3>
      <ul>
        <li>"The best way to find yourself is to lose yourself in the service of others." – Mahatma Gandhi</li>
        <li>"Family is not an important thing, it’s everything." – Michael J. Fox</li>
      </ul>
  
      <h3>Funeral Service Details</h3>
      <p>A memorial service will be held at Springfield Memorial Chapel on May 20, 2023, at 10:00 AM. All friends and family are welcome to attend as we celebrate John's life and legacy.</p>
    `,
    type: "memorial",
    imageUrl: "/images/R.jpeg",
    userId: "2d0b51cb-2fa6-41fd-bb35-cd1f81d722f6"
  }
  ,
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
      const postId = searchParams.get('postId');
      if (!postId) {
        return NextResponse.json({ message: 'User ID or Post ID not provided' }, { status: 400 });
      }
  
      let filteredPosts = dummyPosts;
  
      // Filter by postId if present
      if (postId) {
        filteredPosts = filteredPosts.filter((post) => post.id === postId);
      }
  
      if (filteredPosts.length === 0) {
        return NextResponse.json({ message: 'No posts found' }, { status: 404 });
      }
  
      return NextResponse.json({ posts: filteredPosts }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Failed to fetch posts' }, { status: 500 });
    }
  }

