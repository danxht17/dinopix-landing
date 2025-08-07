import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Proxy /app/* requests to Vite application
  if (pathname.startsWith('/app')) {
    // In development, proxy to Vite dev server
    const isDev = process.env.NODE_ENV === 'development';
    const viteUrl = isDev 
      ? 'http://localhost:5173' 
      : 'https://app.dinopix.ai'; // Production app subdomain
    
    // Remove /app prefix and proxy to Vite app
    const newPath = pathname.replace('/app', '') || '/';
    const targetUrl = new URL(newPath + request.nextUrl.search, viteUrl);
    
    return NextResponse.rewrite(targetUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/app/:path*',
    // Add other paths that need middleware processing
  ],
};