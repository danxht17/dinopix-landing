import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import NewsletterSubscription from '@/components/NewsletterSubscription'

interface ArticlePageProps {
  params: Promise<{
    category: string
    article: string
  }>
}

interface Article {
  title: string
  seoTitle: string
  metaDescription: string
  primaryKeyword: string
  secondaryKeywords: string[]
  author: string
  publishedDate: string
  updatedDate: string
  featuredImage: string
  imageAltText: string
  excerpt: string
  content: string
  wordCount: number
  readingTime: number
}

interface ArticleCategory {
  [key: string]: Article
}

interface ArticlesData {
  [key: string]: ArticleCategory
}

// Mock data - will be replaced with Notion API integration
const articles: ArticlesData = {
  'ai-design-tools': {
    'best-ai-logo-generators-2025': {
      title: 'Best AI Logo Generators 2025: Complete Comparison Guide',
      seoTitle: 'Best AI Logo Generators 2025 | Complete Comparison & Reviews | Dinopix',
      metaDescription: 'Discover the top AI logo generators of 2025. Compare features, pricing, and quality to find the perfect tool for creating professional logos in minutes.',
      content: `
        <h2>Introduction</h2>
        <p>AI logo generators have revolutionized the way businesses create their brand identity. In 2025, these tools have become more sophisticated, offering professional-quality logos in minutes rather than days.</p>
        
        <h2>Top AI Logo Generators</h2>
        <h3>1. LogoAI Pro</h3>
        <p>LogoAI Pro stands out as the most advanced AI logo generator available in 2025. With its sophisticated machine learning algorithms, it can create logos that rival those made by professional designers.</p>
        
        <h3>2. BrandBot Designer</h3>
        <p>BrandBot Designer offers an excellent balance between ease of use and customization options. Perfect for small businesses and startups.</p>
        
        <h2>Comparison Table</h2>
        <p>Here's a detailed comparison of the top AI logo generators...</p>
        
        <h2>Conclusion</h2>
        <p>Choosing the right AI logo generator depends on your specific needs, budget, and design preferences. For most users, we recommend starting with LogoAI Pro for its superior quality and extensive customization options.</p>
      `,
      excerpt: 'Discover the top AI logo generators that can create professional logos in minutes. Compare features, pricing, and quality.',
      readingTime: 8,
      wordCount: 1850,
      publishedDate: '2025-01-15',
      updatedDate: '2025-01-15',
      author: 'Dinopix Team',
      primaryKeyword: 'AI logo generators',
      secondaryKeywords: ['logo design AI', 'automated logo creation', 'AI branding tools'],
      featuredImage: '/api/placeholder/1200/630',
      imageAltText: 'Comparison of top AI logo generators showing different logo designs',
    },
    'figma-vs-adobe-xd-ai-features-2025': {
      title: 'Figma vs Adobe XD: AI Features Comparison 2025',
      seoTitle: 'Figma vs Adobe XD AI Features 2025 | Complete Comparison | Dinopix',
      metaDescription: 'Compare AI-powered features in Figma and Adobe XD. Discover which design tool offers better AI assistance for your workflow in 2025.',
      content: `
        <h2>AI Features Overview</h2>
        <p>Both Figma and Adobe XD have significantly enhanced their AI capabilities in 2025, but they take different approaches to AI-assisted design.</p>
        
        <h2>Figma's AI Features</h2>
        <h3>Auto Layout Intelligence</h3>
        <p>Figma's AI-powered Auto Layout has become incredibly sophisticated, automatically adjusting layouts based on content changes.</p>
        
        <h2>Adobe XD's AI Features</h2>
        <h3>Content-Aware Fill</h3>
        <p>Adobe XD's integration with Adobe Sensei provides powerful content-aware features that can intelligently fill design elements.</p>
        
        <h2>Which Tool is Better?</h2>
        <p>The choice between Figma and Adobe XD depends on your specific workflow and team collaboration needs...</p>
      `,
      excerpt: 'Compare the AI-powered features in Figma and Adobe XD to choose the best tool for your design needs.',
      readingTime: 10,
      wordCount: 2200,
      publishedDate: '2025-01-10',
      updatedDate: '2025-01-10',
      author: 'Dinopix Team',
      primaryKeyword: 'Figma vs Adobe XD',
      secondaryKeywords: ['AI design features', 'design tool comparison', 'UI design software'],
      featuredImage: '/api/placeholder/1200/630',
      imageAltText: 'Side-by-side comparison of Figma and Adobe XD interfaces showing AI features',
    }
  },
  'design-automation': {
    'automate-design-workflow-ai-tools': {
      title: 'How to Automate Your Design Workflow with AI Tools',
      seoTitle: 'Automate Design Workflow with AI | Complete Guide 2025 | Dinopix',
      metaDescription: 'Learn how to automate your design workflow using AI tools. Boost productivity and save time with these proven automation strategies.',
      content: `
        <h2>Why Automate Your Design Workflow?</h2>
        <p>Design automation isn't about replacing creativity—it's about freeing up time for the creative work that matters most.</p>
        
        <h2>Essential AI Tools for Design Automation</h2>
        <h3>1. Asset Generation Tools</h3>
        <p>AI-powered asset generation tools can create variations of your designs automatically...</p>
        
        <h3>2. Color Palette Generators</h3>
        <p>Smart color palette tools use AI to suggest harmonious color combinations...</p>
        
        <h2>Implementation Strategy</h2>
        <p>Here's a step-by-step approach to implementing design automation in your workflow...</p>
      `,
      excerpt: 'Learn practical strategies to integrate AI tools into your design process and save hours of manual work.',
      readingTime: 12,
      wordCount: 2800,
      publishedDate: '2025-01-12',
      updatedDate: '2025-01-12',
      author: 'Dinopix Team',
      primaryKeyword: 'design workflow automation',
      secondaryKeywords: ['AI design tools', 'design productivity', 'automated design process'],
      featuredImage: '/api/placeholder/1200/630',
      imageAltText: 'Flowchart showing automated design workflow with AI tools',
    }
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const categoryData = articles[resolvedParams.category as keyof typeof articles]
  
  if (!categoryData) {
    return {
      title: 'Article Not Found | Dinopix Resources',
    }
  }

  const articleData = categoryData[resolvedParams.article as keyof typeof categoryData]

  if (!articleData) {
    return {
      title: 'Article Not Found | Dinopix Resources',
    }
  }

  const typedArticle = articleData as Article

  return {
    title: typedArticle.seoTitle,
    description: typedArticle.metaDescription,
    keywords: [typedArticle.primaryKeyword, ...typedArticle.secondaryKeywords],
    authors: [{ name: typedArticle.author }],
    creator: 'Dinopix',
    publisher: 'Dinopix',
    openGraph: {
      type: 'article',
      title: typedArticle.seoTitle,
      description: typedArticle.metaDescription,
      images: [{
        url: typedArticle.featuredImage,
        width: 1200,
        height: 630,
        alt: typedArticle.imageAltText,
      }],
      publishedTime: typedArticle.publishedDate,
      modifiedTime: typedArticle.updatedDate,
      section: params.category,
      authors: [typedArticle.author],
      url: `https://dinopix.ai/resources/${params.category}/${params.article}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: typedArticle.seoTitle,
      description: typedArticle.metaDescription,
      images: [typedArticle.featuredImage],
    },
    alternates: {
      canonical: `https://dinopix.ai/resources/${params.category}/${params.article}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

export async function generateStaticParams() {
  const params: { category: string; article: string }[] = []
  
  Object.entries(articles).forEach(([category, categoryArticles]) => {
    Object.keys(categoryArticles).forEach((article) => {
      params.push({ category, article })
    })
  })
  
  return params
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params
  const categoryArticles = articles[resolvedParams.category]
  
  if (!categoryArticles) {
    notFound()
  }
  
  const article = categoryArticles[resolvedParams.article]

  if (!article) {
    notFound()
  }

  // Type assertion to help TypeScript understand article is not null after the check
  const typedArticle = article as Article

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: typedArticle.title,
    description: typedArticle.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Dinopix',
      url: 'https://dinopix.ai',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dinopix',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dinopix.ai/logo.png',
      },
    },
    datePublished: typedArticle.publishedDate,
    dateModified: typedArticle.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dinopix.ai/resources/${params.category}/${params.article}`,
    },
    image: {
      '@type': 'ImageObject',
      url: typedArticle.featuredImage,
      alt: typedArticle.imageAltText,
    },
    articleSection: params.category,
    keywords: typedArticle.secondaryKeywords.join(', '),
    wordCount: typedArticle.wordCount,
    timeRequired: `PT${typedArticle.readingTime}M`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-gray-700">Resources</Link>
          <span>/</span>
          <Link href={`/resources/${resolvedParams.category}`} className="hover:text-gray-700 capitalize">
            {resolvedParams.category.replace('-', ' ')}
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {typedArticle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-4">
            <span>By {typedArticle.author}</span>
            <span className="hidden sm:inline">•</span>
            <time dateTime={typedArticle.publishedDate}>
              {new Date(typedArticle.publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </time>
            <span className="hidden sm:inline">•</span>
            <span>{typedArticle.readingTime} min read</span>
          </div>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {typedArticle.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Featured Image: {typedArticle.imageAltText}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="mb-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:leading-tight [&_h2:first-child]:mt-0 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:leading-tight [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-gray-700 [&_p]:mb-6 [&_p:last-child]:mb-0"
          dangerouslySetInnerHTML={{ __html: typedArticle.content }} 
        />

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {typedArticle.primaryKeyword}
              </span>
              {typedArticle.secondaryKeywords.map((keyword: string) => (
                <span key={keyword} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription CTA */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
              Stay Updated with AI Design Insights
            </h3>
            <p className="text-gray-600 mb-4 text-center">
              Get the latest AI design tools, tutorials, and industry insights delivered to your inbox weekly.
            </p>
            <NewsletterSubscription />
          </div>
        </footer>
        </article>
      </main>
    </>
  )
}
