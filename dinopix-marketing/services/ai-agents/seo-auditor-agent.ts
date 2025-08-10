import { NotionTopicQueue } from '../notion'
import { AgentResult } from './orchestrator'

export interface SEOAuditResult {
  score: number
  issues: Array<{
    type: 'critical' | 'warning' | 'suggestion'
    category: string
    message: string
    fix: string
  }>
  recommendations: string[]
  technicalSEO: {
    titleTag: { score: number; issues: string[] }
    metaDescription: { score: number; issues: string[] }
    headingStructure: { score: number; issues: string[] }
    keywordOptimization: { score: number; issues: string[] }
    contentLength: { score: number; issues: string[] }
    readability: { score: number; issues: string[] }
  }
}

export class SEOAuditorAgent {
  async execute(
    topic: NotionTopicQueue,
    parameters: any,
    previousResults?: Map<string, AgentResult>
  ): Promise<AgentResult> {
    const startTime = Date.now()

    try {
      console.log(`🔍 Starting SEO audit for: ${topic.topic}`)

      const seoData = previousResults?.get('seo_research')?.data
      const writingResult = previousResults?.get('gpt_writing')?.data
      const contentStrategy = previousResults?.get('content_strategy')?.data

      const auditResult = await this.performSEOAudit(
        topic,
        seoData,
        writingResult,
        contentStrategy,
        parameters
      )

      const processingTime = Date.now() - startTime
      console.log(`✅ SEO audit completed in ${processingTime}ms`)
      console.log(`📊 SEO Score: ${auditResult.score}/100`)

      return {
        success: true,
        data: auditResult,
        cost: 0, // No external API costs
        processingTime: Math.round(processingTime / 1000)
      }

    } catch (error) {
      console.error('❌ SEO audit failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        cost: 0,
        processingTime: Math.round((Date.now() - startTime) / 1000)
      }
    }
  }

  private async performSEOAudit(
    topic: NotionTopicQueue,
    seoData: any,
    writingResult: any,
    contentStrategy: any,
    parameters: any
  ): Promise<SEOAuditResult> {
    const issues: Array<{ type: 'critical' | 'warning' | 'suggestion'; category: string; message: string; fix: string }> = []
    const recommendations: string[] = []

    // Audit title tag
    const titleAudit = this.auditTitleTag(seoData?.seoTitle || writingResult?.title, seoData?.primaryKeyword)
    
    // Audit meta description
    const metaAudit = this.auditMetaDescription(seoData?.metaDescription, seoData?.primaryKeyword)
    
    // Audit heading structure
    const headingAudit = this.auditHeadingStructure(writingResult?.headings || [])
    
    // Audit keyword optimization
    const keywordAudit = this.auditKeywordOptimization(
      writingResult?.content || '',
      seoData?.primaryKeyword,
      seoData?.secondaryKeywords || []
    )
    
    // Audit content length
    const lengthAudit = this.auditContentLength(writingResult?.wordCount || 0, topic.contentLength)
    
    // Audit readability
    const readabilityAudit = this.auditReadability(writingResult?.content || '', topic.targetAudience)

    // Collect all issues
    issues.push(...titleAudit.issues, ...metaAudit.issues, ...headingAudit.issues, 
               ...keywordAudit.issues, ...lengthAudit.issues, ...readabilityAudit.issues)

    // Generate recommendations
    recommendations.push(...this.generateRecommendations(issues, parameters))

    // Calculate overall score
    const technicalSEO = {
      titleTag: titleAudit,
      metaDescription: metaAudit,
      headingStructure: headingAudit,
      keywordOptimization: keywordAudit,
      contentLength: lengthAudit,
      readability: readabilityAudit
    }

    const overallScore = this.calculateOverallScore(technicalSEO)

    return {
      score: overallScore,
      issues,
      recommendations,
      technicalSEO
    }
  }

  private auditTitleTag(title: string, primaryKeyword: string): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    if (!title) {
      issues.push({
        type: 'critical',
        category: 'Title Tag',
        message: 'Title tag is missing',
        fix: 'Add a compelling title tag that includes the primary keyword'
      })
      return { score: 0, issues }
    }

    // Check length
    if (title.length < 30) {
      issues.push({
        type: 'warning',
        category: 'Title Tag',
        message: 'Title tag is too short (under 30 characters)',
        fix: 'Expand the title to 50-60 characters for better SEO'
      })
      score -= 20
    } else if (title.length > 60) {
      issues.push({
        type: 'warning',
        category: 'Title Tag',
        message: 'Title tag is too long (over 60 characters)',
        fix: 'Shorten the title to under 60 characters to prevent truncation'
      })
      score -= 15
    }

