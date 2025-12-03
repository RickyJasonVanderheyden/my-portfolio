"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 rounded-full mx-auto animate-spin">
            <div className="absolute inset-2 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Loading Portfolio</h2>
          <p className="text-sm text-muted-foreground">Preparing an amazing experience...</p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Text */}
        <p className="text-xs text-muted-foreground">{progress}%</p>
      </div>
    </div>
  )
}