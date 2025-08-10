import { NextRequest, NextResponse } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Simple rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 requests per 15 minutes

  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return false
  }
  
  if (record.count >= maxRequests) {
    return true
  }
  
  record.count++
  return false
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// Sanitize input
function sanitizeInput(input: string): string {
  return input.trim().toLowerCase()
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Validate request method and headers
    if (request.method !== 'POST') {
      return NextResponse.json(
        { success: false, message: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Check for CSRF protection header
    const requestedWith = request.headers.get('x-requested-with')
    if (requestedWith !== 'XMLHttpRequest') {
      return NextResponse.json(
        { success: false, message: 'Invalid request' },
        { status: 400 }
      )
    }

    // Parse request body
    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    const { email, source, timestamp } = body

    // Validate required fields
    if (!email || !source) {
      return NextResponse.json(
        { success: false, message: 'Email and source are required' },
        { status: 400 }
      )
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(email)
    
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate source
    const validSources = ['article_page', 'homepage', 'resources_page']
    if (!validSources.includes(source)) {
      return NextResponse.json(
        { success: false, message: 'Invalid source' },
        { status: 400 }
      )
    }

    // Validate timestamp (should be recent)
    if (timestamp) {
      const submissionTime = new Date(timestamp).getTime()
      const now = Date.now()
      const fiveMinutesAgo = now - (5 * 60 * 1000)
      
      if (submissionTime < fiveMinutesAgo || submissionTime > now) {
        return NextResponse.json(
          { success: false, message: 'Invalid submission timestamp' },
          { status: 400 }
        )
      }
    }

    // TODO: Integrate with actual newsletter service (e.g., Mailchimp, ConvertKit, etc.)
    // For now, we'll simulate the subscription process
    
    try {
      // Simulate newsletter service integration
      const subscriptionResult = await simulateNewsletterSubscription(sanitizedEmail, source)
      
      if (subscriptionResult.success) {
        // Log successful subscription (in production, use proper logging service)
        console.log(`Newsletter subscription: ${sanitizedEmail} from ${source}`)
        
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to newsletter!'
        })
      } else {
        throw new Error(subscriptionResult.error)
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('already subscribed')) {
          return NextResponse.json(
            { success: false, message: 'This email is already subscribed to our newsletter.' },
            { status: 409 }
          )
        }
        
        if (error.message.includes('invalid email')) {
          return NextResponse.json(
            { success: false, message: 'Please enter a valid email address.' },
            { status: 400 }
          )
        }
      }
      
      // Generic error response
      return NextResponse.json(
        { success: false, message: 'Unable to process subscription. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Newsletter API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Simulate newsletter service integration
async function simulateNewsletterSubscription(email: string, _source: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simulate some email addresses as already subscribed
  const existingSubscribers = [
    'test@example.com',
    'demo@test.com'
  ]
  
  if (existingSubscribers.includes(email)) {
    return {
      success: false,
      error: 'Email already subscribed'
    }
  }
  
  // Simulate random failures (5% chance)
  if (Math.random() < 0.05) {
    return {
      success: false,
      error: 'Service temporarily unavailable'
    }
  }
  
  // Simulate successful subscription
  return {
    success: true,
    subscriberId: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { message: 'Newsletter subscription endpoint. Use POST to subscribe.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}
