import { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
      <Navigation showJoinWaitlist={false} />
      
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-8">
        {children}
      </main>

      <Footer variant="resources" />
    </div>
  )
}
