import AboutSectionOne from '@/components/About/AboutSectionOne';
import AboutSectionTwo from '@/components/About/AboutSectionTwo';
import Blog from '@/components/Blog';
import Features from '@/components/Features';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Video from '@/components/Video';


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <main className="flex-grow mx-auto px-4 justify-center">
        <Hero />
        <Features />
        <Video />
        <AboutSectionOne />
        <AboutSectionTwo />
        <Testimonials />
        <Pricing />
        <Blog />
      </main>
    </div>
  );
}

