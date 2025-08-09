export default function ResourcesLoading() {
  return (
    <div className="space-y-12">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-64 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-96 mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-full max-w-3xl"></div>
      </div>

      {/* Categories Grid Skeleton */}
      <section>
        <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 bg-white rounded-lg border border-gray-200 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Grid Skeleton */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-video bg-gray-200"></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="mx-2 w-1 h-1 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
