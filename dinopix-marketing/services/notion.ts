import { Client } from '@notionhq/client'

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// Database IDs - these will be set up in Notion
const DATABASES = {
  CATEGORIES: process.env.NOTION_CATEGORIES_DB_ID || '',
  ARTICLES: process.env.NOTION_ARTICLES_DB_ID || '',
  TOPIC_QUEUE: process.env.NOTION_TOPIC_QUEUE_DB_ID || '',
  ANALYTICS: process.env.NOTION_ANALYTICS_DB_ID || '',
}

// Types for our Notion data structures
export interface NotionCategory {
  id: string
  name: string
  slug: string
  description: string
  status: 'Active' | 'Inactive'
  sortOrder: number
  seoTitle: string
  metaDescription: string
  color: string
  icon: string
  createdDate: string
  updatedDate: string
}

export interface NotionArticle {
  id: string
  title: string
  slug: string
  category: string
  categorySlug: string
  status: 'Draft' | 'AI Processing' | 'Review' | 'Published' | 'Archived'
  contentType: 'Article' | 'Guide' | 'Comparison' | 'List' | 'Tutorial' | 'Case Study'
  source: 'AI Generated' | 'Manual' | 'Hybrid'
  primaryKeyword: string
  secondaryKeywords: string[]
  targetSearchVolume: number
  keywordDifficulty: number
  seoTitle: string
  metaDescription: string
  content: string
  featuredImage: string
  imageAltText: string
  author: string
  publishedDate: string
  updatedDate: string
  readingTime: number
  wordCount: number
  qualityScore: number
  seoScore: number
  performanceScore: number
  pageViews: number
  averagePosition: number
  clickThroughRate: number
  backlinks: number
  socialShares: number
  conversionRate: number
}

export interface NotionTopicQueue {
  id: string
  topic: string
  category: string
  priority: 'High' | 'Medium' | 'Low'
  status: 'Queued' | 'Research' | 'Content Strategy' | 'Writing' | 'Image Gen' | 'SEO Audit' | 'Quality Review' | 'Complete' | 'Failed'
  targetKeyword: string
  secondaryKeywords: string[]
  searchVolume: number
  competitionLevel: 'Low' | 'Medium' | 'High'
  contentBrief: string
  targetAudience: 'Beginners' | 'Intermediate' | 'Advanced' | 'Business'
  contentLength: '800-1200' | '1200-2000' | '2000+'
  assignedWorkflow: 'Standard' | 'Comparison' | 'Tutorial' | 'List' | 'Review'
  dueDate: string
  createdDate: string
  processingTime: number
  costTracking: number
}

