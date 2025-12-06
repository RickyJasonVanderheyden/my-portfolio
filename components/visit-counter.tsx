"use client"

import { useEffect, useState } from "react"
import { Eye, Users, Clock } from "lucide-react"

interface VisitStats {
  totalVisits: number
  uniqueVisitors: number
  todayVisits: number
  lastVisit: string
}

export function VisitCounter() {
  const [stats, setStats] = useState<VisitStats | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if admin mode is enabled
    const adminEnabled = localStorage.getItem('portfolio-admin') === 'true'
    setIsAdmin(adminEnabled)
    
    if (adminEnabled) {
      setIsVisible(true)
    }

    // Track this visit
    trackVisit()

    // Enable admin toggle functions
    ;(window as any).enablePortfolioAdmin = () => {
      localStorage.setItem('portfolio-admin', 'true')
      window.location.reload()
    }

    ;(window as any).disablePortfolioAdmin = () => {
      localStorage.setItem('portfolio-admin', 'false')
      window.location.reload()
    }

    ;(window as any).resetPortfolioStats = () => {
      localStorage.removeItem('portfolio-stats')
      localStorage.removeItem('portfolio-visitors')
      sessionStorage.removeItem('last-tracked')
      console.log('Portfolio stats reset successfully')
      window.location.reload()
    }
  }, [])

  const trackVisit = async () => {
    try {
      const now = new Date()
      const today = now.toDateString()
      const sessionId = getSessionId()
      
      // Check if we already tracked this session today
      const lastTracked = sessionStorage.getItem('last-tracked')
      const currentSession = `${sessionId}-${today}`
      
      if (lastTracked === currentSession) {
        // Already tracked this session today, just load existing stats
        const stored = localStorage.getItem('portfolio-stats')
        if (stored) {
          setStats(JSON.parse(stored))
        }
        return
      }
      
      // Mark this session as tracked
      sessionStorage.setItem('last-tracked', currentSession)
      
      // Get existing stats
      const stored = localStorage.getItem('portfolio-stats')
      let currentStats: VisitStats = stored ? JSON.parse(stored) : {
        totalVisits: 0,
        uniqueVisitors: 0,
        todayVisits: 0,
        lastVisit: ''
      }

      // Always increment total visits
      currentStats.totalVisits += 1

      // Check for new day
      if (currentStats.lastVisit !== today) {
        currentStats.todayVisits = 1
      } else {
        currentStats.todayVisits += 1
      }

      // Track unique visitors
      const visitors = JSON.parse(localStorage.getItem('portfolio-visitors') || '[]')
      if (!visitors.includes(sessionId)) {
        visitors.push(sessionId)
        currentStats.uniqueVisitors = visitors.length
        localStorage.setItem('portfolio-visitors', JSON.stringify(visitors))
      }

      currentStats.lastVisit = today

      // Save updated stats
      localStorage.setItem('portfolio-stats', JSON.stringify(currentStats))
      setStats(currentStats)

      // Optional: Send to API for server-side tracking
      await sendToServer({
        timestamp: now.toISOString(),
        sessionId,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      })

    } catch (error) {
      console.error('Visit tracking failed:', error)
    }
  }

  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('portfolio-session')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('portfolio-session', sessionId)
    }
    return sessionId
  }

  const sendToServer = async (data: any) => {
    try {
      await fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    } catch {
      // Fail silently - stats still work locally
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  // Keyboard shortcut to toggle visibility (Ctrl+Shift+V)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isAdmin && e.ctrlKey && e.shiftKey && e.key === 'V') {
        toggleVisibility()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAdmin, isVisible])

  if (!isAdmin || !isVisible || !stats) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-black/90 backdrop-blur-sm border border-primary/30 rounded-lg p-3 text-xs text-white shadow-xl cyber-border">
        <div className="flex items-center gap-2 mb-2">
          <Eye className="w-3 h-3 text-primary" />
          <span className="text-primary font-medium">Portfolio Analytics</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-muted-foreground">Total:</span>
            </div>
            <span className="font-mono text-primary">{stats.totalVisits}</span>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-muted-foreground">Unique:</span>
            </div>
            <span className="font-mono text-secondary">{stats.uniqueVisitors}</span>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-muted-foreground" />
              <span className="text-muted-foreground">Today:</span>
            </div>
            <span className="font-mono text-accent">{stats.todayVisits}</span>
          </div>
          
          <div className="border-t border-primary/20 pt-2 mt-2">
            <span className="text-muted-foreground text-xs">
              Last: {stats.lastVisit}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground/60 mt-1">
            Ctrl+Shift+V to hide
          </div>
        </div>
      </div>
    </div>
  )
}