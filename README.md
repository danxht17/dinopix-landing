# Dinopix Hybrid Architecture

## 🏗️ Project Structure

```
dinopix/
├── docs/
│   ├── Hybrid-Architecture-PRD.md
│   └── Dinopix-AI-Design-Platform-PRD.md
├── dinopix-marketing/          ← Next.js SSR Marketing Site
│   ├── app/
│   │   ├── page.tsx            ← Landing page
│   │   ├── contact/
│   │   ├── terms/
│   │   ├── privacy/
│   │   └── app/                ← App proxy placeholder
│   ├── components/
│   ├── services/
│   └── middleware.ts           ← Proxy routing
└── dinopix-app/                ← Vite SPA Application
    ├── src/
    ├── public/
    └── dist/
```

## 🚀 Quick Start

### Marketing Site (Next.js - Port 3000)
```bash
cd dinopix-marketing
npm install
npm run dev
```

### Application (Vite - Port 5173)  
```bash
cd dinopix-app
npm install
npm run dev
```

## 📍 URL Architecture

| **URL** | **Technology** | **Purpose** |
|---------|----------------|-------------|
| `dinopix.ai/` | Next.js SSR | Landing page |
| `dinopix.ai/blog/` | Next.js SSR | Blog posts |
| `dinopix.ai/contact/` | Next.js SSR | Contact form |
| `dinopix.ai/terms/` | Next.js SSR | Legal pages |
| `dinopix.ai/app/` | Vite SPA | AI design app |

## 🔄 Proxy Routing

The Next.js marketing site automatically proxies `/app/*` requests to the Vite application:

- **Development**: `localhost:3000/app/` → `localhost:5173/`
- **Staging**: `dinopix-marketing-staging.netlify.app/app/` → `dinopix-app-staging.netlify.app/`
- **Production**: `dinopix.ai/app/` → `app.dinopix.ai/`

## 📊 SEO Benefits

### Next.js Marketing Site ✅
- **Server-side rendered HTML** - Perfect for Google crawling
- **Static generation** - Lightning fast loading
- **Dynamic blog posts** - SSR for fresh content
- **Complete SEO metadata** - Rich snippets and social sharing

### Vite Application ⚡
- **Client-side SPA** - Optimal for complex interactions  
- **Fast development** - Hot module reloading
- **Modern tooling** - Latest React features
- **Optimized bundles** - Minimal load times

## 🛠️ Development Workflow

1. **Local Development**
   - **Marketing changes** → Edit `dinopix-marketing/`
   - **App features** → Edit `dinopix-app/`
   - **Both running** → Seamless development experience

2. **Staging Deployment**
   - Push changes to `staging` branch
   - Netlify automatically deploys to staging sites
   - Test on staging environment

3. **Production Deployment**
   - Create pull request from `staging` to `main`
   - After approval, merge to `main`
   - Netlify automatically deploys to production

## 🚀 Deployment Strategy

### Staging Environment
- **Platform**: Netlify
- **Marketing Site**: `dinopix-marketing-staging.netlify.app`
- **Application**: `dinopix-app-staging.netlify.app`
- **Branch**: `staging`
- **Access**: Password protected (see deployment docs)

### Production Environment
- **Platform**: Netlify
- **Marketing Site**: `dinopix.ai`
- **Application**: `app.dinopix.ai`
- **Branch**: `main`
- **Features**: SSR, ISR for blog posts, Optimized SPA build

## 📈 Success Metrics

- ✅ **Perfect SEO** - Next.js SSR for marketing
- ✅ **Fast interactions** - Vite SPA for app
- ✅ **Independent scaling** - Separate deployments
- ✅ **Developer experience** - Right tool for each job

---

**Status**: ✅ Implementation Complete  
**Next Phase**: Blog integration and app development# Staging test
