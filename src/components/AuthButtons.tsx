'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Image from 'next/image'

export function AuthButtons() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center space-x-8">
      {session ? (
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
            <Image
              src={session.user?.image || '/default-profile.png'} // Fallback to default image if not available
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
              width={32}
              height={32}
            />
            <span>{session.user?.name || 'Profile'}</span>
          <Button variant={'outline'} onClick={() => signOut()} 
          className="flex items-center space-x-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-600">
            <FaSignOutAlt className="text-sm" />
            <span>Sign out</span>
          </Button>
        </div>
      ) : (
        <Button onClick={() => signIn()} className="flex items-center space-x-1">
          <FaSignInAlt className="text-sm" />
          <span>Sign in</span>
        </Button>
      )}
    </div>
  )
}
