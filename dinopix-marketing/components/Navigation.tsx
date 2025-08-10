'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDownIcon, PaintBrushIcon, BoltIcon, AcademicCapIcon, LightBulbIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

// Mock data for mega menu - will be replaced with Notion API
const resourcesData = {
  categories: [
    {
      id: 1,
      name: 'AI Design Tools',
      slug: 'ai-design-tools',
      description: 'Reviews and comparisons of the best AI design tools',
      icon: PaintBrushIcon,
      color: 'text-blue-500',
      articles: [
        { title: 'Best AI Logo Generators 2025', slug: 'best-ai-logo-generators-2025', readingTime: 8 },
        { title: 'AI Photo Editing Tools Review', slug: 'ai-photo-editing-tools-review', readingTime: 6 },
        { title: 'Top AI Image Generators', slug: 'top-ai-image-generators', readingTime: 7 }
      ]
    },
    {
      id: 2,
      name: 'Design Automation',
      slug: 'design-automation',
      description: 'Automate your design workflow and boost productivity',
      icon: BoltIcon,
      color: 'text-green-400',
      articles: [
        { title: 'Automate Your Design Workflow', slug: 'automate-design-workflow-ai-tools', readingTime: 12 },
        { title: 'AI Design Systems Guide', slug: 'ai-design-systems-guide', readingTime: 10 },
        { title: 'Batch Processing with AI', slug: 'batch-processing-ai-design', readingTime: 9 }
      ]
    },
    {
      id: 3,
      name: 'Tutorials & Guides',
      slug: 'tutorials',
      description: 'Step-by-step tutorials for mastering AI design',
      icon: AcademicCapIcon,
      color: 'text-blue-600',
      articles: [
        { title: 'Getting Started with AI Design', slug: 'getting-started-ai-design', readingTime: 15 },
        { title: 'Advanced AI Prompting Techniques', slug: 'advanced-ai-prompting', readingTime: 11 },
        { title: 'AI Design Best Practices', slug: 'ai-design-best-practices', readingTime: 8 }
      ]
    },
    {
      id: 4,
      name: 'Industry Insights',
      slug: 'industry-insights',
      description: 'Latest trends and insights in AI design',
      icon: LightBulbIcon,
      color: 'text-green-500',
      articles: [
        { title: 'AI Design Trends 2025', slug: 'ai-design-trends-2025', readingTime: 13 },
        { title: 'Future of Design Automation', slug: 'future-design-automation', readingTime: 14 },
        { title: 'AI Impact on Creative Industry', slug: 'ai-impact-creative-industry', readingTime: 16 }
      ]
    }
  ]
}

interface NavigationProps {
  showJoinWaitlist?: boolean
  onJoinWaitlistClick?: () => void
}

export default function Navigation({ showJoinWaitlist = true, onJoinWaitlistClick }: NavigationProps) {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Simple click-based toggle - no mouse events
  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      // Only close if clicking completely outside the navigation area
      if (!target.closest('nav') && !target.closest('[data-mega-menu]')) {
        setIsResourcesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="px-4 sm:px-6 py-6 md:py-8 bg-white border-b border-gray-100 relative">
      <nav className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
          <span className="text-xl font-bold text-gray-900">Dinopix</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Resources Mega Menu */}
          <div 
            className="relative"
          >
            <button
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all ${
                isResourcesOpen 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
              onClick={toggleResources}
              aria-expanded={isResourcesOpen}
              aria-haspopup="true"
            >
              <span>Resources</span>
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
            Contact
          </Link>
          
          {showJoinWaitlist && (
            <button 
              onClick={onJoinWaitlistClick}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-green-500 hover:to-blue-600 transition-all"
            >
              Join Waitlist
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mega Menu Dropdown - Desktop Only */}
      {isResourcesOpen && (
        <div 
          className="hidden md:block absolute top-full left-0 right-0 mt-2 z-[9999]"
          data-mega-menu="true"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {resourcesData.categories.map((category) => {
                      const IconComponent = category.icon
                      return (
                        <div key={category.id} className="space-y-4">
                          {/* Category Header */}
                          <Link
                            href={`/resources/${category.slug}`}
                            className="group block pb-3 border-b border-gray-100"
                            onClick={(e) => {
                              console.log('Category link clicked:', category.slug, e)
                              setIsResourcesOpen(false)
                            }}
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors">
                                <IconComponent className={`w-5 h-5 ${category.color} group-hover:text-blue-600 transition-colors`} />
                              </div>
                              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {category.name}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              {category.description}
                            </p>
                          </Link>
                          
                          {/* Featured Articles */}
                          <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                              Featured Articles
                            </h4>
                            {category.articles.map((article, index) => (
                              <Link
                                key={index}
                                href={`/resources/${category.slug}/${article.slug}`}
                                className="group flex items-start space-x-2 p-2 rounded-md hover:bg-gray-50 transition-colors"
                                onClick={(e) => {
                                  console.log('Article link clicked:', article.slug, e)
                                  setIsResourcesOpen(false)
                                }}
                                  >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                <div>
                                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {article.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {article.readingTime} min read
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Bottom CTA */}
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link
                      href="/resources"
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg hover:from-green-500 hover:to-blue-600 transition-all"
                      onClick={() => setIsResourcesOpen(false)}
                    >
                      View All Resources
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white mt-4">
          <div className="px-4 sm:px-6 py-4 space-y-1">
            {/* Direct Resources Link */}
            <Link
              href="/resources"
              className="block text-gray-900 font-medium py-3 px-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>

            {/* Category Links */}
            {resourcesData.categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link
                  key={category.id}
                  href={`/resources/${category.slug}`}
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 py-3 px-2 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <IconComponent className={`w-5 h-5 ${category.color}`} />
                  <span>{category.name}</span>
                </Link>
              )
            })}

            {/* Contact Link */}
            <Link 
              href="/contact" 
              className="block text-gray-900 font-medium py-3 px-2 rounded-md hover:bg-gray-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {/* Join Waitlist Button */}
            {showJoinWaitlist && (
              <div className="pt-4 border-t border-gray-100 mt-4">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onJoinWaitlistClick?.()
                  }}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-all"
                >
                  Join Waitlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