    // Check keyword inclusion
    if (primaryKeyword && !title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      issues.push({
        type: 'critical',
        category: 'Title Tag',
        message: 'Primary keyword not found in title tag',
        fix: `Include "${primaryKeyword}" in the title tag`
      })
      score -= 30
    }

    // Check keyword position
    if (primaryKeyword && title.toLowerCase().indexOf(primaryKeyword.toLowerCase()) > 30) {
      issues.push({
        type: 'suggestion',
        category: 'Title Tag',
        message: 'Primary keyword appears late in title',
        fix: 'Move the primary keyword closer to the beginning of the title'
      })
      score -= 10
    }

    return { score: Math.max(0, score), issues }
  }

  private auditMetaDescription(metaDescription: string, primaryKeyword: string): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    if (!metaDescription) {
      issues.push({
        type: 'critical',
        category: 'Meta Description',
        message: 'Meta description is missing',
        fix: 'Add a compelling meta description that includes the primary keyword'
      })
      return { score: 0, issues }
    }

    // Check length
    if (metaDescription.length < 120) {
      issues.push({
        type: 'warning',
        category: 'Meta Description',
        message: 'Meta description is too short (under 120 characters)',
        fix: 'Expand the meta description to 150-155 characters'
      })
      score -= 15
    } else if (metaDescription.length > 160) {
      issues.push({
        type: 'warning',
        category: 'Meta Description',
        message: 'Meta description is too long (over 160 characters)',
        fix: 'Shorten the meta description to under 160 characters'
      })
      score -= 15
    }

    // Check keyword inclusion
    if (primaryKeyword && !metaDescription.toLowerCase().includes(primaryKeyword.toLowerCase())) {
      issues.push({
        type: 'warning',
        category: 'Meta Description',
        message: 'Primary keyword not found in meta description',
        fix: `Include "${primaryKeyword}" in the meta description`
      })
      score -= 20
    }

    return { score: Math.max(0, score), issues }
  }

  private auditHeadingStructure(headings: Array<{ level: number; text: string }>): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    if (headings.length === 0) {
      issues.push({
        type: 'critical',
        category: 'Heading Structure',
        message: 'No headings found in content',
        fix: 'Add proper heading structure (H2, H3) to organize content'
      })
      return { score: 0, issues }
    }

    // Check for H1 (should be handled by title)
    const h1Count = headings.filter(h => h.level === 1).length
    if (h1Count > 1) {
      issues.push({
        type: 'warning',
        category: 'Heading Structure',
        message: 'Multiple H1 tags found',
        fix: 'Use only one H1 tag per page (usually the title)'
      })
      score -= 15
    }

    // Check for proper hierarchy
    let previousLevel = 1
    for (const heading of headings) {
      if (heading.level > previousLevel + 1) {
        issues.push({
          type: 'suggestion',
          category: 'Heading Structure',
          message: 'Heading hierarchy skips levels',
          fix: 'Maintain proper heading hierarchy (H1 → H2 → H3)'
        })
        score -= 5
        break
      }
      previousLevel = heading.level
    }

    // Check heading frequency
    if (headings.length < 3) {
      issues.push({
        type: 'suggestion',
        category: 'Heading Structure',
        message: 'Too few headings for content organization',
        fix: 'Add more headings to improve content structure and readability'
      })
      score -= 10
    }

    return { score: Math.max(0, score), issues }
  }

  private auditKeywordOptimization(content: string, primaryKeyword: string, secondaryKeywords: string[]): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    if (!content || !primaryKeyword) {
      return { score: 0, issues }
    }

    const contentLower = content.toLowerCase()
    const keywordLower = primaryKeyword.toLowerCase()
    
    // Count keyword occurrences
    const keywordMatches = (contentLower.match(new RegExp(keywordLower, 'g')) || []).length
    const wordCount = content.split(/\s+/).length
    const keywordDensity = (keywordMatches / wordCount) * 100

    // Check keyword density
    if (keywordDensity < 0.5) {
      issues.push({
        type: 'warning',
        category: 'Keyword Optimization',
        message: 'Primary keyword density is too low',
        fix: `Include "${primaryKeyword}" more naturally throughout the content`
      })
      score -= 20
    } else if (keywordDensity > 3) {
      issues.push({
        type: 'warning',
        category: 'Keyword Optimization',
        message: 'Primary keyword density is too high (keyword stuffing)',
        fix: 'Reduce keyword usage and focus on natural language'
      })
      score -= 25
    }

    // Check secondary keywords
    const secondaryFound = secondaryKeywords.filter(keyword => 
      contentLower.includes(keyword.toLowerCase())
    )
    
    if (secondaryFound.length < secondaryKeywords.length * 0.6) {
      issues.push({
        type: 'suggestion',
        category: 'Keyword Optimization',
        message: 'Some secondary keywords are missing',
        fix: 'Include more secondary keywords naturally in the content'
      })
      score -= 10
    }

    return { score: Math.max(0, score), issues }
  }

  private auditContentLength(wordCount: number, targetLength: string): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    const targetRanges = {
      '800-1200': { min: 800, max: 1200, optimal: 1000 },
      '1200-2000': { min: 1200, max: 2000, optimal: 1600 },
      '2000+': { min: 2000, max: 5000, optimal: 2500 }
    }

    const range = targetRanges[targetLength as keyof typeof targetRanges] || targetRanges['1200-2000']

    if (wordCount < range.min) {
      issues.push({
        type: 'warning',
        category: 'Content Length',
        message: `Content is too short (${wordCount} words, target: ${range.min}+ words)`,
        fix: `Expand content to at least ${range.min} words for better SEO performance`
      })
      score -= 20
    } else if (wordCount > range.max) {
      issues.push({
        type: 'suggestion',
        category: 'Content Length',
        message: `Content is very long (${wordCount} words)`,
        fix: 'Consider breaking into multiple articles or improving content structure'
      })
      score -= 5
    }

    return { score: Math.max(0, score), issues }
  }

  private auditReadability(content: string, targetAudience: string): { score: number; issues: Array<any> } {
    const issues: Array<any> = []
    let score = 100

    if (!content) {
      return { score: 0, issues }
    }

    // Simple readability checks
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = content.split(/\s+/).filter(w => w.length > 0)
    const avgWordsPerSentence = words.length / sentences.length

    // Check sentence length
    if (avgWordsPerSentence > 20) {
      issues.push({
        type: 'suggestion',
        category: 'Readability',
        message: 'Sentences are too long on average',
        fix: 'Break down long sentences for better readability'
      })
      score -= 10
    }

    // Check paragraph structure (simplified)
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    const avgWordsPerParagraph = words.length / paragraphs.length

    if (avgWordsPerParagraph > 150) {
      issues.push({
        type: 'suggestion',
        category: 'Readability',
        message: 'Paragraphs are too long',
        fix: 'Break content into shorter paragraphs (100-150 words max)'
      })
      score -= 10
    }

    // Audience-specific checks
    if (targetAudience === 'Beginners' && avgWordsPerSentence > 15) {
      issues.push({
        type: 'suggestion',
        category: 'Readability',
        message: 'Content may be too complex for beginners',
        fix: 'Simplify language and sentence structure for beginner audience'
      })
      score -= 15
    }

    return { score: Math.max(0, score), issues }
  }

  private generateRecommendations(issues: Array<any>, parameters: any): string[] {
    const recommendations: string[] = []
    const strict = parameters.strict || false

    // Group issues by type
    const criticalIssues = issues.filter(i => i.type === 'critical')
    const warningIssues = issues.filter(i => i.type === 'warning')
    const suggestionIssues = issues.filter(i => i.type === 'suggestion')

    if (criticalIssues.length > 0) {
      recommendations.push('Address all critical SEO issues before publishing')
      recommendations.push('Focus on title tag and keyword optimization first')
    }

    if (warningIssues.length > 0) {
      recommendations.push('Review and fix warning-level SEO issues')
      recommendations.push('Optimize meta description and content length')
    }

    if (strict && suggestionIssues.length > 0) {
      recommendations.push('Consider implementing suggested improvements for optimal SEO')
    }

    // Add general recommendations
    recommendations.push('Ensure content provides genuine value to readers')
    recommendations.push('Include relevant internal and external links')
    recommendations.push('Optimize images with proper alt text')

    return recommendations
  }

  private calculateOverallScore(technicalSEO: any): number {
    const weights = {
      titleTag: 0.25,
      metaDescription: 0.15,
      headingStructure: 0.15,
      keywordOptimization: 0.25,
      contentLength: 0.10,
      readability: 0.10
    }

    let totalScore = 0
    Object.entries(weights).forEach(([key, weight]) => {
      totalScore += technicalSEO[key].score * weight
    })

    return Math.round(totalScore)
  }
}
