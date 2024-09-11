import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import BackgroundSVG from "./BackgroundSVG";
import BottomSVG from "./BottomSVG";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "John Kimathi",
    designation: "Loving Family Member",
    content:
      "EverCherished has helped our family honor the memory of our beloved with grace and dignity. It's a comforting and beautiful platform.",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Alice Njeri",
    designation: "Grateful Friend",
    content:
      "EverCherished made it easy for me to share my heartfelt condolences and memories. It's a place of solace and remembrance.",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "Michael Davies",
    designation: "Appreciative Customer",
    content:
      "I appreciate the care and support EverCherished provides during difficult times. It's a modern and thoughtful tribute platform.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="What Our Users Say"
          paragraph="Discover how EverCherished has touched the lives of many, bringing comfort and solace during difficult times."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
      <BackgroundSVG />
      <BottomSVG />
    </section>
  );
};

export default Testimonials;
