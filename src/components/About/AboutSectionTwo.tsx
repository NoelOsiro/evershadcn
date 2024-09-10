import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <ImageSection />
          <TextSection />
        </div>
      </div>
    </section>
  );
};

export default AboutSectionTwo;


const ImageSection = () => (
  <div className="w-full px-4 lg:w-1/2">
    <div
      className="relative mx-auto mb-12 max-w-full lg:max-w-[500px] text-center lg:m-0"
      data-wow-delay=".15s"
    >
      <Image
        src="/images/about/about-2.jpg"
        alt="about image"
        width={666} // Set this to the original width of your image
        height={666} // Set this to the original height of your image
        className="drop-shadow-three rounded-lg dark:drop-shadow-none w-auto h-auto"
      />
    </div>
  </div>
);

// TextSection.tsx
const TextSection = () => (
  <div className="w-full px-4 lg:w-1/2">
    <div className="max-w-[470px]">
      <div className="mb-9">
        <h3 className="mb-4 text-xl font-bold text-blue-500 sm:text-2xl lg:text-xl xl:text-2xl">
          Community Involvement
        </h3>
        <p className="text-base font-medium leading-relaxed text-primary sm:text-lg sm:leading-relaxed">
          Share obituary/memorial/tribute in one click with the greater community as you
          collect service providers to assist you giving you and your family peace of mind.
        </p>
      </div>
      <div className="mb-9">
        <h3 className="mb-4 text-xl font-bold text-blue-500 sm:text-2xl lg:text-xl xl:text-2xl">
          Funeral Products
        </h3>
        <p className="text-base font-medium leading-relaxed text-primary sm:text-lg sm:leading-relaxed">
          We provide a platform for you to showcase your services and products to the world. This includes
          hearse providers, lowering gear, decoration, caterers, tents and chairs, grief counsellors, probate lawyers, and program printers.
        </p>
      </div>
    </div>
  </div>
);

// AboutSectionTwo.tsx