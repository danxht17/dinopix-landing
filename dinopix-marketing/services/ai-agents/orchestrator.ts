import { NotionService, NotionTopicQueue } from '../notion'
import { SEOResearchAgent } from './seo-research-agent'
import { ContentStrategyAgent } from './content-strategy-agent'
import { PerplexityResearchAgent } from './perplexity-research-agent'
import { ImageGenerationAgent } from './image-generation-agent'
import { GPTWritingAgent } from './gpt-writing-agent'
import { SEOAuditorAgent } from './seo-auditor-agent'
import { QualityReviewAgent } from './quality-review-agent'

export interface AgentResult {
  success: boolean
  data?: any
  error?: string
  cost?: number
  processingTime?: number
}

export interface WorkflowStep {
  agentType: string
  parameters: any
  required: boolean
}

export interface ContentWorkflow {
  id: string
  name: string
  steps: WorkflowStep[]
}

export class ContentOrchestrator {
  private notion: NotionService
  private agents: Map<string, any>
  private workflows: Map<string, ContentWorkflow>

  constructor() {
    this.notion = new NotionService()
    this.agents = new Map()
    this.workflows = new Map()
    this.initializeAgents()
    this.initializeWorkflows()
  }

  private initializeAgents() {
    // Initialize all AI agents
    this.agents.set('seo_research', new SEOResearchAgent({
      dataforSEOApiKey: process.env.DATAFORSEO_API_KEY || '',
      ahrefsApiKey: process.env.AHREFS_API_KEY || ''
    }))

    this.agents.set('content_strategy', new ContentStrategyAgent())

    this.agents.set('perplexity_research', new PerplexityResearchAgent({
      apiKey: process.env.PERPLEXITY_API_KEY || ''
    }))

    this.agents.set('image_generation', new ImageGenerationAgent({
      openaiApiKey: process.env.OPENAI_API_KEY || '',
      unsplashApiKey: process.env.UNSPLASH_API_KEY || ''
    }))

    this.agents.set('gpt_writing', new GPTWritingAgent({
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4-turbo'
    }))

    this.agents.set('seo_auditor', new SEOAuditorAgent())

    this.agents.set('quality_review', new QualityReviewAgent({
      apiKey: process.env.OPENAI_API_KEY || ''
    }))
  }

  private initializeWorkflows() {
    // Standard article workflow
    this.workflows.set('standard', {
      id: 'standard',
      name: 'Standard Article Workflow',
      steps: [
        {
          agentType: 'seo_research',
          parameters: { depth: 'comprehensive' },
          required: true
        },
        {
          agentType: 'content_strategy',
          parameters: { type: 'article' },
          required: true
        },
        {
          agentType: 'perplexity_research',
          parameters: { queries: 5 },
          required: true
        },
        {
          agentType: 'gpt_writing',
          parameters: { style: 'informative' },
          required: true
        },
        {
          agentType: 'image_generation',
          parameters: { count: 3 },
          required: true
        },
        {
          agentType: 'seo_auditor',
          parameters: { strict: true },
          required: true
        },
        {
          agentType: 'quality_review',
          parameters: { threshold: 80 },
          required: true
        }
      ]
    })

    // Comparison workflow
    this.workflows.set('comparison', {
      id: 'comparison',
      name: 'Comparison Article Workflow',
      steps: [
        {
          agentType: 'seo_research',
          parameters: { depth: 'comprehensive', focus: 'comparison' },
          required: true
        },
        {
          agentType: 'content_strategy',
          parameters: { type: 'comparison' },
          required: true
        },
        {
          agentType: 'perplexity_research',
          parameters: { queries: 8, focus: 'features_pricing' },
          required: true
        },
        {
          agentType: 'gpt_writing',
          parameters: { style: 'analytical', structure: 'comparison' },
          required: true
        },
        {
          agentType: 'image_generation',
          parameters: { count: 4, type: 'comparison_charts' },
          required: true
        },
        {
          agentType: 'seo_auditor',
          parameters: { strict: true },
          required: true
        },
        {
          agentType: 'quality_review',
          parameters: { threshold: 85 },
          required: true
        }
      ]
    })

    // Tutorial workflow
    this.workflows.set('tutorial', {
      id: 'tutorial',
      name: 'Tutorial Article Workflow',
      steps: [
        {
          agentType: 'seo_research',
          parameters: { depth: 'focused', intent: 'how_to' },
          required: true
        },
        {
          agentType: 'content_strategy',
          parameters: { type: 'tutorial' },
          required: true
        },
        {
          agentType: 'perplexity_research',
          parameters: { queries: 6, focus: 'step_by_step' },
          required: true
        },
        {
          agentType: 'gpt_writing',
          parameters: { style: 'instructional', structure: 'step_by_step' },
          required: true
        },
        {
          agentType: 'image_generation',
          parameters: { count: 5, type: 'screenshots_diagrams' },
          required: true
        },
        {
          agentType: 'seo_auditor',
          parameters: { strict: true },
          required: true
        },
        {
          agentType: 'quality_review',
          parameters: { threshold: 80 },
          required: true
        }
      ]
    })
  }

  // Main processing loop
  async processTopicQueue(): Promise<void> {
    console.log('🤖 Starting AI content generation process...')
    
    try {
      const queuedTopics = await this.notion.getQueuedTopics()
      console.log(`📋 Found ${queuedTopics.length} topics in queue`)

      for (const topic of queuedTopics) {
        console.log(`🎯 Processing topic: ${topic.topic}`)
        await this.processSingleTopic(topic)
      }

      console.log('✅ Queue processing completed')
    } catch (error) {
      console.error('❌ Error processing topic queue:', error)
    }
  }

