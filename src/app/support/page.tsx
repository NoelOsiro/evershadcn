import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col mt-24">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-primary mb-6">Support</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary">
                    Name
                  </label>
                  <Input id="name" name="name" className='border-blue-100/20' required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required className='border-blue-100/20' />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary">
                    Message
                  </label>
                  <Textarea id="message" name="message" rows={4} required className='border-blue-100/20'/>
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-primary">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-primary">How do I create a memorial page?</h3>
                  <p className="text-primary">To create a memorial page, sign in to your account and click on the &quot;Create New Memorial&quot; button on your dashboard.</p>
                </div>
                <div>
                  <h3 className="font-medium text-primary">Can I invite others to contribute to a memorial?</h3>
                  <p className="text-primary">Yes, you can invite family and friends to contribute stories, photos, and memories to the memorial page.</p>
                </div>
                <div>
                  <h3 className="font-medium text-primary">Is my information secure?</h3>
                  <p className="text-primary">We take privacy and security seriously. All personal information is encrypted and stored securely.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}