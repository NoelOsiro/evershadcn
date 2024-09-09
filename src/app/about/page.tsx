import { Navbar } from '@/components/Navbar'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">About Evercherished</h1>
          <div className="prose max-w-none">
            <p>
              Evercherished is a platform dedicated to honoring and remembering loved ones through
              heartfelt tributes and memorials. Our mission is to provide a space where people can
              celebrate the lives of those who have passed, sharing memories and stories that keep
              their legacies alive.
            </p>
            <p>
              We understand the importance of preserving memories and the healing power of
              sharing stories. That&apos;s why we&apos;ve created a user-friendly platform that allows you
              to create beautiful, personalized memorial pages for your loved ones.
            </p>
            <p>
              Whether you&apos;re looking to create a lasting tribute, share memories with family and
              friends, or find support during difficult times, Evercherished is here to help you
              honor and remember those who have touched your life.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}