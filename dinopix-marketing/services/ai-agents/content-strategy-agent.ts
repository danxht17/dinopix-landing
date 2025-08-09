import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface ContentStrategyResult {
  outline: string
  structure: string
  targetSections: Array<{
    heading: string
    purpose: string
    keyPoints: string[]
    wordCount: number
  }>
  callToAction: string
  internalLinkOpportunities: string[]
  contentType: string
  tone: string
}

export class ContentStrategyAgent {
  async execute(
    topic: NotionTopicQueue,
    parameters: any,
    previousResults?: Map<string, AgentResult>
  ): Promise<AgentResult> {
    const startTime = Date.now()

    try {
      console.log(`📋 Creating content strategy for: ${topic.topic}`)

      const seoData = previousResults?.get('seo_research')?.data
      const strategy = await this.createContentStrategy(topic, seoData, parameters)

      const processingTime = Date.now() - startTime
      console.log(`✅ Content strategy completed in ${processingTime}ms`)

      return {
        success: true,
        data: strategy,
        cost: 0, // No external API costs
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ Content strategy failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: 0,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async createContentStrategy(
    topic: NotionTopicQueue,
    seoData: any,
    parameters: any
  ): Promise<ContentStrategyResult> {
    const contentType = parameters.type || topic.assignedWorkflow.toLowerCase()
    const targetLength = this.getTargetWordCount(topic.contentLength)

    const strategy = this.getStrategyTemplate(contentType, topic, seoData, targetLength)
    
    return {
      outline: strategy.outline,
      structure: strategy.structure,
      targetSections: strategy.sections,
      callToAction: this.generateCallToAction(topic, seoData),
      internalLinkOpportunities: this.generateInternalLinks(topic, seoData),
      contentType,
      tone: this.determineTone(topic.targetAudience)
    }
  }

  private getStrategyTemplate(
    contentType: string,
    topic: NotionTopicQueue,
    seoData: any,
    targetLength: number
  ): {
    outline: string
    structure: string
    sections: Array<{ heading: string; purpose: string; keyPoints: string[]; wordCount: number }>
  } {
    const keyword = seoData?.primaryKeyword || topic.targetKeyword

    switch (contentType) {
      case 'comparison':
        return this.getComparisonStrategy(keyword, targetLength)
      case 'tutorial':
        return this.getTutorialStrategy(keyword, targetLength)
      case 'list':
        return this.getListStrategy(keyword, targetLength)
      case 'review':
        return this.getReviewStrategy(keyword, targetLength)
      default:
        return this.getStandardStrategy(keyword, targetLength)
    }
  }

  private getStandardStrategy(keyword: string, targetLength: number): any {
    const sectionWordCount = Math.floor(targetLength / 6)
    
    return {
      outline: `Comprehensive guide covering ${keyword} fundamentals, best practices, tools, and implementation strategies.`,
      structure: 'introduction-main-content-conclusion',
      sections: [
        {
          heading: `What is ${keyword}?`,
          purpose: 'Define the topic and establish context',
          keyPoints: ['Definition and overview', 'Key benefits', 'Common use cases'],
          wordCount: sectionWordCount
        },
        {
          heading: `Why ${keyword} Matters in 2025`,
          purpose: 'Establish relevance and importance',
          keyPoints: ['Current trends', 'Market growth', 'Future outlook'],
          wordCount: sectionWordCount
        },
        {
          heading: `Best ${keyword} Tools and Platforms`,
          purpose: 'Provide practical tool recommendations',
          keyPoints: ['Top tools overview', 'Feature comparison', 'Pricing analysis'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: `How to Get Started with ${keyword}`,
          purpose: 'Actionable implementation guide',
          keyPoints: ['Step-by-step process', 'Best practices', 'Common pitfalls'],
          wordCount: sectionWordCount
        },
        {
          heading: `Advanced ${keyword} Strategies`,
          purpose: 'Provide expert-level insights',
          keyPoints: ['Advanced techniques', 'Optimization tips', 'Expert recommendations'],
          wordCount: sectionWordCount
        }
      ]
    }
  }

  private getComparisonStrategy(keyword: string, targetLength: number): any {
    const sectionWordCount = Math.floor(targetLength / 7)
    
    return {
      outline: `Detailed comparison of ${keyword} options, analyzing features, pricing, pros/cons, and recommendations.`,
      structure: 'introduction-comparison-matrix-recommendations',
      sections: [
        {
          heading: `${keyword} Comparison Overview`,
          purpose: 'Set up the comparison framework',
          keyPoints: ['Comparison criteria', 'Methodology', 'What to expect'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Top Options Analyzed',
          purpose: 'Introduce the tools being compared',
          keyPoints: ['Option 1 overview', 'Option 2 overview', 'Option 3 overview'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Feature Comparison',
          purpose: 'Compare key features side-by-side',
          keyPoints: ['Core features', 'Advanced capabilities', 'Unique selling points'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Pricing Analysis',
          purpose: 'Compare costs and value proposition',
          keyPoints: ['Pricing tiers', 'Value for money', 'Hidden costs'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Pros and Cons',
          purpose: 'Balanced analysis of strengths/weaknesses',
          keyPoints: ['Advantages of each option', 'Limitations', 'Trade-offs'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Final Recommendations',
          purpose: 'Provide clear guidance for different use cases',
          keyPoints: ['Best for beginners', 'Best for professionals', 'Best value'],
          wordCount: sectionWordCount
        }
      ]
    }
  }

  private getTutorialStrategy(keyword: string, targetLength: number): any {
    const sectionWordCount = Math.floor(targetLength / 8)
    
    return {
      outline: `Step-by-step tutorial for ${keyword} with practical examples and troubleshooting tips.`,
      structure: 'introduction-prerequisites-steps-conclusion',
      sections: [
        {
          heading: `Getting Started with ${keyword}`,
          purpose: 'Set expectations and prerequisites',
          keyPoints: ['What you\'ll learn', 'Prerequisites', 'Time required'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Step 1: Initial Setup',
          purpose: 'Guide through initial configuration',
          keyPoints: ['Account creation', 'Basic settings', 'Interface overview'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Step 2: Basic Implementation',
          purpose: 'Core functionality walkthrough',
          keyPoints: ['Basic features', 'First project', 'Key concepts'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Step 3: Advanced Configuration',
          purpose: 'Optimize for better results',
          keyPoints: ['Advanced settings', 'Customization options', 'Performance tuning'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Step 4: Best Practices',
          purpose: 'Share expert recommendations',
          keyPoints: ['Workflow optimization', 'Common mistakes', 'Pro tips'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Troubleshooting Common Issues',
          purpose: 'Help readers solve problems',
          keyPoints: ['Common errors', 'Solutions', 'When to get help'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Next Steps',
          purpose: 'Guide continued learning',
          keyPoints: ['Advanced resources', 'Community', 'Further learning'],
          wordCount: sectionWordCount
        }
      ]
    }
  }

  private getListStrategy(keyword: string, targetLength: number): any {
    const itemCount = 10
    const sectionWordCount = Math.floor(targetLength / (itemCount + 2))
    
    return {
      outline: `Curated list of the best ${keyword} options with detailed analysis and recommendations.`,
      structure: 'introduction-list-items-conclusion',
      sections: [
        {
          heading: `Top ${itemCount} ${keyword} Options`,
          purpose: 'Introduce the selection criteria',
          keyPoints: ['Selection methodology', 'Evaluation criteria', 'What makes the list'],
          wordCount: sectionWordCount
        },
        ...Array.from({ length: itemCount }, (_, i) => ({
          heading: `${i + 1}. [Tool Name]`,
          purpose: `Detailed analysis of option ${i + 1}`,
          keyPoints: ['Key features', 'Pros and cons', 'Best use cases', 'Pricing'],
          wordCount: sectionWordCount
        })),
        {
          heading: 'How to Choose the Right Option',
          purpose: 'Help readers make informed decisions',
          keyPoints: ['Decision framework', 'Key considerations', 'Final recommendations'],
          wordCount: sectionWordCount
        }
      ]
    }
  }

  private getReviewStrategy(keyword: string, targetLength: number): any {
    const sectionWordCount = Math.floor(targetLength / 6)
    
    return {
      outline: `In-depth review of ${keyword} covering features, performance, pricing, and user experience.`,
      structure: 'introduction-features-testing-verdict',
      sections: [
        {
          heading: `${keyword} Overview`,
          purpose: 'Introduce the product being reviewed',
          keyPoints: ['Product overview', 'Company background', 'Target audience'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Features and Capabilities',
          purpose: 'Detailed feature analysis',
          keyPoints: ['Core features', 'Advanced capabilities', 'Unique selling points'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Hands-On Testing',
          purpose: 'Share real-world experience',
          keyPoints: ['Setup process', 'User experience', 'Performance testing'],
          wordCount: sectionWordCount * 2
        },
        {
          heading: 'Pricing and Value',
          purpose: 'Analyze cost-effectiveness',
          keyPoints: ['Pricing structure', 'Value proposition', 'Comparison with alternatives'],
          wordCount: sectionWordCount
        },
        {
          heading: 'Final Verdict',
          purpose: 'Provide clear recommendation',
          keyPoints: ['Pros and cons', 'Who should use it', 'Overall rating'],
          wordCount: sectionWordCount
        }
      ]
    }
  }

  private generateCallToAction(topic: NotionTopicQueue, seoData: any): string {
    const ctas = [
      'Ready to transform your design workflow? Try Dinopix\'s AI design platform for professional results in minutes.',
      'Start creating professional designs with AI today. Join thousands of designers already using Dinopix.',
      'Experience the future of design automation. Get early access to Dinopix and revolutionize your creative process.',
      'Don\'t let manual design work slow you down. Discover how Dinopix can accelerate your design workflow.',
      'Join the AI design revolution. Sign up for Dinopix early access and create stunning designs effortlessly.'
    ]
    
    return ctas[Math.floor(Math.random() * ctas.length)]
  }

  private generateInternalLinks(topic: NotionTopicQueue, seoData: any): string[] {
    const baseKeyword = seoData?.primaryKeyword || topic.targetKeyword
    
    return [
      `/resources/ai-design-tools/`,
      `/resources/design-automation/`,
      `/resources/tutorials/getting-started-ai-design`,
      `/resources/ai-design-tools/best-ai-design-platforms`,
      `/resources/design-automation/workflow-optimization`,
      `/app/` // Link to the main application
    ]
  }

  private determineTone(targetAudience: string): string {
    const tones = {
      'Beginners': 'friendly, educational, encouraging',
      'Intermediate': 'professional, informative, practical',
      'Advanced': 'expert, technical, comprehensive',
      'Business': 'authoritative, results-focused, strategic'
    }
    
    return tones[targetAudience as keyof typeof tones] || tones['Intermediate']
  }

  private getTargetWordCount(contentLength: string): number {
    const mapping = {
      '800-1200': 1000,
      '1200-2000': 1600,
      '2000+': 2500
    }
    return mapping[contentLength as keyof typeof mapping] || 1600
  }
}
