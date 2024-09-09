import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Support</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea id="message" name="message" rows={4} required />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How do I create a memorial page?</h3>
                  <p className="text-gray-600">To create a memorial page, sign in to your account and click on the &quot;Create New Memorial&quot; button on your dashboard.</p>
                </div>
                <div>
                  <h3 className="font-medium">Can I invite others to contribute to a memorial?</h3>
                  <p className="text-gray-600">Yes, you can invite family and friends to contribute stories, photos, and memories to the memorial page.</p>
                </div>
                <div>
                  <h3 className="font-medium">Is my information secure?</h3>
                  <p className="text-gray-600">We take privacy and security seriously. All personal information is encrypted and stored securely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}