// Notion API service functions
export class NotionService {
  // Get all published articles
  async getPublishedArticles(): Promise<NotionArticle[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.ARTICLES,
        filter: {
          property: 'Status',
          select: {
            equals: 'Published'
          }
        },
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending'
          }
        ]
      })

      return response.results.map(this.parseArticlePage)
    } catch (error) {
      console.error('Error fetching published articles:', error)
      return []
    }
  }

  // Get articles by category
  async getArticlesByCategory(categorySlug: string): Promise<NotionArticle[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.ARTICLES,
        filter: {
          and: [
            {
              property: 'Status',
              select: {
                equals: 'Published'
              }
            },
            {
              property: 'Category Slug',
              rich_text: {
                equals: categorySlug
              }
            }
          ]
        },
        sorts: [
          {
            property: 'Published Date',
            direction: 'descending'
          }
        ]
      })

      return response.results.map(this.parseArticlePage)
    } catch (error) {
      console.error('Error fetching articles by category:', error)
      return []
    }
  }

  // Get single article by slug
  async getArticleBySlug(slug: string): Promise<NotionArticle | null> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.ARTICLES,
        filter: {
          and: [
            {
              property: 'Slug',
              formula: {
                string: {
                  equals: slug
                }
              }
            },
            {
              property: 'Status',
              select: {
                equals: 'Published'
              }
            }
          ]
        }
      })

      if (response.results.length === 0) {
        return null
      }

      return this.parseArticlePage(response.results[0])
    } catch (error) {
      console.error('Error fetching article by slug:', error)
      return null
    }
  }

  // Get all categories
  async getCategories(): Promise<NotionCategory[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.CATEGORIES,
        filter: {
          property: 'Status',
          select: {
            equals: 'Active'
          }
        },
        sorts: [
          {
            property: 'Sort Order',
            direction: 'ascending'
          }
        ]
      })

      return response.results.map(this.parseCategoryPage)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<NotionCategory | null> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.CATEGORIES,
        filter: {
          and: [
            {
              property: 'Slug',
              formula: {
                string: {
                  equals: slug
                }
              }
            },
            {
              property: 'Status',
              select: {
                equals: 'Active'
              }
            }
          ]
        }
      })

      if (response.results.length === 0) {
        return null
      }

      return this.parseCategoryPage(response.results[0])
    } catch (error) {
      console.error('Error fetching category by slug:', error)
      return null
    }
  }

  // Get queued topics for AI processing
  async getQueuedTopics(): Promise<NotionTopicQueue[]> {
    try {
      const response = await notion.databases.query({
        database_id: DATABASES.TOPIC_QUEUE,
        filter: {
          property: 'Status',
          select: {
            equals: 'Queued'
          }
        },
        sorts: [
          {
            property: 'Priority',
            direction: 'ascending'
          },
          {
            property: 'Due Date',
            direction: 'ascending'
          }
        ]
      })

      return response.results.map(this.parseTopicQueuePage)
    } catch (error) {
      console.error('Error fetching queued topics:', error)
      return []
    }
  }

  // Update topic status
  async updateTopicStatus(topicId: string, status: string, data?: Partial<NotionTopicQueue>): Promise<void> {
    try {
      const updateData: any = {
        Status: {
          select: {
            name: status
          }
        }
      }

      // Add additional data if provided
      if (data?.processingTime) {
        updateData['Processing Time'] = {
          number: data.processingTime
        }
      }

      if (data?.costTracking) {
        updateData['Cost Tracking'] = {
          number: data.costTracking
        }
      }

      await notion.pages.update({
        page_id: topicId,
        properties: updateData
      })
    } catch (error) {
      console.error('Error updating topic status:', error)
    }
  }

  // Create new article from AI generation
  async createArticle(articleData: Partial<NotionArticle>): Promise<string | null> {
    try {
      const response = await notion.pages.create({
        parent: {
          database_id: DATABASES.ARTICLES
        },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: articleData.title || ''
                }
              }
            ]
          },
          'Category': {
            relation: [
              {
                id: articleData.category || ''
              }
            ]
          },
          'Status': {
            select: {
              name: articleData.status || 'Draft'
            }
          },
          'Content Type': {
            select: {
              name: articleData.contentType || 'Article'
            }
          },
          'Source': {
            select: {
              name: articleData.source || 'AI Generated'
            }
          },
          'Primary Keyword': {
            rich_text: [
              {
                text: {
                  content: articleData.primaryKeyword || ''
                }
              }
            ]
          },
          'SEO Title': {
            rich_text: [
              {
                text: {
                  content: articleData.seoTitle || ''
                }
              }
            ]
          },
          'Meta Description': {
            rich_text: [
              {
                text: {
                  content: articleData.metaDescription || ''
                }
              }
            ]
          },
          'Content': {
            rich_text: [
              {
                text: {
                  content: articleData.content || ''
                }
              }
            ]
          }
        }
      })

      return response.id
    } catch (error) {
      console.error('Error creating article:', error)
      return null
    }
  }

  // Helper functions to parse Notion pages
  private parseArticlePage(page: any): NotionArticle {
    const properties = page.properties
    
    return {
      id: page.id,
      title: properties.Title?.title?.[0]?.text?.content || '',
      slug: properties.Slug?.formula?.string || '',
      category: properties.Category?.relation?.[0]?.id || '',
      categorySlug: properties['Category Slug']?.rich_text?.[0]?.text?.content || '',
      status: properties.Status?.select?.name || 'Draft',
      contentType: properties['Content Type']?.select?.name || 'Article',
      source: properties.Source?.select?.name || 'Manual',
      primaryKeyword: properties['Primary Keyword']?.rich_text?.[0]?.text?.content || '',
      secondaryKeywords: properties['Secondary Keywords']?.multi_select?.map((item: any) => item.name) || [],
      targetSearchVolume: properties['Target Search Volume']?.number || 0,
      keywordDifficulty: properties['Keyword Difficulty']?.number || 0,
      seoTitle: properties['SEO Title']?.rich_text?.[0]?.text?.content || '',
      metaDescription: properties['Meta Description']?.rich_text?.[0]?.text?.content || '',
      content: properties.Content?.rich_text?.[0]?.text?.content || '',
      featuredImage: properties['Featured Image']?.files?.[0]?.file?.url || '',
      imageAltText: properties['Image Alt Text']?.rich_text?.[0]?.text?.content || '',
      author: properties.Author?.select?.name || 'Dinopix Team',
      publishedDate: properties['Published Date']?.date?.start || '',
      updatedDate: properties['Updated Date']?.last_edited_time || '',
      readingTime: properties['Reading Time']?.formula?.number || 0,
      wordCount: properties['Word Count']?.formula?.number || 0,
      qualityScore: properties['Quality Score']?.number || 0,
      seoScore: properties['SEO Score']?.number || 0,
      performanceScore: properties['Performance Score']?.number || 0,
      pageViews: properties['Page Views']?.number || 0,
      averagePosition: properties['Average Position']?.number || 0,
      clickThroughRate: properties['Click-Through Rate']?.number || 0,
      backlinks: properties.Backlinks?.number || 0,
      socialShares: properties['Social Shares']?.number || 0,
      conversionRate: properties['Conversion Rate']?.number || 0,
    }
  }

  private parseCategoryPage(page: any): NotionCategory {
    const properties = page.properties
    
    return {
      id: page.id,
      name: properties.Name?.title?.[0]?.text?.content || '',
      slug: properties.Slug?.formula?.string || '',
      description: properties.Description?.rich_text?.[0]?.text?.content || '',
      status: properties.Status?.select?.name || 'Active',
      sortOrder: properties['Sort Order']?.number || 0,
      seoTitle: properties['SEO Title']?.rich_text?.[0]?.text?.content || '',
      metaDescription: properties['Meta Description']?.rich_text?.[0]?.text?.content || '',
      color: properties.Color?.select?.name || 'blue',
      icon: properties.Icon?.files?.[0]?.file?.url || '',
      createdDate: properties['Created Date']?.created_time || '',
      updatedDate: properties['Updated Date']?.last_edited_time || '',
    }
  }

  private parseTopicQueuePage(page: any): NotionTopicQueue {
    const properties = page.properties
    
    return {
      id: page.id,
      topic: properties.Topic?.title?.[0]?.text?.content || '',
      category: properties.Category?.relation?.[0]?.id || '',
      priority: properties.Priority?.select?.name || 'Medium',
      status: properties.Status?.select?.name || 'Queued',
      targetKeyword: properties['Target Keyword']?.rich_text?.[0]?.text?.content || '',
      secondaryKeywords: properties['Secondary Keywords']?.multi_select?.map((item: any) => item.name) || [],
      searchVolume: properties['Search Volume']?.number || 0,
      competitionLevel: properties['Competition Level']?.select?.name || 'Medium',
      contentBrief: properties['Content Brief']?.rich_text?.[0]?.text?.content || '',
      targetAudience: properties['Target Audience']?.select?.name || 'Intermediate',
      contentLength: properties['Content Length']?.select?.name || '1200-2000',
      assignedWorkflow: properties['Assigned Workflow']?.select?.name || 'Standard',
      dueDate: properties['Due Date']?.date?.start || '',
      createdDate: properties['Created Date']?.created_time || '',
      processingTime: properties['Processing Time']?.number || 0,
      costTracking: properties['Cost Tracking']?.number || 0,
    }
  }
}

export const notionService = new NotionService()
