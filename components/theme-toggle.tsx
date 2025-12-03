"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read the current theme state (already set by blocking script)
    const currentIsDark = document.documentElement.classList.contains("dark")
    setIsDark(currentIsDark)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Prevent hydration mismatch - show appropriate fallback
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300"
        aria-label="Toggle theme"
      >
        <Sun className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border hover:border-primary transition-all duration-300"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </Button>
  )
}
