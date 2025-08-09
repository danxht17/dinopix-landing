import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface SEOResearchConfig {
  dataforSEOApiKey: string
  ahrefsApiKey?: string
}

export interface SEOResearchResult {
  primaryKeyword: string
  secondaryKeywords: string[]
  searchVolume: number
  difficulty: number
  topCompetitors: Array<{
    url: string
    title: string
    position: number
    domain: string
  }>
  contentGaps: string[]
  recommendedLength: number
  searchIntent: 'informational' | 'commercial' | 'navigational' | 'transactional'
  contentAngle: string
  targetFeatures: string[]
  seoTitle: string
  metaDescription: string
}

export class SEOResearchAgent {
  private config: SEOResearchConfig

  constructor(config: SEOResearchConfig) {
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
      console.log(`🔍 Starting SEO research for: ${topic.targetKeyword}`)

      // Extract primary keyword from topic
      const primaryKeyword = await this.extractPrimaryKeyword(topic.topic, topic.targetKeyword)
      
      // Perform keyword research
      const keywordData = await this.researchKeywords(primaryKeyword)
      totalCost += 0.01 // DataForSEO cost estimate

      // Analyze competition
      const competitionAnalysis = await this.analyzeCompetition(primaryKeyword)
      totalCost += 0.02 // Additional API cost

      // Find content gaps
      const contentGaps = await this.findContentGaps(primaryKeyword, competitionAnalysis.topCompetitors)

      // Analyze search intent
      const searchIntent = await this.analyzeSearchIntent(primaryKeyword)

      // Generate content angle
      const contentAngle = await this.suggestContentAngle(
        primaryKeyword,
        competitionAnalysis,
        searchIntent,
        topic.targetAudience
      )

      // Generate SEO metadata
      const seoMetadata = await this.generateSEOMetadata(
        primaryKeyword,
        contentAngle,
        topic.contentLength
      )

      const result: SEOResearchResult = {
        primaryKeyword,
        secondaryKeywords: keywordData.relatedKeywords.slice(0, 10),
        searchVolume: keywordData.searchVolume,
        difficulty: keywordData.difficulty,
        topCompetitors: competitionAnalysis.topCompetitors.slice(0, 5),
        contentGaps,
        recommendedLength: this.getRecommendedLength(topic.contentLength, keywordData.difficulty),
        searchIntent,
        contentAngle: contentAngle.angle,
        targetFeatures: contentAngle.targetFeatures,
        seoTitle: seoMetadata.title,
        metaDescription: seoMetadata.description
      }

      const processingTime = Date.now() - startTime
      console.log(`✅ SEO research completed in ${processingTime}ms`)

      return {
        success: true,
        data: result,
        cost: totalCost,
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ SEO research failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: totalCost,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async extractPrimaryKeyword(topic: string, targetKeyword: string): Promise<string> {
    // Use the provided target keyword or extract from topic
    if (targetKeyword && targetKeyword.trim()) {
      return targetKeyword.trim().toLowerCase()
    }

    // Simple keyword extraction from topic
    // In production, this could use NLP to extract better keywords
    return topic.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .slice(0, 3)
      .join(' ')
  }

  private async researchKeywords(primaryKeyword: string): Promise<{
    searchVolume: number
    difficulty: number
    relatedKeywords: string[]
  }> {
    try {
      // Mock DataForSEO API call
      // In production, this would make actual API calls to DataForSEO
      const mockData = await this.mockDataForSEOCall(primaryKeyword)
      
      return {
        searchVolume: mockData.searchVolume,
        difficulty: mockData.difficulty,
        relatedKeywords: mockData.relatedKeywords
      }
    } catch (error) {
      console.error('Error in keyword research:', error)
      // Return fallback data
      return {
        searchVolume: 1000,
        difficulty: 50,
        relatedKeywords: [
          `${primaryKeyword} tools`,
          `${primaryKeyword} guide`,
          `${primaryKeyword} tutorial`,
          `best ${primaryKeyword}`,
          `${primaryKeyword} comparison`
        ]
      }
    }
  }

  private async analyzeCompetition(primaryKeyword: string): Promise<{
    topCompetitors: Array<{
      url: string
      title: string
      position: number
      domain: string
    }>
  }> {
    try {
      // Mock SERP analysis
      // In production, this would analyze actual SERP results
      const mockCompetitors = [
        {
          url: 'https://example1.com/article',
          title: `Best ${primaryKeyword} Tools 2025`,
          position: 1,
          domain: 'example1.com'
        },
        {
          url: 'https://example2.com/guide',
          title: `Complete ${primaryKeyword} Guide`,
          position: 2,
          domain: 'example2.com'
        },
        {
          url: 'https://example3.com/comparison',
          title: `${primaryKeyword} Comparison`,
          position: 3,
          domain: 'example3.com'
        }
      ]

      return { topCompetitors: mockCompetitors }
    } catch (error) {
      console.error('Error in competition analysis:', error)
      return { topCompetitors: [] }
    }
  }

  private async findContentGaps(primaryKeyword: string, competitors: any[]): Promise<string[]> {
    // Analyze competitor content to find gaps
    // This is a simplified version - in production, this would analyze actual content
    const commonGaps = [
      'Pricing comparison tables',
      'Step-by-step tutorials',
      'Video demonstrations',
      'User testimonials and case studies',
      'Mobile app features',
      'Integration capabilities',
      'Security and compliance information',
      'Customer support options'
    ]

    // Return 3-5 relevant gaps based on keyword and competitors
    return commonGaps.slice(0, Math.floor(Math.random() * 3) + 3)
  }

  private async analyzeSearchIntent(primaryKeyword: string): Promise<'informational' | 'commercial' | 'navigational' | 'transactional'> {
    // Analyze search intent based on keyword patterns
    const keyword = primaryKeyword.toLowerCase()
    
    if (keyword.includes('buy') || keyword.includes('price') || keyword.includes('cost')) {
      return 'transactional'
    }
    
    if (keyword.includes('best') || keyword.includes('top') || keyword.includes('review')) {
      return 'commercial'
    }
    
    if (keyword.includes('how to') || keyword.includes('what is') || keyword.includes('guide')) {
      return 'informational'
    }
    
    // Default to informational for most design-related content
    return 'informational'
  }

  private async suggestContentAngle(
    primaryKeyword: string,
    competitionAnalysis: any,
    searchIntent: string,
    targetAudience: string
  ): Promise<{
    angle: string
    targetFeatures: string[]
  }> {
    const angles = {
      'Beginners': {
        angle: `Complete beginner's guide to ${primaryKeyword} with step-by-step instructions`,
        targetFeatures: ['Easy-to-follow steps', 'Screenshots', 'Common mistakes to avoid', 'Getting started checklist']
      },
      'Intermediate': {
        angle: `Advanced ${primaryKeyword} techniques and best practices for professionals`,
        targetFeatures: ['Advanced techniques', 'Pro tips', 'Workflow optimization', 'Case studies']
      },
      'Advanced': {
        angle: `Expert-level ${primaryKeyword} strategies and cutting-edge approaches`,
        targetFeatures: ['Expert strategies', 'Advanced integrations', 'Performance optimization', 'Industry insights']
      },
      'Business': {
        angle: `Business guide to ${primaryKeyword}: ROI, implementation, and scaling`,
        targetFeatures: ['ROI analysis', 'Implementation roadmap', 'Team collaboration', 'Enterprise features']
      }
    }

    return angles[targetAudience as keyof typeof angles] || angles['Intermediate']
  }

  private async generateSEOMetadata(
    primaryKeyword: string,
    contentAngle: any,
    contentLength: string
  ): Promise<{
    title: string
    description: string
  }> {
    const currentYear = new Date().getFullYear()
    
    const title = `${this.capitalizeWords(primaryKeyword)} ${currentYear}: ${contentAngle.angle.split(':')[0]} | Dinopix`
    
    const description = `${contentAngle.angle}. Discover expert tips, tools, and strategies. Complete guide with examples and best practices.`
    
    return {
      title: title.slice(0, 60), // SEO title length limit
      description: description.slice(0, 155) // Meta description length limit
    }
  }

  private getRecommendedLength(contentLength: string, difficulty: number): number {
    const baseLength = {
      '800-1200': 1000,
      '1200-2000': 1600,
      '2000+': 2500
    }[contentLength] || 1600

    // Increase length for higher difficulty keywords
    const difficultyMultiplier = 1 + (difficulty / 100)
    
    return Math.round(baseLength * difficultyMultiplier)
  }

  private capitalizeWords(str: string): string {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }

  private async mockDataForSEOCall(keyword: string): Promise<any> {
    // Mock API response - in production, replace with actual DataForSEO API calls
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
    
    return {
      searchVolume: Math.floor(Math.random() * 5000) + 500,
      difficulty: Math.floor(Math.random() * 80) + 20,
      relatedKeywords: [
        `${keyword} tools`,
        `${keyword} software`,
        `${keyword} guide`,
        `${keyword} tutorial`,
        `best ${keyword}`,
        `${keyword} comparison`,
        `${keyword} review`,
        `${keyword} tips`,
        `${keyword} examples`,
        `${keyword} 2025`
      ]
    }
  }
}
