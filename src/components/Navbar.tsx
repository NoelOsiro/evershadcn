'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AuthButtons } from '@/components/AuthButtons'
import { ThemeToggle } from './Providers/ThemeToggle'


export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Evercherished
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/support" className="hover:underline">
              Support
            </Link>
            {session && (
              <Link href="/my-pages" className="hover:underline">
                My Pages
              </Link>
            )}
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}