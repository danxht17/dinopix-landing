'use client'

import { useState } from 'react'

interface NewsletterSubscriptionProps {
  className?: string
}

export default function NewsletterSubscription({ className = '' }: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  // Email validation regex
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Sanitize input to prevent XSS
  const sanitizeInput = (input: string) => {
    return input.trim().toLowerCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset status
    setStatus('loading')
    setMessage('')

    // Validate email
    const sanitizedEmail = sanitizeInput(email)
    
    if (!sanitizedEmail) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    if (!isValidEmail(sanitizedEmail)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    try {
      // Simulate API call - replace with actual newsletter service integration
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add CSRF token in production
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({ 
          email: sanitizedEmail,
          source: 'article_page',
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage('Thank you! You\'ve been subscribed to our newsletter.')
        setEmail('')
      } else {
        throw new Error(data.message || 'Subscription failed')
      }
    } catch (error) {
      setStatus('error')
      if (error instanceof Error) {
        // Handle specific error cases
        if (error.message.includes('already subscribed')) {
          setMessage('You\'re already subscribed to our newsletter!')
        } else if (error.message.includes('network')) {
          setMessage('Network error. Please check your connection and try again.')
        } else {
          setMessage('Something went wrong. Please try again later.')
        }
      } else {
        setMessage('An unexpected error occurred. Please try again.')
      }
      console.error('Newsletter subscription error:', error)
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              disabled={status === 'loading'}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              required
              maxLength={254} // RFC 5321 email length limit
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || !email.trim()}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'loading' ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </span>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        {/* Status Messages */}
        {message && (
          <div
            className={`text-sm p-3 rounded-md ${
              status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : status === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : ''
            }`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </div>
        )}
      </form>

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 mt-3 text-center">
        We respect your privacy. Unsubscribe at any time.{' '}
        <a href="/privacy" className="underline hover:text-gray-700">
          Privacy Policy
        </a>
      </p>
    </div>
  )
}
