'use client'
import SinglePost from "@/components/Post/SinglePost";
import { Post, PostPreview } from "@/types/post";
import BlogNextBtns from './BlogNextBtns';
import usePosts from "@/hooks/usePosts";

const Blog = () => {
  const { posts, error, loading } = usePosts();
  let message = 'success';
  if (error) {
    message = 'Failed to fetch posts';
  }

  return (
    <div className="container">
      <div className="-mx-4 flex flex-wrap justify-center">
        {loading ? (
          <div className="flex justify-center items-center h-20">
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : (
          <>
            {message === "success" && posts.length === 0 ? (
              <div className="text-center text-red-500 h-20">No post found</div>
            ) : (
              posts.map((post: Post) => (
                <div key={post.id} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                  <SinglePost post={post} />
                </div>
              ))
            )}
          </>
        )}
      </div>
      <BlogNextBtns />
    </div>
  );
};

export default Blog;
