// Temporarily comment out Brevo SDK to fix blank page
// import * as brevo from '@getbrevo/brevo';

export interface EarlyAccessData {
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const addToEarlyAccessList = async (data: EarlyAccessData): Promise<void> => {
  try {
    // Use fetch API instead of SDK for now
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY
      },
      body: JSON.stringify({
        email: data.email,
        listIds: [parseInt(import.meta.env.VITE_BREVO_LIST_ID)],
        attributes: {
          'SIGNUP_SOURCE': 'landing_page',
          'SIGNUP_DATE': new Date().toISOString()
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      
      // Check for duplicate contact error (try different variations)
      if (response.status === 400 && errorData.message) {
        const message = errorData.message.toLowerCase();
        if (message.includes('contact already exist') || 
            message.includes('already exists') || 
            message.includes('duplicate')) {
          throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
        }
      }
      
      // Also check error code
      if (errorData.code === 'duplicate_parameter') {
        throw new Error('You\'re already on our waitlist! We\'ll notify you when we launch.');
      }
      
      throw new Error(`API Error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error adding contact to Brevo list:', error);
    
    // Re-throw custom errors as-is
    if (error instanceof Error && error.message.includes('already on our waitlist')) {
      throw error;
    }
    
    throw new Error('Failed to join waitlist. Please try again.');
  }
};

export const sendContactFormEmail = async (data: ContactFormData): Promise<void> => {
  try {
    // Use fetch API instead of SDK for now
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY
      },
      body: JSON.stringify({
        to: [{ email: 'support@dinopix.ai', name: 'Dinopix Support' }],
        sender: { email: 'noreply@dinopix.ai', name: 'Dinopix Contact Form' },
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
          <p><small>Submitted from dinopix.ai contact form</small></p>
        `
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw new Error('Failed to send message. Please try again.');
  }
};