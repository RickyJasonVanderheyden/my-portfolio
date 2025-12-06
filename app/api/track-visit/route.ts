import { NextRequest, NextResponse } from 'next/server'

interface VisitLog {
  timestamp: string
  sessionId: string
  page: string
  userAgent?: string
  ip?: string
}

// Simple in-memory storage (in production, use a database)
let visits: VisitLog[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { timestamp, sessionId, page, userAgent } = body

    // Add visit to log
    const visitLog: VisitLog = {
      timestamp,
      sessionId,
      page,
      userAgent,
      ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    }

    visits.push(visitLog)

    // Keep only last 1000 visits to prevent memory issues
    if (visits.length > 1000) {
      visits = visits.slice(-1000)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Visit tracking error:', error)
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 })
  }
}

// GET endpoint to retrieve visit stats (for future admin dashboard)
export async function GET() {
  try {
    const now = new Date()
    const today = now.toDateString()
    
    const stats = {
      totalVisits: visits.length,
      uniqueVisitors: new Set(visits.map(v => v.sessionId)).size,
      todayVisits: visits.filter(v => new Date(v.timestamp).toDateString() === today).length,
      recentVisits: visits.slice(-10).reverse() // Last 10 visits
    }

    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 })
  }
}