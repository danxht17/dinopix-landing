import SEO from '@/components/SEO'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Privacy() {
  // Structured data for privacy page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - Dinopix",
    "description": "Privacy policy for Dinopix AI design platform covering data collection, usage, protection, and user rights under GDPR and other privacy laws.",
    "url": "https://dinopix.ai/privacy",
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
        title="Privacy Policy | Dinopix AI Design Platform"
        description="Privacy policy for Dinopix AI design platform covering data collection, usage, protection, and user rights under GDPR and privacy laws."
        keywords="privacy policy, data protection, GDPR, user privacy, AI design privacy, data collection, user rights"
        url="https://dinopix.ai/privacy"
        type="article"
        structuredData={structuredData}
      />
      <Navigation showJoinWaitlist={false} />

      {/* Privacy Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At Dinopix, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered design platform.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Name and email address (when you register or contact us)</li>
              <li>Payment information (processed securely by third-party providers)</li>
              <li>Profile information and preferences</li>
              <li>Communication history with our support team</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Information</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Design requests and generated content</li>
              <li>Platform usage patterns and feature interactions</li>
              <li>Subscription tier and licensing usage</li>
              <li>Third-party content integration preferences</li>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Content and Licensing Data</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Records of designs created and their licensing status</li>
              <li>Third-party content usage and compliance tracking</li>
              <li>Subscription-based rights and usage limitations</li>
              <li>Commercial vs. personal use designations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Provision</h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Generate AI-powered designs based on your requests</li>
              <li>Maintain and improve our platform functionality</li>
              <li>Provide customer support and technical assistance</li>
              <li>Process payments and manage subscriptions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketing and Communications</h3>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Send service updates and platform notifications</li>
              <li>Share marketing materials about our products and services</li>
              <li>Provide educational content and design tips</li>
              <li>Announce new features and platform improvements</li>
              <li>Send personalized recommendations based on usage patterns</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Email Marketing Consent</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By providing your email address through any of the following methods, you explicitly consent to receive marketing communications:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              <li>Joining our waitlist or requesting early access</li>
              <li>Creating an account on our platform</li>
              <li>Submitting our contact form</li>
              <li>Subscribing to our newsletter</li>
            </ul>
            <p className="text-gray-700 mb-6 leading-relaxed">
              You can unsubscribe from marketing emails at any time by clicking the unsubscribe link in any email or contacting us directly. This will not affect service-related communications necessary for platform operation.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li><strong>Service Providers:</strong> Trusted partners who help us operate our platform (hosting, payment processing, analytics)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>Consent:</strong> With your explicit permission for specific purposes</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Data portability (where technically feasible)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We use cookies and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can manage cookie preferences through your browser settings, though some features may not function properly if cookies are disabled.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Data Retention</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We retain your personal information only as long as necessary to provide our services and fulfill the purposes outlined in this policy, unless a longer retention period is required by law.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of any material changes by email or through a prominent notice on our platform. Your continued use constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your information, please contact us at <a href="/contact" className="text-green-600 hover:underline">our contact page</a>.
            </p>
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}