import PostHeader from '@/components/BlogPost/PostHeader';
import './post.css';
import ShareSection from '@/components/BlogPost/ShareSection';
import CommentSection from '@/components/BlogPost/commentSection';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/BlogPost/Sidebar';
import { fetchPost } from '@/utils/fetchPost';


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
    <div className="bg-background text-primary min-h-screen flex flex-col mt-24">
      
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
                <CommentSection postId={Post.id} />
              </div>
            </section>
          </article>

          {/* Sidebar column */}
          <Sidebar/>
        </div>
      </main>
    </div>
  );
}


