'use client'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

export default function SigninPage() {
  return (
    <div className="bg-background text-primary min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          <Button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full"
          >
            Sign in with Google
          </Button>
        </div>
      </main>
    </div>
  )
}