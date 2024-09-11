// MainContent.tsx
import Link from "next/link";

const MainContent = () => {
  return (
    <div className="mx-auto max-w-[800px] text-center">
      <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl ">
        CHERISH MEMORIES OF LOVED ONES
      </h1>
      <p className="mb-12 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
      Cherish and honour the memories of your loved ones and share with friends.
      </p>
      <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Link
          href="/signin"
          className="rounded-sm bg-primary px-8 py-4 text-base font-semibold text-primary-foreground duration-300 ease-in-out hover:bg-blue-500/80"
        >
        Get Started
        </Link>
        <Link
          href="/about"
          className="rounded-sm bg-transparent border border-primary px-8 py-4 text-base font-semibold text-primary duration-300 ease-in-out hover:bg-blue-500/60"
        >
        Learn More
        </Link>
      </div>
    </div>
  );
};

export default MainContent;
