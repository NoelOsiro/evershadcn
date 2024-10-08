import SectionTitle from "../Common/SectionTitle";
import blogData from "./blogData";
import SingleBlog from "./SingleBlog";

const Blog = () => {
  return (
    <section
      id="blog"
      className=" py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Recent Obituaries"
          paragraph="Browse through our recent obituaries and honor the memories of those who have passed away."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
