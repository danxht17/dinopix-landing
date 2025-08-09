import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Design Resources | Dinopix',
  description: 'Comprehensive guides, tutorials, and insights about AI design tools, automation, and best practices for modern designers.',
  keywords: 'AI design resources, design automation, AI tools, design guides, tutorials, best practices',
  openGraph: {
    title: 'AI Design Resources | Dinopix',
    description: 'Comprehensive guides, tutorials, and insights about AI design tools, automation, and best practices for modern designers.',
    type: 'website',
  },
}

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Resources Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <a href="/" className="hover:text-gray-700">Home</a>
              <span>/</span>
              <span className="text-gray-900">Resources</span>
            </nav>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI Design Resources
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Discover the latest insights, tools, and techniques in AI-powered design. 
              From beginner guides to advanced tutorials, everything you need to master design automation.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Resources Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Design Workflow?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of designers already using AI to create professional designs in minutes.
            </p>
            <a
              href="/app"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Early Access
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
