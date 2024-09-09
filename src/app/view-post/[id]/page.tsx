import PostHeader from '@/components/Blog/PostHeader';
import { Navbar } from '@/components/Navbar';
import { Post } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN UI imports
import './post.css';
import ShareSection from '@/components/Blog/ShareSection';
import CommentSection from '@/components/Blog/commentSection';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';


export default async function ViewPostPage({ params }: { params: { id: string } }) {

  const user = await getCurrentUser();
  const { id } = params;
  const Post = await fetchPost(id);
  if (!user) {
    return (
      redirect('/signin')
    )
  }
  if (!Post) {
    return <div>Loading...</div>;
  }

  const postUrl = `http://localhost:3000/posts/${id}`; // Example post URL

  return (
    <div className="bg-background text-primary min-h-screen flex flex-col">
      <Navbar />
      <PostHeader
        imageUrl={Post.imageUrl}
        title={Post.title}
        description={Post.description}
        status={Post.status}
        createdAt={Post.createdAt}
        type={Post.type}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main content column */}
          <article className="max-w-full">
            <section className="py-12 md:py-16 lg:py-24">
              <div>
                <h1 className="text-3xl font-bold">{Post.title}</h1>
                {/* React Quill content */}
                <div
                  className="prose dark:prose-invert mt-8"
                  dangerouslySetInnerHTML={{ __html: Post.content }}
                />
                {/* Share Section */}
                <ShareSection postUrl={postUrl} />

                {/* Comments Section */}
                <CommentSection />
              </div>
            </section>
          </article>

          {/* Sidebar column */}
          <aside className="space-y-8">
            {/* Related Posts Card */}
            <Card className="bg-secondary text-primary shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Related Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="/posts/1" className="text-primary hover:underline">Post 1</a>
                  </li>
                  <li>
                    <a href="/posts/2" className="text-primary hover:underline">Post 2</a>
                  </li>
                  <li>
                    <a href="/posts/3" className="text-primary hover:underline">Post 3</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Latest Updates Card */}
            <Card className="bg-secondary text-primary shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Latest Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="/updates/1" className="text-primary hover:underline">Update 1</a>
                  </li>
                  <li>
                    <a href="/updates/2" className="text-primary hover:underline">Update 2</a>
                  </li>
                  <li>
                    <a href="/updates/3" className="text-primary hover:underline">Update 3</a>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Explore More Card */}
            <Card className="bg-secondary text-primary shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Explore More</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="/explore/feature1" className="text-primary hover:underline">Feature 1</a>
                  </li>
                  <li>
                    <a href="/explore/feature2" className="text-primary hover:underline">Feature 2</a>
                  </li>
                  <li>
                    <a href="/explore/feature3" className="text-primary hover:underline">Feature 3</a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}

export const fetchPost = async (postId: string): Promise<Post | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/getPosts?postId=${postId}`);

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
