'use client'

import { useTheme } from './ThemeProvider'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  )
}