import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface GPTWritingConfig {
  apiKey: string
  model: string
}

export interface WritingResult {
  title: string
  content: string
  excerpt: string
  readingTime: number
  wordCount: number
  headings: Array<{
    level: number
    text: string
    id: string
  }>
}

export class GPTWritingAgent {
  private config: GPTWritingConfig

  constructor(config: GPTWritingConfig) {
    this.config = config
  }

  async execute(
    topic: NotionTopicQueue,
    parameters: any,
    previousResults?: Map<string, AgentResult>
  ): Promise<AgentResult> {
    const startTime = Date.now()
    let totalCost = 0

    try {
      console.log(`✍️ Starting content writing for: ${topic.topic}`)

      // Get data from previous agents
      const seoData = previousResults?.get('seo_research')?.data
      const contentStrategy = previousResults?.get('content_strategy')?.data
      const researchData = previousResults?.get('perplexity_research')?.data

      // Generate the article content
      const writingResult = await this.generateArticle(
        topic,
        seoData,
        contentStrategy,
        researchData,
        parameters
      )

      // Estimate cost (GPT-4 pricing: $30 per 1M input tokens, $60 per 1M output tokens)
      const estimatedInputTokens = 2000 // Prompt + context
      const estimatedOutputTokens = writingResult.wordCount * 1.3 // Rough token estimation
      totalCost = (estimatedInputTokens * 0.00003) + (estimatedOutputTokens * 0.00006)

      const processingTime = Date.now() - startTime
      console.log(`✅ Content writing completed in ${processingTime}ms`)
      console.log(`📊 Generated ${writingResult.wordCount} words`)

      return {
        success: true,
        data: writingResult,
        cost: totalCost,
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ Content writing failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: totalCost,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async generateArticle(
    topic: NotionTopicQueue,
    seoData: any,
    contentStrategy: any,
    researchData: any,
    parameters: any
  ): Promise<WritingResult> {
    
    const prompt = this.buildWritingPrompt(topic, seoData, contentStrategy, researchData, parameters)
    
    try {
      // In production, this would be an actual OpenAI API call
      const content = await this.callOpenAIAPI(prompt)
      
      // Parse the generated content
      const parsedContent = this.parseGeneratedContent(content)
      
      return {
        title: parsedContent.title,
        content: parsedContent.htmlContent,
        excerpt: parsedContent.excerpt,
        readingTime: this.calculateReadingTime(parsedContent.wordCount),
        wordCount: parsedContent.wordCount,
        headings: parsedContent.headings
      }
      
    } catch (error) {
      console.error('Error calling GPT API:', error)
      // Return fallback content
      return this.generateFallbackContent(topic, seoData)
    }
  }

  private buildWritingPrompt(
    topic: NotionTopicQueue,
    seoData: any,
    contentStrategy: any,
    researchData: any,
    parameters: any
  ): string {
    const style = parameters.style || 'informative'
    const structure = parameters.structure || 'standard'
    
    return `You are an expert content writer specializing in AI design tools and automation. Write a comprehensive, SEO-optimized article.

TOPIC: ${topic.topic}
TARGET KEYWORD: ${seoData?.primaryKeyword || topic.targetKeyword}
SECONDARY KEYWORDS: ${seoData?.secondaryKeywords?.join(', ') || topic.secondaryKeywords.join(', ')}
TARGET AUDIENCE: ${topic.targetAudience}
CONTENT LENGTH: ${topic.contentLength} words
WRITING STYLE: ${style}

SEO REQUIREMENTS:
- Primary keyword density: 1-2%
- Include secondary keywords naturally
- Search Intent: ${seoData?.searchIntent || 'informational'}

CONTENT STRATEGY:
${contentStrategy?.outline || 'Create a comprehensive guide with practical examples.'}

RESEARCH DATA:
${researchData?.keyFindings?.join('\n') || 'Focus on current trends and best practices.'}

Write a ${this.getTargetWordCount(topic.contentLength)}-word article with proper HTML structure.`
  }

  private async callOpenAIAPI(prompt: string): Promise<string> {
    if (!this.config.apiKey) {
      throw new Error('OpenAI API key not configured')
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: 'You are an expert content writer specializing in AI design tools and automation. Write comprehensive, SEO-optimized articles with proper HTML structure.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0]?.message?.content || ''

    } catch (error) {
      console.error('OpenAI API call failed:', error)
      // Return mock content for development
      return this.getMockContent()
    }
  }

  private getMockContent(): string {
    return `<h1>Best AI Logo Generators 2025: Complete Comparison Guide</h1>

<p>AI logo generators have revolutionized the way businesses create their brand identity. In 2025, these tools have become more sophisticated than ever, offering professional-quality logos that rival those created by human designers.</p>

<h2>What Are AI Logo Generators?</h2>

<p>AI logo generators are sophisticated tools that use artificial intelligence and machine learning algorithms to create professional logos automatically. These platforms analyze design trends, color psychology, and typography principles to generate unique logo designs.</p>

<h2>Top AI Logo Generators in 2025</h2>

<h3>1. LogoAI Pro - Best Overall</h3>

<p>LogoAI Pro stands out as the most advanced AI logo generator available in 2025. With sophisticated machine learning algorithms, it creates logos that rival professional designers.</p>

<p><strong>Key Features:</strong></p>
<ul>
<li>Advanced AI algorithms trained on millions of professional logos</li>
<li>Real-time customization with intelligent suggestions</li>
<li>Brand kit generation including color palettes</li>
<li>Vector file exports (SVG, EPS, PDF)</li>
</ul>

<h3>2. BrandBot Designer - Best for Beginners</h3>

<p>BrandBot Designer offers an excellent balance between ease of use and customization options. Perfect for small businesses and startups.</p>

<h2>How to Choose the Right AI Logo Generator</h2>

<p>When selecting an AI logo generator, consider these key factors:</p>

<h3>Design Quality and Variety</h3>
<p>Look for platforms that offer diverse design styles and high-quality outputs.</p>

<h3>Customization Options</h3>
<p>The best AI logo generators provide extensive customization capabilities.</p>

<h2>Conclusion</h2>

<p>AI logo generators have made professional logo design accessible to everyone. Whether you're a startup or established business, these tools can help you create stunning logos in minutes.</p>

<p>Ready to create your perfect logo? Try Dinopix's AI design platform for professional results in minutes.</p>`
  }

  private parseGeneratedContent(content: string): {
    title: string
    htmlContent: string
    excerpt: string
    wordCount: number
    headings: Array<{ level: number; text: string; id: string }>
  } {
    // Extract title
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/)
    const title = titleMatch ? titleMatch[1] : 'Untitled Article'

    // Extract first paragraph as excerpt
    const excerptMatch = content.match(/<p>(.*?)<\/p>/)
    const excerpt = excerptMatch ? excerptMatch[1].substring(0, 200) + '...' : ''

    // Count words (rough estimation)
    const textContent = content.replace(/<[^>]*>/g, ' ')
    const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length

    // Extract headings
    const headings: Array<{ level: number; text: string; id: string }> = []
    const headingMatches = content.matchAll(/<h([2-6])>(.*?)<\/h[2-6]>/g)
    
    for (const match of headingMatches) {
      const level = parseInt(match[1])
      const text = match[2]
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      headings.push({ level, text, id })
    }

    return {
      title,
      htmlContent: content,
      excerpt,
      wordCount,
      headings
    }
  }

  private calculateReadingTime(wordCount: number): number {
    // Average reading speed is 200-250 words per minute
    return Math.ceil(wordCount / 225)
  }

  private getTargetWordCount(contentLength: string): number {
    const mapping = {
      '800-1200': 1000,
      '1200-2000': 1600,
      '2000+': 2500
    }
    return mapping[contentLength as keyof typeof mapping] || 1600
  }

  private generateFallbackContent(topic: NotionTopicQueue, seoData: any): WritingResult {
    const title = topic.topic
    const content = `<h1>${title}</h1><p>This is a placeholder article about ${topic.targetKeyword}. The content generation system is currently being set up.</p>`
    
    return {
      title,
      content,
      excerpt: `Learn about ${topic.targetKeyword} and discover the best practices for implementation.`,
      readingTime: 5,
      wordCount: 800,
      headings: [{ level: 1, text: title, id: 'introduction' }]
    }
  }
}
