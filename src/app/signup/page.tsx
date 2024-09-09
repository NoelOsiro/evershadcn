import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col mt-24">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
          <Button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full"
          >
            Sign up with Google
          </Button>
        </div>
      </main>
    </div>
  )
}