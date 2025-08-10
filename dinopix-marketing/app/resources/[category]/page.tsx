import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PaintBrushIcon, BoltIcon } from '@heroicons/react/24/outline'

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Mock data - will be replaced with Notion API integration
const categories = {
  'ai-design-tools': {
    name: 'AI Design Tools',
    description: 'Comprehensive reviews and comparisons of the best AI design tools available today. Find the perfect tool for your design workflow.',
    seoTitle: 'Best AI Design Tools 2025 | Reviews & Comparisons | Dinopix',
    metaDescription: 'Discover the top AI design tools with detailed reviews, feature comparisons, and pricing analysis. Find the perfect AI tool for your design needs.',
    icon: PaintBrushIcon,
    articles: [
      {
        id: 1,
        title: 'Best AI Logo Generators 2025: Complete Comparison Guide',
        slug: 'best-ai-logo-generators-2025',
        excerpt: 'Discover the top AI logo generators that can create professional logos in minutes. Compare features, pricing, and quality.',
        readingTime: 8,
        publishedDate: '2025-01-15',
        author: 'Dinopix Team',
      },
      {
        id: 2,
        title: 'Figma vs Adobe XD: AI Features Comparison 2025',
        slug: 'figma-vs-adobe-xd-ai-features-2025',
        excerpt: 'Compare the AI-powered features in Figma and Adobe XD to choose the best tool for your design needs.',
        readingTime: 10,
        publishedDate: '2025-01-10',
        author: 'Dinopix Team',
      },
    ]
  },
  'design-automation': {
    name: 'Design Automation',
    description: 'Learn how to automate your design workflow and boost productivity with AI-powered tools and techniques.',
    seoTitle: 'Design Automation Guide | AI Workflow Tips | Dinopix',
    metaDescription: 'Master design automation with AI tools. Learn practical strategies to streamline your workflow and boost productivity.',
    icon: BoltIcon,
    articles: [
      {
        id: 3,
        title: 'How to Automate Your Design Workflow with AI Tools',
        slug: 'automate-design-workflow-ai-tools',
        excerpt: 'Learn practical strategies to integrate AI tools into your design process and save hours of manual work.',
        readingTime: 12,
        publishedDate: '2025-01-12',
        author: 'Dinopix Team',
      },
    ]
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryData = categories[params.category as keyof typeof categories]
  
  if (!categoryData) {
    return {
      title: 'Category Not Found | Dinopix Resources',
    }
  }

  return {
    title: categoryData.seoTitle,
    description: categoryData.metaDescription,
    keywords: `${categoryData.name.toLowerCase()}, AI design, design tools, automation`,
    openGraph: {
      title: categoryData.seoTitle,
      description: categoryData.metaDescription,
      type: 'website',
      url: `https://dinopix.ai/resources/${params.category}`,
    },
    alternates: {
      canonical: `https://dinopix.ai/resources/${params.category}`,
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = categories[params.category as keyof typeof categories]

  if (!categoryData) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryData.name,
    description: categoryData.description,
    url: `https://dinopix.ai/resources/${params.category}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categoryData.articles.map((article, index) => ({
        '@type': 'Article',
        position: index + 1,
        headline: article.title,
        url: `https://dinopix.ai/resources/${params.category}/${article.slug}`,
        datePublished: article.publishedDate,
        author: {
          '@type': 'Organization',
          name: article.author,
        },
      })),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-gray-700">Resources</Link>
          <span>/</span>
          <span className="text-gray-900">{categoryData.name}</span>
        </nav>

        {/* Category Header */}
        <header className="text-center py-8 md:py-12 px-5 bg-white rounded-lg border border-gray-200">
          <div className="flex justify-center mb-4">
            <categoryData.icon className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
          <div className="mt-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {categoryData.articles.length} articles
            </span>
          </div>
        </header>

        {/* Articles Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData.articles.map((article) => (
              <article key={article.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Featured Image
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-sm text-gray-500">{article.readingTime} min read</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(article.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/resources/${params.category}/${article.slug}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/resources/${params.category}/${article.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read article →
                    </Link>
                    <span className="text-sm text-gray-500">
                      By {article.author}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Related Categories */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Explore More Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(categories)
              .filter(([slug]) => slug !== params.category)
              .map(([slug, category]) => (
                <Link
                  key={slug}
                  href={`/resources/${slug}`}
                  className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center mb-2">
                    <category.icon className="w-5 h-5 mr-2 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">{category.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {category.articles.length} articles
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </>
  )
}
