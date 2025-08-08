export interface EarlyAccessData {
  email: string;
  honeypot?: string; // Hidden field for bot detection
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Hidden field for bot detection
  recaptchaToken?: string; // reCAPTCHA verification token
}

// For development/testing, use a mock implementation
const isDevelopment = process.env.NODE_ENV === 'development';

export const addToEarlyAccessList = async (data: EarlyAccessData): Promise<void> => {
  try {
    // Honeypot validation - if filled, likely a bot
    if (data.honeypot && data.honeypot.trim() !== '') {
      console.warn('Bot detected in early access signup');
      throw new Error('Submission rejected. Please try again.');
    }
    // Log the environment for debugging (development only)
    if (isDevelopment) {
      console.log('Environment:', process.env.NODE_ENV);
      console.log('API Key available:', !!process.env.NEXT_PUBLIC_BREVO_API_KEY);
    }
    
    // In development mode without API key, simulate success/failure
    if (isDevelopment && !process.env.NEXT_PUBLIC_BREVO_API_KEY) {
      console.log('Development mode: Simulating API call');
      
      // Simulate duplicate email check
      if (data.email.includes('existing') || data.email.includes('duplicate')) {
        console.log('Development mode: Simulating duplicate email');
        throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
      }
      
      // Simulate success for other emails
      console.log('Development mode: Simulating successful registration');
      return;
    }
    
    // Real API call for production or when API key is available
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY || ''
      },
      body: JSON.stringify({
        email: data.email,
        listIds: [3], // Updated to match the correct list ID from .env
        attributes: {
          'SIGNUP_SOURCE': 'Early Access Waitlist',
          'SIGNUP_DATE': new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Brevo API error:', errorData);
      
      // Check for duplicate contact in various error formats
      if (response.status === 400) {
        if (errorData.message) {
          const message = errorData.message.toLowerCase();
          if (message.includes('contact already exist') || 
              message.includes('already exists') || 
              message.includes('duplicate')) {
            throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
          }
        }
        
        // Check for duplicate parameter error
        if (errorData.code === 'duplicate_parameter') {
          throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
        }
        
        // Check for duplicate email in the error details
        if (errorData.code === 'invalid_parameter' && 
            errorData.message && 
            errorData.message.toLowerCase().includes('already exists')) {
          throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
        }
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error adding contact to Brevo list:', error);
    
    // Pass through the custom error message for duplicate contacts
    if (error instanceof Error && error.message.includes('already on our waitlist')) {
      throw error;
    }
    
    // Check if this is a network error
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    // Generic error for all other cases
    throw new Error('Failed to join waitlist. Please try again.');
  }
};

export const sendContactFormEmail = async (data: ContactFormData): Promise<void> => {
  try {
    // Honeypot validation - if filled, likely a bot
    if (data.honeypot && data.honeypot.trim() !== '') {
      console.warn('Bot detected in contact form submission');
      throw new Error('Submission rejected. Please try again.');
    }

    // reCAPTCHA validation - verify token with Google
    if (!isDevelopment) {
      // In production, require reCAPTCHA token from client
      if (!data.recaptchaToken) {
        console.warn('reCAPTCHA token missing in production');
        throw new Error('Please complete the security verification to submit your message.');
      }

      // Verify reCAPTCHA token with Google if secret key is available
      if (process.env.RECAPTCHA_SECRET_KEY) {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`
        });
        
        const recaptchaResult = await recaptchaResponse.json();
        if (!recaptchaResult.success) {
          console.warn('reCAPTCHA verification failed:', recaptchaResult);
          throw new Error('Security verification failed. Please try again.');
        }
      } else {
        console.warn('reCAPTCHA secret key not configured');
        throw new Error('Security verification is temporarily unavailable. Please try again later.');
      }
    }
    // Log the environment for debugging (development only)
    if (isDevelopment) {
      console.log('Environment:', process.env.NODE_ENV);
      console.log('API Key available:', !!process.env.NEXT_PUBLIC_BREVO_API_KEY);
    }
    
    // In development mode without API key, simulate success
    if (isDevelopment && !process.env.NEXT_PUBLIC_BREVO_API_KEY) {
      console.log('Development mode: Simulating contact form submission');
      console.log('Contact form data:', data);
      return;
    }
    
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.NEXT_PUBLIC_BREVO_API_KEY || ''
      },
      body: JSON.stringify({
        to: [{ email: 'support@dinopix.com.au', name: 'Dinopix Support' }],
        sender: { email: 'support@dinopix.com.au', name: 'Dinopix Contact Form' },
        replyTo: { email: data.email, name: data.name },
        subject: `Contact Form: ${data.subject}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted from dinopix.com.au contact form</small></p>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('Brevo API error:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending contact form email:', error);
    
    // Check if this is a network error
    if (error instanceof Error && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    
    throw new Error('Failed to send message. Please try again.');
  }
};