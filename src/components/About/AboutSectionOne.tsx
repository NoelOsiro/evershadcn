import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import Link from "next/link";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {


  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Service Providers"
                paragraph="List your services and products on EverCerished and reach a wider audience. We provide a platform for you to showcase your services and products to the world."
                mb="44px"
              />
              <div
                className="mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <ListItems />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 mb-4" data-wow-delay=".15s">
              <AboutImage />
            </div>
            <div className="flex flex-col items-center justify-center m-[auto] space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/services"
                className="rounded-sm bg-primary lg:px-8 lg:py-4 px-4 py-2 text-base font-semibold text-primary-foreground duration-300 ease-in-out hover:bg-primary/80"
              >
                Other Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;


const AboutImage = () => (
  <div className="relative mx-auto aspect-[25/24] max-w-[700px] lg:mr-0 mb-4">
    <Image
      src="/images/about/about-1.jpg"
      alt="about-image"
      fill // or the original height of your image
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className=" max-w-full h-full drop-shadow-three rounded-lg dark:drop-shadow-none lg:mr-0"
    />
  </div>
);
interface ListProps {
  text: string;
}

const List = ({ text }: ListProps) => (
  <p className="mb-5 flex items-center md:text-lg font-medium text-primary text-sm">
    <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-primary-foreground bg-opacity-10 text-primary">
      {checkIcon}
    </span>
    {text}
  </p>
);

const listItems = [
  ["Hearse providers", "Lowering gear", "Decoration", "Caterers"],
  ["Tents and Chairs", "Grief Counsellors", "Probate Lawyers", "Program printers"],
];
const ListItems = () => (

  <div className="mx-[-12px] flex flex-wrap">
    {listItems.map((items, index) => (
      <div key={index} className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
        {items.map((item, i) => (
          <List key={i} text={item} />
        ))}
      </div>
    ))}
  </div>
);