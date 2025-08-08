'use client';

import React, { useState } from 'react';
import { RocketLaunchIcon, BoltIcon, CpuChipIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import { addToEarlyAccessList } from '@/services/brevo';
import SEO from '@/components/SEO';

export default function Home() {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError('');

    try {
      await addToEarlyAccessList({ email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Dinopix",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "Web",
    "description": "AI-powered design platform that transforms ideas into production-ready design assets including logos, marketing materials, and professional designs in minutes.",
    "url": "https://dinopix.ai",
    "publisher": {
      "@type": "Organization",
      "name": "Dinopix Pty Ltd",
      "url": "https://dinopix.ai"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "price": "0",
      "priceCurrency": "USD",
      "validFrom": "2024-01-01"
    },
    "releaseDate": "2025-04-01",
    "featureList": [
      "AI-powered design generation",
      "Logo creation",
      "Marketing materials",
      "Professional design templates",
      "Real-time editing",
      "Multiple export formats"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Dinopix - AI Design Platform | Create Professional Designs in Minutes"
        description="Transform your ideas into production-ready design assets with AI. Create logos, marketing materials, and professional designs in minutes. Join 500+ creators on our early access waitlist."
        keywords="AI design, artificial intelligence design, logo maker, AI graphics, design automation, marketing materials, professional designs, design platform, AI logo generator, automated design"
        url="https://dinopix.ai/"
        structuredData={structuredData}
      />
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
            <span className="text-xl font-bold text-gray-900">Dinopix</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
            <button 
              onClick={scrollToHero}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Join Waitlist
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero-section" className="px-6 py-20 hero-animated-bg">
        {/* Animated Snake Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <svg className="absolute w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path 
              d="M-200,180 Q50,120 150,160 Q200,200 250,160 Q300,120 250,80 Q200,40 150,80 Q100,120 200,140 Q350,180 450,120 Q550,60 650,100 Q750,140 850,80 Q950,20 1050,60 Q1150,100 1250,40 Q1350,20 1400,80" 
              stroke="url(#calligraphyGradient1)" 
              strokeWidth="2.5" 
              fill="none" 
              className="calligraphy-path-1"
              strokeLinecap="round"
            />
            <path 
              d="M-200,420 Q0,380 100,410 Q150,450 200,410 Q250,370 200,330 Q150,290 100,330 Q50,370 150,390 Q300,430 450,370 Q600,310 750,350 Q850,390 950,330 Q1050,270 1150,310 Q1200,330 1300,290 Q1350,270 1400,320" 
              stroke="url(#calligraphyGradient2)" 
              strokeWidth="2" 
              fill="none" 
              className="calligraphy-path-2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="calligraphyGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
                <stop offset="20%" stopColor="rgba(16, 185, 129, 0.15)" />
                <stop offset="40%" stopColor="rgba(16, 185, 129, 0.25)" />
                <stop offset="60%" stopColor="rgba(59, 130, 246, 0.25)" />
                <stop offset="80%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
              <linearGradient id="calligraphyGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                <stop offset="25%" stopColor="rgba(59, 130, 246, 0.12)" />
                <stop offset="50%" stopColor="rgba(16, 185, 129, 0.18)" />
                <stop offset="75%" stopColor="rgba(16, 185, 129, 0.12)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Coming Q2 2025
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Create stunning designs in 
                <span className="animate-gradient"> minutes</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your ideas into production-ready design assets with AI. 
                No more waiting weeks for designers or struggling with complex tools.
              </p>
              
              {!isSubmitted ? (
                <div>
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                    {/* Honeypot field - hidden from users but visible to bots */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      {isLoading ? 'Joining...' : 'Get Early Access'}
                    </button>
                  </form>
                  {error && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 mt-4 max-w-md">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-md">
                  <p className="text-green-700">🎉 Thanks! You&apos;re on the list. We&apos;ll notify you when we launch.</p>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-4">
                Join 500+ creators waiting for early access
              </p>
              <p className="text-xs text-gray-400 mt-2">
                * T&Cs apply
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-8 transform rotate-3 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 transform -rotate-3">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">AI-Generated Design</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-3 bg-green-400 rounded flex-1"></div>
                      <div className="h-3 bg-blue-400 rounded flex-1"></div>
                      <div className="h-3 bg-purple-400 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <RocketLaunchIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Building */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What we&apos;re building
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re reimagining how design assets are created - making it faster, smarter, and accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                From brief to production-ready design in minutes, not weeks. 
                No more bottlenecks or waiting for designers.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CpuChipIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced AI understands your brief and creates professional designs 
                that match your brand and vision perfectly.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PaintBrushIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Editable</h3>
              <p className="text-gray-600">
                Every design is completely customizable. Make changes with simple 
                commands or direct visual editing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Launch Timeline
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We&apos;re building something amazing. Here&apos;s what&apos;s coming.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                ✓
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q4 2024</h3>
              <p className="text-gray-600">
                Core AI engine development and initial template creation
              </p>
            </div>

            <div className="relative">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q1 2025</h3>
              <p className="text-gray-600">
                Beta testing with select creators and platform refinement
              </p>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                <RocketLaunchIcon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Q2 2025</h3>
              <p className="text-gray-600">
                Public launch with full feature set and team collaboration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 bg-gradient-to-br from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Be the first to experience the future
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join our waitlist and get exclusive early access when we launch in Q2 2025.
          </p>
          
          {!isSubmitted ? (
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                {/* Honeypot field - hidden from users but visible to bots */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                  required
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                >
                  {isLoading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {error && (
                <div className="bg-white/20 backdrop-blur border border-red-300 rounded-lg p-3 mt-4 max-w-md mx-auto">
                  <p className="text-white text-sm">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white/20 backdrop-blur border border-white/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-white">🎉 You&apos;re all set! We&apos;ll be in touch soon.</p>
            </div>
          )}
          <p className="text-xs text-green-200 mt-4">
            * T&Cs apply
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-500 rounded"></div>
            <span className="text-xl font-bold text-white">Dinopix</span>
          </div>
          <p className="text-gray-400 mb-6">
            AI-powered design platform launching Q2 2025
          </p>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
            <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dinopix Pty Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
