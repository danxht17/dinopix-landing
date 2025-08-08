# Dinopix Hybrid Architecture PRD
**Product Requirements Document**

---

## 1. Executive Summary

### Vision
Implement a hybrid architecture separating marketing content (Next.js SSR) from the interactive AI design application (Vite SPA) to optimize both SEO performance and user experience.

### Strategic Goals
- **SEO Excellence**: Achieve perfect Google indexing for marketing content
- **Performance Optimization**: Maintain lightning-fast app interactions
- **Scalability**: Enable independent deployment and scaling
- **Developer Experience**: Use the right technology for each use case

---

## 2. Architecture Overview

### Technology Split

| **Next.js SSR Marketing** | **Vite SPA Application** |
|---------------------------|---------------------------|
| Landing page              | AI design interface       |
| Blog posts               | User dashboard            |
| Legal pages              | Design editor             |
| Contact forms            | Account management        |
| Static content           | Interactive features      |

### URL Structure
```
dinopix.ai/              ← Next.js Marketing Site
├── /
├── /blog/
├── /contact/
├── /terms/
├── /privacy/
└── /app/                 ← Proxy to Vite Application
    ├── /dashboard/
    ├── /editor/
    ├── /account/
    └── /designs/
```

---

## 3. Technical Implementation

### 3.1 Next.js Marketing Site

**Location**: `/dinopix-marketing/`

**Features**:
- Server-side rendering for all marketing content
- Static generation for blog posts
- Perfect SEO metadata and structured data
- Contact form integration with Brevo
- Fast loading times with pre-rendered HTML

**Pages**:
- `/` - Landing page with waitlist signup
- `/blog/` - Dynamic blog posts (SSR)
- `/blog/[slug]/` - Individual blog posts
- `/contact/` - Contact form
- `/terms/` - Terms and conditions
- `/privacy/` - Privacy policy

### 3.2 Vite Application

**Location**: `/dinopix-app/`

**Features**:
- Lightning-fast SPA for interactive features
- Modern build tooling and HMR
- Optimized for complex UI interactions
- Client-side routing for app flows
- Real-time collaboration features

**Routes**:
- `/dashboard/` - User dashboard
- `/editor/` - AI design interface
- `/designs/` - Design gallery
- `/account/` - User settings
- `/billing/` - Subscription management

### 3.3 Routing Strategy

**Next.js Middleware Configuration**:
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Proxy /app/* requests to Vite application
  if (pathname.startsWith('/app')) {
    return NextResponse.rewrite(
      new URL(pathname.replace('/app', ''), 'http://localhost:5173')
    );
  }
}

export const config = {
  matcher: '/app/:path*'
};
```

---

## 4. SEO Strategy

### 4.1 Marketing Site SEO (Next.js)

**Primary Objectives**:
- Perfect Google indexing of all marketing content
- Rich snippets for blog posts and landing pages
- Fast Core Web Vitals scores
- Complete social media meta tags

**Implementation**:
- Server-side rendered HTML with full content
- Dynamic metadata generation
- Structured data for all content types
- Automatic sitemap generation
- Blog post RSS feeds

### 4.2 Application SEO Considerations

**App Routes**:
- Protected behind authentication
- Not intended for public indexing
- Uses `noindex` meta tags where appropriate
- Client-side routing for optimal UX

---

## 5. Development Workflow

### 5.1 Local Development

**Marketing Site** (Port 3000):
```bash
cd dinopix-marketing
npm run dev
```

**Application** (Port 5173):
```bash
cd dinopix-app  
npm run dev
```

**Proxy Setup**: Next.js middleware automatically proxies `/app/*` to Vite

### 5.2 Production Deployment

**Marketing Site**:
- Deploy Next.js to Vercel/Netlify
- Configure custom domain: `dinopix.ai`
- Enable ISR for blog posts

**Application**:
- Deploy Vite build to CDN
- Configure subdomain: `app.dinopix.ai` OR
- Use Next.js proxy with production Vite build

---

## 6. Migration Plan

### Phase 1: Setup & Structure ✅
- [x] Create Next.js marketing site
- [x] Migrate landing page with SSR
- [x] Implement SEO optimization
- [x] Verify Google crawling works

### Phase 2: Content Migration (Current)
- [ ] Clean up Next.js as primary marketing site
- [ ] Move Vite app to `/dinopix-app/` structure  
- [ ] Implement proxy routing
- [ ] Test end-to-end user flows

### Phase 3: Blog Integration (Future)
- [ ] Create dynamic blog system in Next.js
- [ ] Implement CMS integration
- [ ] Add RSS feeds and sitemaps
- [ ] SEO testing and optimization

### Phase 4: Application Development (Future)
- [ ] Build AI design interface in Vite
- [ ] Implement user authentication flow
- [ ] Create dashboard and editor components
- [ ] Integration testing between sites

---

## 7. Success Metrics

### SEO Performance
- **Google PageSpeed**: 95+ score for marketing pages
- **Core Web Vitals**: All green metrics
- **Indexing Speed**: New blog posts indexed within 24h
- **Search Rankings**: Target keywords in top 10

### Application Performance  
- **Load Time**: < 2s for initial app load
- **Interaction Speed**: < 100ms for UI responses
- **Bundle Size**: < 500KB for initial chunk
- **User Experience**: Seamless transition from marketing to app

---

## 8. Technical Considerations

### 8.1 Shared Components
- Design system components shared between both apps
- Common utilities and constants
- Shared TypeScript types
- Brand assets and styling

### 8.2 Authentication Flow
```
Marketing Site → Sign Up → App Dashboard
     ↓              ↓            ↓
   Next.js    →   Auth API  →  Vite App
```

### 8.3 Monitoring & Analytics
- Separate analytics for marketing vs app usage
- Performance monitoring for both applications
- Error tracking and user feedback systems
- A/B testing capabilities for marketing content

---

## 9. Implementation Priority

### High Priority (Week 1)
1. Clean up Next.js as standalone marketing site
2. Restructure Vite app in separate directory
3. Implement basic proxy routing
4. Verify SSR is working correctly

### Medium Priority (Week 2-3)
1. Perfect SEO implementation and testing
2. Blog system architecture planning
3. Shared component library setup
4. Authentication flow planning

### Low Priority (Future)
1. Advanced blog features
2. CMS integration
3. A/B testing setup
4. Advanced analytics implementation

---

## 10. Risk Assessment

### Technical Risks
- **Complexity**: Managing two applications increases complexity
- **Deployment**: Coordinating deployments between systems
- **Shared State**: Managing user state across applications

### Mitigation Strategies
- Clear separation of concerns and documentation
- Automated deployment pipelines
- Stateless authentication with JWTs
- Comprehensive integration testing

---

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Status**: Implementation Ready  
**Next Review**: After Phase 2 completion
**Contact**: support@dinopix.com.au
