// Features.tsx
import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Key Features"
            paragraph="We offer a range of features designed to create meaningful tributes, share memories and connect with others during times of grief and loss. 
            Explore our features below:"
            center
          />
          <FeaturesList />
        </div>
      </section>
    </>
  );
};

export default Features;



function FeaturesList() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
  )
}

