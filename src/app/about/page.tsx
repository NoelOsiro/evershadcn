import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About',
}

const AboutPage = () => {
  return (
    <main className="mx-auto px-24 mt-24">
      <Breadcrumb
        pageName="About Page"
        description="What is EverCerished? Learn more about us."
      />
      <AboutSectionOne />
      <AboutSectionTwo />
    </main>
  );
};

export default AboutPage;
