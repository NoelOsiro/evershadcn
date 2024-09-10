import AboutSectionOne from '@/components/About/AboutSectionOne'
import AboutSectionTwo from '@/components/About/AboutSectionTwo'
import Blog from '@/components/Blog'
import BackgroundSVG from '@/components/BlogPost/BackgroundSVG'
import BottomSVG from '@/components/BlogPost/BottomSVG'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import { Button } from '@/components/ui/button'
import Video from '@/components/Video'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col mt-20 ">
      <main className="flex-grow mx-auto px-4">
        <div className="max-w-7xl  py-12 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[800px] text-center">
            <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-5xl">
              CHERISH MEMORIES OF LOVED ONES
            </h1>
            <p className="mb-12 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
              Cherish and honour the memories of your loved ones and share with friends.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/signup" passHref>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/about" passHref>
                  <Button variant="outline" className="w-full text-primary bg-blue-400">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
          <BackgroundSVG />
          <BottomSVG />
        </div>
        <Features />
        <Video />
        <AboutSectionOne />
        <AboutSectionTwo />
        <Testimonials />
        <Pricing />
        <Blog />
      </main>
    </div>
  )
}