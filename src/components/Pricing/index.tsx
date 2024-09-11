import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import BottomSVG from "./BottomSVG";

const offerListItems = [
  "Personal Obituary Pages",
  "Unlimited Condolences",
  "Customized Tributes",
  "Support Assistance",
];
const Pricing = () => {


  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Transparent and Compassionate Pricing"
          paragraph="Discover our transparent and compassionate pricing plans designed to honor your loved ones with dignity."
          center
          width="665px"
        />
        <div className="flex justify-center">
          <PricingBox
            packageName="Basic"
            price={"5,500"}
            subtitle="Honor your loved ones with essential features for lasting memories."
          >
            {offerListItems.map((item, index) => (
              <OfferList key={index} text={item} status="active" />
            ))}
          </PricingBox>
        </div>
      </div>
      <BottomSVG />
    </section>
  );
};

export default Pricing;
