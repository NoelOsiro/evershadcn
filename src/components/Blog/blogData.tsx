import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "Mike Herman's Memorial Service",
    paragraph:
      "The memorial service for Mike Herman will be held at the St. John's Church on the 25th of May, 2025. The service will begin at 10:00 AM and will be followed by a reception at the church hall. All are welcome to attend.",
    image: "/images/blog/blog-01.jpg",
    author: {
      name: "Jake Herman",
      image: "/images/blog/author-02.png",
      designation: "Son of the deceased",
    },
    tags: ["Memorial"],
    publishDate: "Feb 2024",
  },
  {
    id: 2,
    title: "In Loving Memory of Farah Johnson",
    paragraph:
      "Farah Johnson, 78, passed away on the 15th of May, 2025. She was a loving father, grandfather, and friend. She will be dearly missed by all who knew her. A memorial service will be held at the St. John's Church on the 25th of May, 2025. The service will begin at 10:00 AM and will be followed by a reception at the church hall. All are welcome to attend.",
    image: "/images/blog/blog-02.jpg",
    author: {
      name: "Linda Johnson",
      image: "/images/blog/author-01.png",
      designation: "Daughter of the deceased",
    },
    tags: ["Obituary"],
    publishDate: "Jan 2024",
  },
  {
    id: 3,
    title: "Celebrating the life of Suzzy Jackson",
    paragraph:
      "Join us in celebrating the life of Suzzy Jackson on the 25th of May, 2025. The celebration will be held at the St. John's Church at 10:00 AM. All are welcome to attend.",
    image: "/images/blog/blog-03.jpg",
    author: {
      name: "James Blakely",
      image: "/images/blog/author-03.png",
      designation: "Son of the deceased",
    },
    tags: ["Tribute"],
    publishDate: "July 2024",
  },
];
export default blogData;
