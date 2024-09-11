import { signIn } from '@/auth'
import { Button } from '@/components/ui/button'

async function signInWithGoogle() {
  'use server'
  await signIn('google', { callbackUrl: '/' })
}

export default function SigninPage() {
  return (
    <div className="bg-background text-primary min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          <form action={signInWithGoogle}>
            <Button type="submit" className="w-full">
              Sign in with Google
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}