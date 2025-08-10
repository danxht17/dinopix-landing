import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface QualityReviewConfig {
  apiKey: string
}

export interface QualityReviewResult {
  score: number
  passed: boolean
  issues: Array<{
    severity: 'high' | 'medium' | 'low'
    category: string
    description: string
    suggestion: string
  }>
  strengths: string[]
  improvements: string[]
  brandAlignment: {
    score: number
    issues: string[]
  }
  factualAccuracy: {
    score: number
    verifiedClaims: number
    unverifiedClaims: number
  }
  contentQuality: {
    score: number
    uniqueness: number
    depth: number
    actionability: number
  }
}

export class QualityReviewAgent {
  private config: QualityReviewConfig

  constructor(config: QualityReviewConfig) {
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
      console.log(`🔍 Starting quality review for: ${topic.topic}`)

      const seoData = previousResults?.get('seo_research')?.data
      const writingResult = previousResults?.get('gpt_writing')?.data
      const researchData = previousResults?.get('perplexity_research')?.data
      const seoAudit = previousResults?.get('seo_auditor')?.data

      const threshold = parameters.threshold || 80

      const reviewResult = await this.performQualityReview(
        topic,
        seoData,
        writingResult,
        researchData,
        seoAudit,
        threshold
      )

      // Estimate cost for GPT-4 analysis
      const estimatedTokens = 1500 // For content analysis
      totalCost = estimatedTokens * 0.00003

      const processingTime = Date.now() - startTime
      console.log(`✅ Quality review completed in ${processingTime}ms`)
      console.log(`📊 Quality Score: ${reviewResult.score}/100`)
      console.log(`${reviewResult.passed ? '✅' : '❌'} Quality threshold: ${threshold}`)

      return {
        success: true,
        data: reviewResult,
        cost: totalCost,
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ Quality review failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: totalCost,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async performQualityReview(
    topic: NotionTopicQueue,
    seoData: any,
    writingResult: any,
    researchData: any,
    seoAudit: any,
    threshold: number
  ): Promise<QualityReviewResult> {
    const issues: Array<{ severity: 'high' | 'medium' | 'low'; category: string; description: string; suggestion: string }> = []
    const strengths: string[] = []
    const improvements: string[] = []

    // Review content quality
    const contentQuality = this.reviewContentQuality(writingResult, topic, researchData)
    
    // Review brand alignment
    const brandAlignment = this.reviewBrandAlignment(writingResult, topic)
    
    // Review factual accuracy
    const factualAccuracy = this.reviewFactualAccuracy(writingResult, researchData)
    
    // Analyze SEO integration
    this.analyzeSEOIntegration(seoAudit, issues, strengths)
    
    // Check content structure
    this.checkContentStructure(writingResult, issues, strengths)
    
    // Verify target audience alignment
    this.verifyAudienceAlignment(writingResult, topic, issues, strengths)
    
    // Generate improvement suggestions
    improvements.push(...this.generateImprovements(issues, contentQuality, brandAlignment))

    // Calculate overall score
    const overallScore = this.calculateOverallScore(contentQuality, brandAlignment, factualAccuracy, seoAudit)
    
    return {
      score: overallScore,
      passed: overallScore >= threshold,
      issues,
      strengths,
      improvements,
      brandAlignment,
      factualAccuracy,
      contentQuality
    }
  }

  private reviewContentQuality(writingResult: any, topic: NotionTopicQueue, researchData: any): {
    score: number
    uniqueness: number
    depth: number
    actionability: number
  } {
    let uniqueness = 85 // Base score
    let depth = 80
    let actionability = 75

    if (!writingResult?.content) {
      return { score: 0, uniqueness: 0, depth: 0, actionability: 0 }
    }

    const content = writingResult.content
    const wordCount = writingResult.wordCount || 0

    // Assess uniqueness
    if (researchData?.keyFindings?.length > 0) {
      uniqueness += 10 // Bonus for research-backed content
    }
    
    if (content.includes('case study') || content.includes('example')) {
      uniqueness += 5 // Bonus for examples
    }

    // Assess depth
    const headingCount = writingResult.headings?.length || 0
    if (headingCount >= 5) {
      depth += 10 // Good structure
    } else if (headingCount < 3) {
      depth -= 15 // Poor structure
    }

    if (wordCount >= 1500) {
      depth += 10 // Comprehensive content
    } else if (wordCount < 800) {
      depth -= 20 // Too shallow
    }

    // Assess actionability
    const actionWords = ['how to', 'step', 'guide', 'tutorial', 'implement', 'create', 'build']
    const actionableContent = actionWords.some(word => content.toLowerCase().includes(word))
    
    if (actionableContent) {
      actionability += 15
    }

    if (content.includes('<ul>') || content.includes('<ol>')) {
      actionability += 10 // Lists make content more actionable
    }

    // Normalize scores
    uniqueness = Math.min(100, Math.max(0, uniqueness))
    depth = Math.min(100, Math.max(0, depth))
    actionability = Math.min(100, Math.max(0, actionability))

    const overallScore = Math.round((uniqueness + depth + actionability) / 3)

    return { score: overallScore, uniqueness, depth, actionability }
  }

  private reviewBrandAlignment(writingResult: any, topic: NotionTopicQueue): {
    score: number
    issues: string[]
  } {
    const issues: string[] = []
    let score = 90 // Base score

    if (!writingResult?.content) {
      return { score: 0, issues: ['No content to review'] }
    }

    const content = writingResult.content.toLowerCase()

    // Check for brand voice consistency
    const brandKeywords = ['ai', 'design', 'automation', 'professional', 'efficient']
    const brandKeywordCount = brandKeywords.filter(keyword => content.includes(keyword)).length
    
    if (brandKeywordCount < 3) {
      issues.push('Content lacks key brand terminology')
      score -= 15
    }

    // Check for competitor mentions (should be neutral/positive)
    const competitors = ['canva', 'figma', 'adobe', 'sketch']
    const competitorMentions = competitors.filter(comp => content.includes(comp))
    
    if (competitorMentions.length > 0) {
      // This is actually good for comparison content
      score += 5
    }

    // Check for appropriate call-to-action
    if (!content.includes('dinopix') && !content.includes('get early access')) {
      issues.push('Missing brand call-to-action')
      score -= 10
    }

    // Check tone appropriateness for audience
    const toneIndicators = {
      'Beginners': ['easy', 'simple', 'beginner', 'start'],
      'Intermediate': ['professional', 'efficient', 'optimize'],
      'Advanced': ['advanced', 'expert', 'sophisticated'],
      'Business': ['roi', 'productivity', 'enterprise', 'scale']
    }

    const expectedTone = toneIndicators[topic.targetAudience as keyof typeof toneIndicators] || []
    const toneMatches = expectedTone.filter(indicator => content.includes(indicator)).length

    if (toneMatches === 0) {
      issues.push(`Content tone doesn't match ${topic.targetAudience} audience`)
      score -= 10
    }

    return { score: Math.max(0, score), issues }
  }

  private reviewFactualAccuracy(writingResult: any, researchData: any): {
    score: number
    verifiedClaims: number
    unverifiedClaims: number
  } {
    let score = 85 // Base score
    let verifiedClaims = 0
    let unverifiedClaims = 0

    if (!writingResult?.content) {
      return { score: 0, verifiedClaims: 0, unverifiedClaims: 0 }
    }

    // Count claims that can be verified against research data
    if (researchData?.statistics?.length > 0) {
      verifiedClaims = researchData.statistics.length
      score += verifiedClaims * 2 // Bonus for backed claims
    }

    // Look for unsupported claims (simplified detection)
    const content = writingResult.content
    const claimPatterns = [
      /\d+% of/g,
      /studies show/g,
      /research indicates/g,
      /according to/g
    ]

    let totalClaims = 0
    claimPatterns.forEach(pattern => {
      const matches = content.match(pattern) || []
      totalClaims += matches.length
    })

    unverifiedClaims = Math.max(0, totalClaims - verifiedClaims)
    
    if (unverifiedClaims > verifiedClaims) {
      score -= unverifiedClaims * 5 // Penalty for unverified claims
    }

    return { 
      score: Math.max(0, Math.min(100, score)), 
      verifiedClaims, 
      unverifiedClaims 
    }
  }

  private analyzeSEOIntegration(seoAudit: any, issues: Array<any>, strengths: string[]): void {
    if (!seoAudit) return

    if (seoAudit.score >= 80) {
      strengths.push('Excellent SEO optimization')
    } else if (seoAudit.score >= 60) {
      strengths.push('Good SEO foundation')
    } else {
      issues.push({
        severity: 'high' as const,
        category: 'SEO Integration',
        description: 'SEO optimization needs improvement',
        suggestion: 'Address critical SEO issues before publishing'
      })
    }

    // Check for critical SEO issues
    const criticalIssues = seoAudit.issues?.filter((issue: any) => issue.type === 'critical') || []
    if (criticalIssues.length > 0) {
      issues.push({
        severity: 'high' as const,
        category: 'SEO Critical',
        description: `${criticalIssues.length} critical SEO issues found`,
        suggestion: 'Fix all critical SEO issues before publication'
      })
    }
  }

  private checkContentStructure(writingResult: any, issues: Array<any>, strengths: string[]): void {
    if (!writingResult) return

    const headingCount = writingResult.headings?.length || 0
    const wordCount = writingResult.wordCount || 0

    if (headingCount >= 5 && wordCount >= 1000) {
      strengths.push('Well-structured content with clear organization')
    } else if (headingCount < 3) {
      issues.push({
        severity: 'medium' as const,
        category: 'Content Structure',
        description: 'Insufficient content structure',
        suggestion: 'Add more headings to improve content organization'
      })
    }

    // Check for introduction and conclusion
    const content = writingResult.content?.toLowerCase() || ''
    if (!content.includes('introduction') && content.substring(0, 200).length <= 100) {
      issues.push({
        severity: 'low' as const,
        category: 'Content Structure',
        description: 'Missing clear introduction',
        suggestion: 'Add a compelling introduction to hook readers'
      })
    }

    if (!content.includes('conclusion') && !content.includes('summary')) {
      issues.push({
        severity: 'low' as const,
        category: 'Content Structure',
        description: 'Missing conclusion or summary',
        suggestion: 'Add a conclusion that summarizes key points'
      })
    }
  }

  private verifyAudienceAlignment(writingResult: any, topic: NotionTopicQueue, issues: Array<any>, strengths: string[]): void {
    if (!writingResult?.content) return

    const content = writingResult.content.toLowerCase()
    const audience = topic.targetAudience

    // Check complexity level
    const complexWords = ['implementation', 'optimization', 'sophisticated', 'comprehensive', 'enterprise']
    const simpleWords = ['easy', 'simple', 'basic', 'beginner', 'start']
    
    const complexCount = complexWords.filter(word => content.includes(word)).length
    const simpleCount = simpleWords.filter(word => content.includes(word)).length

    if (audience === 'Beginners' && complexCount > simpleCount) {
      issues.push({
        severity: 'medium' as const,
        category: 'Audience Alignment',
        description: 'Content may be too complex for beginners',
        suggestion: 'Simplify language and add more explanations for basic concepts'
      })
    } else if (audience === 'Advanced' && simpleCount > complexCount) {
      issues.push({
        severity: 'medium' as const,
        category: 'Audience Alignment',
        description: 'Content may be too basic for advanced users',
        suggestion: 'Add more technical depth and advanced concepts'
      })
    } else {
      strengths.push(`Content appropriately tailored for ${audience} audience`)
    }
  }

  private generateImprovements(issues: Array<any>, contentQuality: any, brandAlignment: any): string[] {
    const improvements: string[] = []

    // High-priority improvements
    const highSeverityIssues = issues.filter(issue => issue.severity === 'high')
    if (highSeverityIssues.length > 0) {
      improvements.push('Address all high-severity issues before publishing')
    }

    // Content quality improvements
    if (contentQuality.score < 80) {
      if (contentQuality.uniqueness < 80) {
        improvements.push('Add more unique insights and original research')
      }
      if (contentQuality.depth < 80) {
        improvements.push('Expand content depth with more detailed explanations')
      }
      if (contentQuality.actionability < 80) {
        improvements.push('Include more actionable tips and step-by-step guidance')
      }
    }

    // Brand alignment improvements
    if (brandAlignment.score < 85) {
      improvements.push('Strengthen brand voice and messaging consistency')
      improvements.push('Ensure call-to-action aligns with Dinopix positioning')
    }

    // General improvements
    improvements.push('Review content for clarity and readability')
    improvements.push('Verify all claims are properly supported')
    improvements.push('Optimize internal linking opportunities')

    return improvements.slice(0, 5) // Limit to top 5 improvements
  }

  private calculateOverallScore(
    contentQuality: any,
    brandAlignment: any,
    factualAccuracy: any,
    seoAudit: any
  ): number {
    const weights = {
      contentQuality: 0.35,
      brandAlignment: 0.25,
      factualAccuracy: 0.20,
      seoIntegration: 0.20
    }

    const seoScore = seoAudit?.score || 70

    const weightedScore = 
      (contentQuality.score * weights.contentQuality) +
      (brandAlignment.score * weights.brandAlignment) +
      (factualAccuracy.score * weights.factualAccuracy) +
      (seoScore * weights.seoIntegration)

    return Math.round(weightedScore)
  }
}
