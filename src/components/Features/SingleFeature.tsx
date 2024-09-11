import { Feature } from "@/types/feature";


const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        <div className="mb-10 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-background bg-opacity-10 ">
          {icon}
        </div>
        <h3 className="mb-5 text-xl font-bold text-blue-600 sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-primary">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
