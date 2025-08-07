import { Link } from 'react-router-dom';
import SEO from './components/SEO';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Page Not Found | Dinopix AI Design Platform"
        description="The page you're looking for doesn't exist. Return to Dinopix homepage to explore our AI-powered design platform."
        url="https://dinopix.ai/404"
      />
      
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-2xl text-white font-bold">404</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Return to Homepage
            </Link>
            <div className="text-sm text-gray-500">
              <Link to="/contact" className="text-green-600 hover:underline">Contact us</Link> if you think this is an error
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;