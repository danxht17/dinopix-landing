import { Metadata } from 'next'
import Link from 'next/link'
import { PaintBrushIcon, BoltIcon, AcademicCapIcon, LightBulbIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'AI Design Resources Hub | Tools, Guides & Tutorials | Dinopix',
  description: 'Explore comprehensive AI design resources including tool reviews, tutorials, and guides. Master design automation with expert insights and practical tips.',
  keywords: 'AI design tools, design automation, AI tutorials, design guides, tool reviews, design resources',
  openGraph: {
    title: 'AI Design Resources Hub | Tools, Guides & Tutorials | Dinopix',
    description: 'Explore comprehensive AI design resources including tool reviews, tutorials, and guides. Master design automation with expert insights and practical tips.',
    type: 'website',
    url: 'https://dinopix.ai/resources',
  },
}

// Mock data - will be replaced with Notion API integration
const featuredCategories = [
  {
    id: 1,
    name: 'AI Design Tools',
    slug: 'ai-design-tools',
    description: 'Reviews and comparisons of the best AI design tools available today.',
    articleCount: 12,
    icon: PaintBrushIcon,
    color: 'bg-blue-100 text-blue-500',
  },
  {
    id: 2,
    name: 'Design Automation',
    slug: 'design-automation',
    description: 'Learn how to automate your design workflow and boost productivity.',
    articleCount: 8,
    icon: BoltIcon,
    color: 'bg-green-100 text-green-400',
  },
  {
    id: 3,
    name: 'Tutorials & Guides',
    slug: 'tutorials',
    description: 'Step-by-step tutorials for mastering AI design techniques.',
    articleCount: 15,
    icon: AcademicCapIcon,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 4,
    name: 'Industry Insights',
    slug: 'industry-insights',
    description: 'Latest trends and insights in the AI design industry.',
    articleCount: 6,
    icon: LightBulbIcon,
    color: 'bg-green-100 text-green-500',
  },
]

const featuredArticles = [
  {
    id: 1,
    title: 'Best AI Logo Generators 2025: Complete Comparison Guide',
    slug: 'best-ai-logo-generators-2025',
    category: 'AI Design Tools',
    categorySlug: 'ai-design-tools',
    excerpt: 'Discover the top AI logo generators that can create professional logos in minutes. Compare features, pricing, and quality.',
    readingTime: 8,
    publishedDate: '2025-01-15',
    featuredImage: '/api/placeholder/600/400',
    author: 'Dinopix Team',
  },
  {
    id: 2,
    title: 'How to Automate Your Design Workflow with AI Tools',
    slug: 'automate-design-workflow-ai-tools',
    category: 'Design Automation',
    categorySlug: 'design-automation',
    excerpt: 'Learn practical strategies to integrate AI tools into your design process and save hours of manual work.',
    readingTime: 12,
    publishedDate: '2025-01-12',
    featuredImage: '/api/placeholder/600/400',
    author: 'Dinopix Team',
  },
  {
    id: 3,
    title: 'Figma vs Adobe XD: AI Features Comparison 2025',
    slug: 'figma-vs-adobe-xd-ai-features-2025',
    category: 'AI Design Tools',
    categorySlug: 'ai-design-tools',
    excerpt: 'Compare the AI-powered features in Figma and Adobe XD to choose the best tool for your design needs.',
    readingTime: 10,
    publishedDate: '2025-01-10',
    featuredImage: '/api/placeholder/600/400',
    author: 'Dinopix Team',
  },
]

export default function ResourcesPage() {
  return (
    <>
      {/* Resources Header */}
      <header className="bg-white border-b border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 mb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-gray-700">Home</Link>
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

      <div className="space-y-12">
      {/* Featured Categories Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/resources/${category.slug}`}
              className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <category.icon className="w-6 h-6 mr-3 text-gray-600" />
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${category.color}`}>
                  {category.articleCount} articles
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          <Link
            href="/resources/all"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            View all articles →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-200">
                {/* Placeholder for featured image */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Featured Image
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Link
                    href={`/resources/${article.categorySlug}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    {article.category}
                  </Link>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">{article.readingTime} min read</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  <Link
                    href={`/resources/${article.categorySlug}/${article.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(article.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="text-sm text-gray-500">
                    By {article.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Stay Updated with AI Design Trends
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Get the latest articles, tool reviews, and design automation tips delivered to your inbox weekly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </section>
      </div>
    </>
  )
}
