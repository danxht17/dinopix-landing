import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface ImageGenerationConfig {
  openaiApiKey: string
  unsplashApiKey: string
}

export interface ImageResult {
  featuredImage: string
  additionalImages: Array<{
    url: string
    altText: string
    caption: string
    type: 'hero' | 'inline' | 'comparison' | 'diagram'
  }>
  altText: string
  imagePrompts: string[]
}

export class ImageGenerationAgent {
  private config: ImageGenerationConfig

  constructor(config: ImageGenerationConfig) {
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
      console.log(`🎨 Generating images for: ${topic.topic}`)

      const seoData = previousResults?.get('seo_research')?.data
      const contentStrategy = previousResults?.get('content_strategy')?.data
      
      const imageCount = parameters.count || 3
      const imageType = parameters.type || 'general'

      const imageResult = await this.generateImages(
        topic,
        seoData,
        contentStrategy,
        imageCount,
        imageType
      )

      // DALL-E 3 pricing: $0.04 per 1024x1024 image
      totalCost = imageCount * 0.04

      const processingTime = Date.now() - startTime
      console.log(`✅ Image generation completed in ${processingTime}ms`)
      console.log(`🖼️ Generated ${imageCount} images`)

      return {
        success: true,
        data: imageResult,
        cost: totalCost,
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ Image generation failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: totalCost,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async generateImages(
    topic: NotionTopicQueue,
    seoData: any,
    contentStrategy: any,
    imageCount: number,
    imageType: string
  ): Promise<ImageResult> {
    const keyword = seoData?.primaryKeyword || topic.targetKeyword
    const prompts = this.generateImagePrompts(keyword, imageType, imageCount)

    const images = await Promise.all(
      prompts.map(async (prompt, index) => {
        if (index === 0) {
          // First image is the featured image
          return {
            url: await this.generateImage(prompt),
            altText: this.generateAltText(prompt, keyword),
            caption: this.generateCaption(prompt, keyword),
            type: 'hero' as const
          }
        } else {
          return {
            url: await this.generateImage(prompt),
            altText: this.generateAltText(prompt, keyword),
            caption: this.generateCaption(prompt, keyword),
            type: this.determineImageType(prompt, imageType)
          }
        }
      })
    )

    return {
      featuredImage: images[0]?.url || '',
      additionalImages: images.slice(1),
      altText: images[0]?.altText || `${keyword} illustration`,
      imagePrompts: prompts
    }
  }

  private generateImagePrompts(keyword: string, imageType: string, count: number): string[] {
    const baseStyle = "modern, clean, professional design, high quality, 4K resolution"
    
    const promptTemplates = {
      general: [
        `Hero image showing ${keyword} interface with modern UI design, ${baseStyle}`,
        `Infographic style illustration of ${keyword} workflow process, ${baseStyle}`,
        `Split-screen comparison showing before and after using ${keyword}, ${baseStyle}`,
        `Dashboard screenshot of ${keyword} analytics and metrics, ${baseStyle}`,
        `Team collaboration using ${keyword} tools, diverse professionals, ${baseStyle}`
      ],
      comparison_charts: [
        `Side-by-side comparison chart of ${keyword} features, clean table design, ${baseStyle}`,
        `Pricing comparison infographic for ${keyword} tools, modern layout, ${baseStyle}`,
        `Feature matrix visualization for ${keyword} platforms, professional design, ${baseStyle}`,
        `Performance benchmark chart comparing ${keyword} options, data visualization, ${baseStyle}`
      ],
      screenshots_diagrams: [
        `Clean screenshot of ${keyword} user interface, modern app design, ${baseStyle}`,
        `Step-by-step diagram showing ${keyword} process flow, instructional design, ${baseStyle}`,
        `Architecture diagram of ${keyword} system components, technical illustration, ${baseStyle}`,
        `Workflow diagram for ${keyword} implementation, process visualization, ${baseStyle}`,
        `Mobile app screenshot of ${keyword} interface, responsive design, ${baseStyle}`
      ],
      tutorial: [
        `Tutorial step illustration for ${keyword} setup process, instructional design, ${baseStyle}`,
        `Before and after comparison showing ${keyword} results, transformation visual, ${baseStyle}`,
        `Hands-on demonstration of ${keyword} features, user interaction, ${baseStyle}`,
        `Progress indicator showing ${keyword} learning path, educational design, ${baseStyle}`
      ]
    }

    const templates = promptTemplates[imageType as keyof typeof promptTemplates] || promptTemplates.general
    return templates.slice(0, count)
  }

  private async generateImage(prompt: string): Promise<string> {
    if (!this.config.openaiApiKey) {
      // Return placeholder for development
      return this.getPlaceholderImage(prompt)
    }

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
          style: 'natural'
        }),
      })

      if (!response.ok) {
        throw new Error(`DALL-E API error: ${response.status}`)
      }

      const data = await response.json()
      return data.data[0]?.url || this.getPlaceholderImage(prompt)

    } catch (error) {
      console.error('DALL-E API call failed:', error)
      return this.getPlaceholderImage(prompt)
    }
  }

  private getPlaceholderImage(prompt: string): string {
    // Generate a placeholder image URL for development
    const encodedPrompt = encodeURIComponent(prompt.substring(0, 50))
    return `https://via.placeholder.com/1024x630/4F46E5/FFFFFF?text=${encodedPrompt}`
  }

  private generateAltText(prompt: string, keyword: string): string {
    // Extract key elements from prompt for alt text
    const cleanPrompt = prompt.toLowerCase()
    
    if (cleanPrompt.includes('comparison')) {
      return `Comparison chart showing ${keyword} features and options`
    } else if (cleanPrompt.includes('diagram')) {
      return `Diagram illustrating ${keyword} workflow and process`
    } else if (cleanPrompt.includes('screenshot')) {
      return `Screenshot of ${keyword} user interface and dashboard`
    } else if (cleanPrompt.includes('infographic')) {
      return `Infographic displaying ${keyword} statistics and data`
    } else {
      return `Professional illustration of ${keyword} concept and implementation`
    }
  }

  private generateCaption(prompt: string, keyword: string): string {
    const cleanPrompt = prompt.toLowerCase()
    
    if (cleanPrompt.includes('comparison')) {
      return `Compare the key features and capabilities of different ${keyword} solutions`
    } else if (cleanPrompt.includes('workflow')) {
      return `Visual representation of the ${keyword} implementation process`
    } else if (cleanPrompt.includes('dashboard')) {
      return `Analytics dashboard showing ${keyword} performance metrics`
    } else if (cleanPrompt.includes('team')) {
      return `Collaborative team environment using ${keyword} tools`
    } else {
      return `Professional visualization of ${keyword} concepts and applications`
    }
  }

  private determineImageType(prompt: string, imageType: string): 'hero' | 'inline' | 'comparison' | 'diagram' {
    const cleanPrompt = prompt.toLowerCase()
    
    if (cleanPrompt.includes('comparison') || cleanPrompt.includes('vs')) {
      return 'comparison'
    } else if (cleanPrompt.includes('diagram') || cleanPrompt.includes('flow') || cleanPrompt.includes('process')) {
      return 'diagram'
    } else {
      return 'inline'
    }
  }

  // Fallback to Unsplash for stock photos if needed
  private async searchUnsplash(query: string): Promise<string> {
    if (!this.config.unsplashApiKey) {
      return this.getPlaceholderImage(query)
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        {
          headers: {
            'Authorization': `Client-ID ${this.config.unsplashApiKey}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`)
      }

      const data = await response.json()
      return data.results[0]?.urls?.regular || this.getPlaceholderImage(query)

    } catch (error) {
      console.error('Unsplash API call failed:', error)
      return this.getPlaceholderImage(query)
    }
  }
}
