'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sendContactFormEmail, addToEarlyAccessList, type ContactFormData } from '@/services/brevo';
import SEO from '@/components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData & { marketingOptIn: boolean }>({
    name: '',
    email: '',
    subject: '',
    message: '',
    marketingOptIn: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError('');

    try {
      // Send contact form email
      await sendContactFormEmail(formData);
      
      // If user opted in for marketing, add to early access list
      if (formData.marketingOptIn) {
        try {
          await addToEarlyAccessList({ email: formData.email });
        } catch (err) {
          // Don't fail the whole form if adding to list fails
          console.warn('Failed to add to early access list:', err);
        }
      }
      
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const faqs = [
    {
      question: "What exactly does Dinopix create?",
      answer: "Dinopix generates production-ready design assets including logos, marketing materials, social media graphics, presentations, and web design elements. Our AI understands your brand requirements and creates professional designs that match your vision."
    },
    {
      question: "How does the AI design process work?",
      answer: "Simply describe what you need in natural language - our AI analyzes your brief, considers your brand guidelines, and generates multiple design options. You can then refine and customize any design with simple commands or visual editing tools."
    },
    {
      question: "Can I customize the AI-generated designs?",
      answer: "Absolutely! Every design is fully editable. You can modify colors, fonts, layouts, and elements using our intuitive editor or by giving text instructions like &apos;make the logo bigger&apos; or &apos;change the color to blue&apos;."
    },
    {
      question: "What file formats will I receive?",
      answer: "You&apos;ll get designs in all the formats you need - PNG, JPG, SVG, PDF, and more. We also provide source files so you can make future edits or work with other design tools."
    },
    {
      question: "How long does it take to create a design?",
      answer: "Most designs are generated in under 2 minutes. Complex projects with multiple variations might take 5-10 minutes. No more waiting days or weeks for designers!"
    },
    {
      question: "Do I own the rights to my designs?",
      answer: "Your rights depend on your subscription tier. Premium subscribers get full commercial ownership of AI-generated content, while standard and free users have different licensing levels. Third-party content (stock photos, fonts) used in designs maintains its original licensing requirements."
    },
    {
      question: "What about third-party content in my designs?",
      answer: "When designs include stock photos, graphics, or fonts from platforms like Unsplash or iStock, you must follow their licensing terms. We clearly indicate when third-party content is used and help ensure compliance with the original licenses."
    },
    {
      question: "Can Dinopix maintain my brand consistency?",
      answer: "Yes! Upload your brand guidelines, logos, and style preferences. Our AI will learn your brand identity and ensure all future designs maintain consistency across colors, fonts, and visual style."
    },
    {
      question: "What makes Dinopix different from other AI design tools?",
      answer: "We focus on production-ready quality with clear licensing. Unlike generic AI art generators, we create business-ready designs with proper licensing clarity, third-party content compliance, and subscription-based commercial rights."
    },
    {
      question: "How do subscription tiers affect my design rights?",
      answer: "Different tiers offer different commercial usage rights. Premium subscribers get unlimited commercial rights to AI-generated content, standard users have some limitations, and free users get personal-use rights. All tiers must comply with third-party content licenses."
    },
    {
      question: "Will there be a free trial?",
      answer: "Yes! We'll offer a free trial that lets you create several designs to experience the quality and ease of use. Early access subscribers will get extended trial periods."
    },
    {
      question: "Can teams collaborate on projects?",
      answer: "Our full launch will include team features like shared brand libraries, collaborative editing, approval workflows, and project management tools for design teams."
    }
  ];

  // Structured data for contact page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Dinopix",
    "description": "Get in touch with Dinopix team for support, partnerships, press inquiries, or early access to our AI design platform.",
    "url": "https://dinopix.ai/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Dinopix Pty Ltd",
      "url": "https://dinopix.ai",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "support@dinopix.ai",
        "availableLanguage": "English"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Dinopix | Get in Touch with Our AI Design Platform Team"
        description="Contact Dinopix for support, partnerships, press inquiries, or early access to our AI design platform. We typically respond within 24 hours."
        keywords="contact dinopix, AI design support, design platform contact, early access request, partnership inquiry, press media"
        url="https://dinopix.ai/contact"
        structuredData={structuredData}
      />
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-100">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">Dinopix</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
            <a href="/contact" className="text-green-600 font-medium">Contact</a>
          </div>
        </nav>
      </header>

      {/* Contact Hero */}
      <section className="px-6 py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about Dinopix? Want early access? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <p className="text-gray-600 mb-8">
              We typically respond within 24 hours. By submitting this form, you consent to us contacting you via email for marketing and communication purposes.
            </p>

            {!isSubmitted ? (
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">Select a topic</option>
                    <option value="early-access">Early Access Request</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="press">Press & Media</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="marketingOptIn"
                    name="marketingOptIn"
                    checked={formData.marketingOptIn}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="mt-1 w-4 h-4 text-green-600 bg-white border-gray-300 rounded focus:ring-green-500 focus:ring-2 disabled:cursor-not-allowed"
                  />
                  <label htmlFor="marketingOptIn" className="text-sm text-gray-700">
                    Subscribe to our early access list and receive updates about Dinopix launch and product news.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-gray-500">
                  By submitting this form, you agree to our <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>. Marketing communications are optional and only sent if you subscribe above.
                </p>
                </form>
                {error && (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-100 border border-green-300 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800">Message Sent!</h3>
                </div>
                <p className="text-green-700">
                  Thanks for reaching out! We&apos;ve received your message and will get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                    <div className="flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded"></div>
            <span className="text-xl font-bold text-white">Dinopix</span>
          </div>
          <p className="text-gray-400 mb-6">
            AI-powered design platform launching Q2 2025
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dinopix Pty Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}