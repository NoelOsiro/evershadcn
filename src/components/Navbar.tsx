'use client'

import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AuthButtons } from '@/components/AuthButtons'
import { ThemeToggle } from './Providers/ThemeToggle'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const { data: session } = useSession()
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 100) // Adjust sensitivity
        setLastScrollY(currentScrollY)
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const NavLinks = () => (
    <>
      <Link href="/" className="hover:underline hover:text-blue-500">Home</Link>
      <Link href="/about" className="hover:underline hover:text-blue-500">About</Link>
      <Link href="/support" className="hover:underline hover:text-blue-500">Support</Link>
      {session && (
        <Link href="/my-pages" className="hover:underline hover:text-blue-500">My Pages</Link>
      )}
    </>
  )

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg transform z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link href="/" className="header-logo block w-full py-8">
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={128}
                height={56}
                className="w-32 h-14 dark:hidden"
              />
              <Image
                src="/images/logo/logo.png"
                alt="logo"
                width={128}
                height={56}
                className="hidden w-32 h-14 dark:block"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <AuthButtons />
            <ThemeToggle />
          </div>
          <div className="md:hidden ">
            <Sheet >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-primary">
                <nav className="flex flex-col space-y-4 mt-8 bg-primary text-body-color dark:text-body-color-dark">
                  <NavLinks />
                  <AuthButtons />
                  <ThemeToggle />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}