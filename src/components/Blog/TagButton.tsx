const TagButton = ({ href, text,handleClick }: { href?: string; text: string,handleClick?:()=> void; }) => {
  return (
    href ? (
      <a
      href={href}
      className="bg-gray-light mb-3 lg:mr-3  inline-flex items-center justify-center rounded-sm px-3 lg:px-4 py-2 text-sm text-black duration-300 hover:bg-primary hover:text-white dark:bg-[#2C303B] dark:text-white dark:hover:bg-primary"
    >
      {text}
      
    </a>) : (
      <button
      onClick={handleClick}
      className="bg-gray-light mb-3 lg:mr-3 inline-flex items-center justify-center rounded-sm px-3 lg:px-4 py-2 text-sm text-black duration-300 hover:bg-primary hover:text-white dark:bg-[#2C303B] dark:text-white dark:hover:bg-primary"
    >
      {text}
      
    </button>
    )
    
  );
};

export default TagButton;
