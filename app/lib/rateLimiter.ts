import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
  identifier?: string
}

class RateLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>()
  
  constructor(private config: RateLimitConfig) {}
  
  // Add getter for maxRequests
  getMaxRequests(): number {
    return this.config.maxRequests
  }
  
  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const key = `${identifier}:${Math.floor(now / this.config.windowMs)}`
    const userRequests = this.requests.get(key)
    
    if (!userRequests || now > userRequests.resetTime) {
      this.requests.set(key, { count: 1, resetTime: now + this.config.windowMs })
      return true
    }
    
    if (userRequests.count >= this.config.maxRequests) {
      return false
    }
    
    userRequests.count++
    return true
  }
  
  getRemainingRequests(identifier: string): number {
    const now = Date.now()
    const key = `${identifier}:${Math.floor(now / this.config.windowMs)}`
    const userRequests = this.requests.get(key)
    
    if (!userRequests || now > userRequests.resetTime) {
      return this.config.maxRequests
    }
    
    return Math.max(0, this.config.maxRequests - userRequests.count)
  }
  
  getResetTime(identifier: string): number {
    const now = Date.now()
    const key = `${identifier}:${Math.floor(now / this.config.windowMs)}`
    const userRequests = this.requests.get(key)
    
    if (!userRequests) {
      return now + this.config.windowMs
    }
    
    return userRequests.resetTime
  }
}

// Create rate limiters for different endpoints
export const authRateLimiter = new RateLimiter({
  maxRequests: 5,
  windowMs: 60 * 1000, // 1 minute
})

export const apiRateLimiter = new RateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000, // 1 minute
})

export const lessonCompletionRateLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
})

// Rate limiting middleware
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  rateLimiter: RateLimiter,
  getIdentifier: (req: NextRequest) => string
) {
  return async (req: NextRequest) => {
    const identifier = getIdentifier(req)
    
    if (!rateLimiter.isAllowed(identifier)) {
      return NextResponse.json(
        { 
          error: 'Too many requests',
          retryAfter: Math.ceil(rateLimiter.getResetTime(identifier) / 1000)
        },
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil(rateLimiter.getResetTime(identifier) / 1000).toString(),
            'X-RateLimit-Limit': rateLimiter.getMaxRequests().toString(),
            'X-RateLimit-Remaining': rateLimiter.getRemainingRequests(identifier).toString(),
            'X-RateLimit-Reset': rateLimiter.getResetTime(identifier).toString(),
          }
        }
      )
    }
    
    const response = await handler(req)
    
    // Add rate limit headers to response
    response.headers.set('X-RateLimit-Limit', rateLimiter.getMaxRequests().toString())
    response.headers.set('X-RateLimit-Remaining', rateLimiter.getRemainingRequests(identifier).toString())
    response.headers.set('X-RateLimit-Reset', rateLimiter.getResetTime(identifier).toString())
    
    return response
  }
}

// Helper to get client identifier
export function getClientIdentifier(req: NextRequest): string {
  const ip = req.ip || req.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = req.headers.get('user-agent') || 'unknown'
  return `${ip}:${userAgent}`
} 