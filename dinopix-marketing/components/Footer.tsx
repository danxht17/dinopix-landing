import Link from 'next/link'

interface FooterProps {
  variant?: 'default' | 'resources'
}

export default function Footer({ variant = 'default' }: FooterProps) {
  if (variant === 'resources') {
    return (
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Design Workflow?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of designers already using AI to create professional designs in minutes.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Early Access
            </Link>
          </div>
          
          {/* Main Footer */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded"></div>
              <span className="text-xl font-bold text-gray-900">Dinopix</span>
            </div>
            <p className="text-gray-600 mb-6 text-center">
              AI-powered design platform launching Q2 2025
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
              <Link href="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
            </div>
            <p className="text-gray-500 text-sm text-center">
              © {new Date().getFullYear()} Dinopix Pty Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }

  // Default footer (homepage style)
  return (
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
          <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
          <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Dinopix Pty Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
