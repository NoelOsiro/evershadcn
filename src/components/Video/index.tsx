"use client";

import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { Button } from "../ui/button";
 // Ensure you have the correct import path for ShadCN components

const Video = () => {
  const handlePlayClick = () => {
    const videoIframe = document.getElementById('videoIframe') as HTMLIFrameElement | null;
    if (videoIframe) {
      videoIframe.style.display = 'block';
    }
  };

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Family Focus"
          paragraph="Evercherished provides a platform to handle all arrangements and easily find service providers to assist you, giving you and your family peace of mind."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src="/images/video/video.jpg" alt="video image" fill sizes="(max-width: 600px) 100vw, 600px" />
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <Button
                    aria-label="video play button"
                    onClick={handlePlayClick}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <iframe
                id="videoIframe"
                className="absolute top-0 left-0 w-full h-full rounded-md"
                style={{ display: 'none' }}
                src="https://www.youtube.com/embed/7ZSIf1aCa2I?si=S2TC2T1f7MyQE3wR"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
