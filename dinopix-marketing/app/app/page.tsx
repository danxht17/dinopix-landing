import Link from 'next/link';

export default function AppPage() {
  // In production, this would redirect to the Vite app
  // For now, show a placeholder
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Dinopix App</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The Dinopix design application will be available here. This is where the Vite app will be proxied to.
        </p>
        <div className="space-y-4 text-sm text-gray-500">
          <p><strong>Development:</strong> Proxied to http://localhost:5173</p>
          <p><strong>Production:</strong> Served from app.dinopix.ai</p>
        </div>
        <div className="mt-8">
          <Link 
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            ← Back to Marketing Site
          </Link>
        </div>
      </div>
    </div>
  );
}