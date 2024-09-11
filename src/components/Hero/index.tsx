// Hero.tsx
import MainContent from "./MainContent";
import BackgroundSVG from "./BackgroundSVG";
import BottomSVG from "./BottomSVG";
import './Hero.css'; // Import the CSS file


const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <MainContent />
            </div>
          </div>
        </div>
        <BackgroundSVG />
        <BottomSVG />
      </section>
    </>
  );
};

export default Hero;
