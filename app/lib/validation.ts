// Simple validation functions without Zod dependency
export const userInputSchema = {
  validate: (data: any) => {
    const errors: string[] = []
    
    if (!data.name || typeof data.name !== 'string' || data.name.length < 1 || data.name.length > 100) {
      errors.push('Name must be between 1 and 100 characters')
    }
    
    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
      errors.push('Valid email is required')
    }
    
    return {
      success: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      error: errors.join(', ')
    }
  }
}

export const lessonCompletionSchema = {
  validate: (data: any) => {
    const errors: string[] = []
    
    if (!data.lessonNumber || typeof data.lessonNumber !== 'number' || data.lessonNumber < 1 || data.lessonNumber > 120) {
      errors.push('Lesson number must be between 1 and 120')
    }
    
    if (!data.xpEarned || typeof data.xpEarned !== 'number' || data.xpEarned < 0 || data.xpEarned > 100) {
      errors.push('XP earned must be between 0 and 100')
    }
    
    return {
      success: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      error: errors.join(', ')
    }
  }
}

export const certificationNameSchema = {
  validate: (data: any) => {
    const errors: string[] = []
    
    if (!data.first_name || typeof data.first_name !== 'string' || data.first_name.length < 1 || data.first_name.length > 50) {
      errors.push('First name must be between 1 and 50 characters')
    }
    
    if (!data.last_name || typeof data.last_name !== 'string' || data.last_name.length < 1 || data.last_name.length > 50) {
      errors.push('Last name must be between 1 and 50 characters')
    }
    
    return {
      success: errors.length === 0,
      data: errors.length === 0 ? data : undefined,
      error: errors.join(', ')
    }
  }
}

// Sanitization functions
export const sanitizeString = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
}

export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim()
}

export const validateAndSanitize = <T>(schema: any, data: unknown): { success: boolean; data?: T; error?: string } => {
  try {
    const result = schema.validate(data)
    return { success: result.success, data: result.data, error: result.error }
  } catch (error) {
    return { success: false, error: 'Unknown validation error' }
  }
}

// Rate limiting helper
export const createRateLimiter = (maxRequests: number, windowMs: number) => {
  const requests = new Map<string, { count: number; resetTime: number }>()
  
  return (identifier: string): boolean => {
    const now = Date.now()
    const userRequests = requests.get(identifier)
    
    if (!userRequests || now > userRequests.resetTime) {
      requests.set(identifier, { count: 1, resetTime: now + windowMs })
      return true
    }
    
    if (userRequests.count >= maxRequests) {
      return false
    }
    
    userRequests.count++
    return true
  }
}

// XSS protection
export const escapeHtml = (str: string): string => {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

// CSRF protection
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken
} 