import { NextRequest, NextResponse } from 'next/server'
import { contentOrchestrator } from '../../../../services/ai-agents/orchestrator'

export async function POST(request: NextRequest) {
  try {
    const { topicId, action } = await request.json()

    if (!process.env.AI_AGENTS_ENABLED || process.env.AI_AGENTS_ENABLED !== 'true') {
      return NextResponse.json(
        { error: 'AI agents are not enabled' },
        { status: 503 }
      )
    }

    switch (action) {
      case 'process_queue':
        // Process all queued topics
        await contentOrchestrator.processTopicQueue()
        return NextResponse.json({ 
          success: true, 
          message: 'Topic queue processing started' 
        })

      case 'process_topic':
        // Process specific topic
        if (!topicId) {
          return NextResponse.json(
            { error: 'Topic ID is required' },
            { status: 400 }
          )
        }
        await contentOrchestrator.processTopicById(topicId)
        return NextResponse.json({ 
          success: true, 
          message: `Topic ${topicId} processing started` 
        })

      case 'get_stats':
        // Get processing statistics
        const stats = await contentOrchestrator.getProcessingStats()
        return NextResponse.json({ success: true, data: stats })

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('AI Resources API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!process.env.AI_AGENTS_ENABLED || process.env.AI_AGENTS_ENABLED !== 'true') {
      return NextResponse.json(
        { error: 'AI agents are not enabled' },
        { status: 503 }
      )
    }

    const stats = await contentOrchestrator.getProcessingStats()
    return NextResponse.json({ 
      success: true, 
      data: stats,
      status: 'AI Resources Hub is running'
    })

  } catch (error) {
    console.error('AI Resources API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
