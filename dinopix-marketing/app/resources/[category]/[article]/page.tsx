import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: {
    category: string
    article: string
  }
}

// Mock data - will be replaced with Notion API integration
const articles = {
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
  const categoryArticles = articles[params.category as keyof typeof articles]
  const article = categoryArticles?.[params.article as keyof typeof categoryArticles]
  
  if (!article) {
    return {
      title: 'Article Not Found | Dinopix Resources',
    }
  }

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords],
    authors: [{ name: article.author }],
    creator: 'Dinopix',
    publisher: 'Dinopix',
    openGraph: {
      type: 'article',
      title: article.seoTitle,
      description: article.metaDescription,
      images: [{
        url: article.featuredImage,
        width: 1200,
        height: 630,
        alt: article.imageAltText,
      }],
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      section: params.category,
      authors: [article.author],
      url: `https://dinopix.ai/resources/${params.category}/${params.article}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seoTitle,
      description: article.metaDescription,
      images: [article.featuredImage],
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

export default function ArticlePage({ params }: ArticlePageProps) {
  const categoryArticles = articles[params.category as keyof typeof articles]
  const article = categoryArticles?.[params.article as keyof typeof categoryArticles]

  if (!article) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
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
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dinopix.ai/resources/${params.category}/${params.article}`,
    },
    image: {
      '@type': 'ImageObject',
      url: article.featuredImage,
      alt: article.imageAltText,
    },
    articleSection: params.category,
    keywords: article.secondaryKeywords.join(', '),
    wordCount: article.wordCount,
    timeRequired: `PT${article.readingTime}M`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/resources" className="hover:text-gray-700">Resources</Link>
          <span>/</span>
          <Link href={`/resources/${params.category}`} className="hover:text-gray-700 capitalize">
            {params.category.replace('-', ' ')}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedDate}>
              {new Date(article.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            <span>•</span>
            <span>{article.wordCount} words</span>
          </div>

          <p className="text-xl text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              Featured Image: {article.imageAltText}
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {/* Article Footer */}
        <footer className="border-t border-gray-200 pt-8">
          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {article.primaryKeyword}
              </span>
              {article.secondaryKeywords.map((keyword) => (
                <span key={keyword} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Early Access CTA */}
          <div className="bg-blue-50 rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to Transform Your Design Workflow?
            </h3>
            <p className="text-gray-600 mb-4">
              Join thousands of designers using AI to create professional designs in minutes.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Get Early Access to Dinopix
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}
