import { NextRequest, NextResponse } from 'next/server'
import { notionService } from '../../../services/notion'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')

    if (category) {
      // Get articles by category
      const articles = await notionService.getArticlesByCategory(category)
      return NextResponse.json({ 
        success: true, 
        data: articles.slice(0, limit) 
      })
    } else {
      // Get all published articles
      const articles = await notionService.getPublishedArticles()
      return NextResponse.json({ 
        success: true, 
        data: articles.slice(0, limit) 
      })
    }

  } catch (error) {
    console.error('Resources API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resources' },
      { status: 500 }
    )
  }
}
