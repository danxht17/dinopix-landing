import SEO from '@/components/SEO'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Terms() {
  // Structured data for terms page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms & Conditions - Dinopix",
    "description": "Terms and conditions for using Dinopix AI design platform, including intellectual property rights, licensing, and usage policies.",
    "url": "https://dinopix.ai/terms",
    "publisher": {
      "@type": "Organization",
      "name": "Dinopix Pty Ltd",
      "url": "https://dinopix.ai"
    },
    "dateModified": "2024-12-01",
    "inLanguage": "en-US"
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Terms & Conditions | Dinopix AI Design Platform"
        description="Terms and conditions for using Dinopix AI design platform, including intellectual property rights, licensing, usage policies, and subscription terms."
        keywords="terms conditions, AI design terms, intellectual property, licensing agreement, subscription terms, usage policy"
        url="https://dinopix.ai/terms"
        type="article"
        structuredData={structuredData}
      />
      <Navigation showJoinWaitlist={false} />

      {/* Terms Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              By accessing and using Dinopix (&ldquo;the Platform&rdquo;), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dinopix is an AI-powered design platform that generates production-ready design assets based on user inputs. Our service includes but is not limited to logo creation, marketing materials, social media graphics, and other design elements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts and Registration</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              To access certain features of the Platform, you may be required to register for an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your information to keep it accurate and current</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property Rights and Licensing</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 AI-Generated Content Rights</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your rights to AI-generated designs depend on your subscription tier:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li><strong>Premium Subscribers:</strong> Full commercial rights and ownership of all AI-generated content, including unlimited usage, modification, and distribution</li>
              <li><strong>Standard Subscribers:</strong> Commercial rights with usage limitations as defined in your subscription terms</li>
              <li><strong>Free/Trial Users:</strong> Personal use rights only; commercial usage requires subscription upgrade</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <em>Note: Subscription tiers and specific licensing terms will be clearly defined at platform launch.</em>
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Third-Party Content Integration</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              When designs incorporate third-party content (stock photos, graphics, fonts, etc.) from integrated platforms such as Unsplash, iStock, Getty Images, or other providers:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>You must comply with the original licensing terms of each third-party element</li>
              <li>Dinopix will clearly indicate when third-party content is used in your designs</li>
              <li>Some third-party content may require additional licensing fees or attribution</li>
              <li>Premium subscriptions may include extended licenses for certain third-party content</li>
              <li>You are responsible for ensuring compliance with all third-party licenses</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Platform and Technology Rights</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>Dinopix retains all rights to:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>The AI technology and algorithms</li>
              <li>Platform software and interface</li>
              <li>Proprietary design templates and frameworks</li>
              <li>Machine learning models and training data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Content Ownership Clarification</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>You own:</strong> Final designs that are purely AI-generated based on your prompts and specifications, subject to your subscription terms.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              <strong>You license:</strong> Any third-party elements incorporated into designs, subject to the original creators&apos; licensing terms.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <strong>Shared rights:</strong> Designs created using Dinopix templates may be subject to additional licensing restrictions to prevent identical commercial use by multiple users.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">4.5 Attribution and Credit</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              While not required for most AI-generated content, crediting Dinopix is appreciated. Premium subscribers receive designs without watermarks, while free users may have Dinopix branding included.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Email Communications and Marketing</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By providing your email address through our Platform, you consent to receive:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Service-related notifications and updates</li>
              <li>Marketing communications about our products and services</li>
              <li>Educational content and design tips</li>
              <li>Product announcements and feature updates</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You may unsubscribe from marketing communications at any time using the unsubscribe link in our emails.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Content Compliance and Prohibited Uses</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You may not use the Platform to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Create content that is illegal, harmful, or violates intellectual property rights</li>
              <li>Generate designs that promote hate speech, discrimination, or violence</li>
              <li>Attempt to reverse engineer or copy our AI technology</li>
              <li>Use the service for any fraudulent or unauthorized purpose</li>
              <li>Interfere with or disrupt the Platform or servers</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment and Billing</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Payment terms will be clearly displayed before purchase. Subscription fees are billed in advance and are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice to existing subscribers.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Platform Availability</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue the Platform with reasonable notice to users.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dinopix shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Platform. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the Platform constitutes acceptance of modified terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              For questions about these Terms & Conditions, please contact us at <a href="/contact" className="text-green-600 hover:underline">our contact page</a>.
            </p>
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}