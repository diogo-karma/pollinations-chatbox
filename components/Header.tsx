'use client'

import { Moon, Sun, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { SharePopover } from './SharePopover'

export default function Header({ onReset }) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src="/karma.png" alt="Karma-Pollinations Logo" className="w-16 h-12 mr-2" />
      </div>
      <h1 className="text-xl font-bold">karma.pollinations.ai</h1>
      <div className="flex items-center space-x-2">
        {/* <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button> */}
        <Button variant="ghost" size="icon" onClick={onReset}>
          <RefreshCw className="h-5 w-5" />
        </Button>
        <SharePopover />
      </div>
    </header>
  )
}

