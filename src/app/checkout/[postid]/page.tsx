import BackgroundSVG from "@/components/BlogPost/BackgroundSVG";
import BottomSVG from "@/components/BlogPost/BottomSVG";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function Checkout() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 mt-24">
      <div className="max-w-2xl mx-auto py-10 px-6">
        {/* Theme Toggle */}

        {/* Checkout Form */}
        <h1 className="text-2xl font-semibold mb-8">Checkout</h1>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <Input id="name" placeholder="John Doe" className="mt-1 w-full" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input id="email" placeholder="johndoe@example.com" type="email" className="mt-1 w-full" />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address
            </label>
            <Input id="address" placeholder="123 Street Name" className="mt-1 w-full" />
          </div>
          <div>
            <label htmlFor="card" className="block text-sm font-medium">
              Card Details
            </label>
            <Input id="card" placeholder="1234 5678 9012 3456" className="mt-1 w-full" />
          </div>
          <Button className="w-full mt-4">Pay Now</Button>
        </form>
      </div>
      <BottomSVG />
      <BackgroundSVG />
    </div>
  )
}
