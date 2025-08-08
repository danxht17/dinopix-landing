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

1. **Marketing changes** → Edit `dinopix-marketing/`
2. **App features** → Edit `dinopix-app/`
3. **Both running** → Seamless development experience
4. **Independent deploys** → Deploy marketing and app separately

## 🚀 Deployment Strategy

### Marketing Site
- **Platform**: Vercel/Netlify
- **Domain**: `dinopix.ai`
- **Features**: SSR, ISR for blog posts

### Application  
- **Platform**: CDN or app subdomain
- **Domain**: `app.dinopix.ai` 
- **Features**: Optimized SPA build

## 📈 Success Metrics

- ✅ **Perfect SEO** - Next.js SSR for marketing
- ✅ **Fast interactions** - Vite SPA for app
- ✅ **Independent scaling** - Separate deployments
- ✅ **Developer experience** - Right tool for each job

---

**Status**: ✅ Implementation Complete  
**Next Phase**: Blog integration and app development