  // Process a single topic through the complete pipeline
  async processSingleTopic(topic: NotionTopicQueue): Promise<void> {
    const startTime = Date.now()
    let totalCost = 0

    try {
      // Mark as processing
      await this.notion.updateTopicStatus(topic.id, 'Research')

      // Get the appropriate workflow
      const workflow = this.workflows.get(topic.assignedWorkflow.toLowerCase()) || 
                      this.workflows.get('standard')!

      console.log(`🔄 Using ${workflow.name} for topic: ${topic.topic}`)

      // Execute each step in the workflow
      const results: Map<string, AgentResult> = new Map()

      for (const step of workflow.steps) {
        console.log(`⚡ Executing ${step.agentType} agent...`)

        try {
          // Update status based on current step
          const statusMap: { [key: string]: string } = {
            'seo_research': 'Research',
            'content_strategy': 'Content Strategy',
            'perplexity_research': 'Research',
            'gpt_writing': 'Writing',
            'image_generation': 'Image Gen',
            'seo_auditor': 'SEO Audit',
            'quality_review': 'Quality Review'
          }

          await this.notion.updateTopicStatus(topic.id, statusMap[step.agentType] || 'Research')

          // Execute the agent
          const agent = this.agents.get(step.agentType)
          if (!agent) {
            throw new Error(`Agent ${step.agentType} not found`)
          }

          const result = await agent.execute(topic, step.parameters, results)
          results.set(step.agentType, result)

          // Track costs
          if (result.cost) {
            totalCost += result.cost
          }

          // Quality gate check
          if (step.required && !result.success) {
            throw new Error(`Required step ${step.agentType} failed: ${result.error}`)
          }

          console.log(`✅ ${step.agentType} completed successfully`)

        } catch (stepError) {
          console.error(`❌ Step ${step.agentType} failed:`, stepError)
          
          if (step.required) {
            await this.handleProcessingError(topic, stepError as Error)
            return
          }
        }
      }

      // All steps completed successfully
      const processingTime = Math.round((Date.now() - startTime) / 1000 / 60) // minutes
      
      await this.notion.updateTopicStatus(topic.id, 'Complete', {
        processingTime,
        costTracking: totalCost
      })

      // Create the final article in Notion
      await this.createFinalArticle(topic, results)

      console.log(`🎉 Topic "${topic.topic}" completed successfully in ${processingTime} minutes`)
      console.log(`💰 Total cost: $${totalCost.toFixed(4)}`)

    } catch (error) {
      console.error(`❌ Failed to process topic "${topic.topic}":`, error)
      await this.handleProcessingError(topic, error as Error)
    }
  }

  private async createFinalArticle(topic: NotionTopicQueue, results: Map<string, AgentResult>): Promise<void> {
    try {
      const seoData = results.get('seo_research')?.data
      const contentStrategy = results.get('content_strategy')?.data
      const writingResult = results.get('gpt_writing')?.data
      const imageResult = results.get('image_generation')?.data
      const seoAudit = results.get('seo_auditor')?.data
      const qualityReview = results.get('quality_review')?.data

      const articleData = {
        title: writingResult?.title || topic.topic,
        category: topic.category,
        status: 'Review' as const,
        contentType: this.mapWorkflowToContentType(topic.assignedWorkflow),
        source: 'AI Generated' as const,
        primaryKeyword: seoData?.primaryKeyword || topic.targetKeyword,
        secondaryKeywords: seoData?.secondaryKeywords || topic.secondaryKeywords,
        targetSearchVolume: seoData?.searchVolume || topic.searchVolume,
        keywordDifficulty: seoData?.difficulty || 0,
        seoTitle: seoData?.seoTitle || writingResult?.title,
        metaDescription: seoData?.metaDescription || writingResult?.excerpt,
        content: writingResult?.content || '',
        featuredImage: imageResult?.featuredImage || '',
        imageAltText: imageResult?.altText || '',
        author: 'Dinopix AI',
        readingTime: writingResult?.readingTime || 0,
        wordCount: writingResult?.wordCount || 0,
        qualityScore: qualityReview?.score || 0,
        seoScore: seoAudit?.score || 0,
      }

      await this.notion.createArticle(articleData)
      console.log('📝 Article created in Notion for review')

    } catch (error) {
      console.error('❌ Error creating final article:', error)
    }
  }

  private mapWorkflowToContentType(workflow: string): 'Article' | 'Guide' | 'Comparison' | 'List' | 'Tutorial' | 'Case Study' {
    const mapping: { [key: string]: any } = {
      'standard': 'Article',
      'comparison': 'Comparison',
      'tutorial': 'Tutorial',
      'list': 'List',
      'review': 'Article'
    }
    return mapping[workflow.toLowerCase()] || 'Article'
  }

  private async handleProcessingError(topic: NotionTopicQueue, error: Error): Promise<void> {
    console.error(`❌ Processing failed for topic "${topic.topic}":`, error.message)
    
    await this.notion.updateTopicStatus(topic.id, 'Failed')
    
    // Could add error notification logic here
    // e.g., send email, Slack notification, etc.
  }

  // Manual trigger for processing a specific topic
  async processTopicById(topicId: string): Promise<void> {
    try {
      const topics = await this.notion.getQueuedTopics()
      const topic = topics.find(t => t.id === topicId)
      
      if (!topic) {
        throw new Error(`Topic with ID ${topicId} not found`)
      }

      await this.processSingleTopic(topic)
    } catch (error) {
      console.error('❌ Error processing specific topic:', error)
    }
  }

  // Get processing statistics
  async getProcessingStats(): Promise<any> {
    // This could query Notion for analytics
    // For now, return basic stats
    return {
      totalProcessed: 0,
      averageProcessingTime: 0,
      averageCost: 0,
      successRate: 0
    }
  }
}

export const contentOrchestrator = new ContentOrchestrator()
