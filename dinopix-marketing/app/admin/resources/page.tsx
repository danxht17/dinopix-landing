import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resources Hub Admin | Dinopix',
  description: 'Manage AI-powered content generation for the resources hub',
  robots: 'noindex, nofollow', // Don't index admin pages
}

export default function ResourcesAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Resources Hub Admin</h1>
          <p className="text-gray-600 mt-2">
            Manage AI-powered content generation and monitor system performance
          </p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Status</h3>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">AI Agents Running</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Queue Status</h3>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <div className="text-sm text-gray-600">Topics in queue</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Cost</h3>
            <div className="text-2xl font-bold text-green-600">$0.00</div>
            <div className="text-sm text-gray-600">API costs this month</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Process Queue
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Add Topic
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              View Analytics
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
              System Settings
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div className="font-medium text-gray-900">System Initialized</div>
                <div className="text-sm text-gray-600">AI Resources Hub is ready for content generation</div>
              </div>
              <div className="text-sm text-gray-500">Just now</div>
            </div>
            
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity. Start by adding topics to the queue.</p>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">🚀 Setup Instructions</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              <span>Configure your environment variables in <code className="bg-blue-100 px-1 rounded">.env.local</code></span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>Set up Notion databases using the provided schemas</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>Add API keys for OpenAI, Perplexity, and other services</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Create your first topic in the Notion Topic Queue database</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">5.</span>
              <span>Click &ldquo;Process Queue&rdquo; to start AI content generation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
