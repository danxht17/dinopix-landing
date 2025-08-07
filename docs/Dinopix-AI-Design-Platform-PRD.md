trying to # Dinopix: AI Design Platform - Development PRD
*Optimized for Claude Code Implementation*

## Project Overview
- **Product Name**: Dinopix
- **Vision**: AI-powered design platform that replaces in-house designers through conversational briefing and interactive visual editing.
- **Core Architecture**: HTML/CSS/JavaScript rendering engine with layered design system, enabling real-time manipulation and consistent exports.
- **Target MVP Timeline**: 12-16 weeks across 6 development phases

## Technical Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + CSS Modules for custom components
- **Canvas Manipulation**: Fabric.js for interactive design editing
- **State Management**: Zustand for global state
- **Routing**: React Router v6
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0 or NextAuth.js
- **File Storage**: AWS S3 or Cloudinary
- **Caching**: Redis
- **API**: REST with planned GraphQL migration

### AI & External Services
- **LLM**: OpenAI GPT-4 API for conversational interface
- **Image Processing**: Remove.bg API for background removal
- **Stock Photos**: Unsplash API (free tier initially)
- **PDF Generation**: Puppeteer for server-side rendering

### DevOps
- **Hosting**: Vercel (frontend) + Railway (backend)
- **Database**: Supabase or PlanetScale
- **Monitoring**: Sentry for error tracking
- **Analytics**: Posthog for product analytics

## Development Phases

### Phase 1: Foundation & Authentication (Week 1-2)
*Basic website infrastructure with user management*

#### 1.1 Landing Page & Marketing Site
**Deliverables:**
- Modern landing page with value proposition
- Pricing page with tiered plans
- About/Contact pages
- Responsive design (mobile-first)

**Technical Requirements:**
```typescript
// Components to build
- Header with navigation
- Hero section with demo video placeholder
- Feature showcase grid
- Pricing cards with Stripe integration setup
- Footer with links and social media

// Pages structure
/landing
/pricing  
/about
/contact
/login
/signup
/dashboard (protected)
```

#### 1.2 Authentication System
**Deliverables:**
- User registration and login
- Protected routes
- User profile management
- Password reset functionality

**Database Schema:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(500) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**API Endpoints:**
```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
PUT /api/auth/profile
POST /api/auth/reset-password
```

### Phase 2: Core Platform Structure (Week 3-4)
*Dashboard and project management foundation*

#### 2.1 User Dashboard
**Deliverables:**
- Project overview dashboard
- Recent projects grid
- Quick action buttons
- Usage statistics display

**Components:**
```typescript
// Dashboard components
- ProjectCard component
- QuickActions sidebar
- UsageMetrics component
- RecentActivity feed
- CreateProjectModal
```

#### 2.2 Project Management System
**Deliverables:**
- Create, save, and manage design projects
- Project folder organization
- Project sharing and collaboration setup
- Version history tracking

**Database Schema:**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  design_type VARCHAR(100) NOT NULL, -- 'social_post', 'poster', 'flyer', etc.
  canvas_data JSONB, -- Stores HTML/CSS/JS design data
  thumbnail_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'completed', 'archived'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  canvas_data JSONB NOT NULL,
  change_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**API Endpoints:**
```typescript
GET /api/projects - List user projects
POST /api/projects - Create new project
GET /api/projects/:id - Get project details
PUT /api/projects/:id - Update project
DELETE /api/projects/:id - Delete project
GET /api/projects/:id/versions - Get project version history
```

### Phase 3: Conversational AI Interface (Week 5-6)
*Natural language design briefing system*

#### 3.1 Chat Interface
**Deliverables:**
- Real-time chat UI component
- Message history persistence
- Typing indicators and loading states
- File upload capability for reference images

**Components:**
```typescript
// Chat system components
- ChatContainer
- MessageBubble (user vs AI)
- ChatInput with file upload
- TypingIndicator
- MessageHistory
- FilePreview component
```

#### 3.2 AI Integration & Prompt Engineering
**Deliverables:**
- OpenAI GPT-4 integration
- Design brief parsing and structured data extraction
- Context-aware follow-up questions
- Design requirement validation

**AI Service Architecture:**
```typescript
class DesignBriefAI {
  async processBrief(userMessage: string, context: ProjectContext): Promise<BriefResponse> {
    const prompt = this.buildPrompt(userMessage, context);
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: prompt,
      functions: [
        {
          name: "extract_design_requirements",
          description: "Extract structured design requirements from user brief",
          parameters: {
            type: "object",
            properties: {
              designType: { type: "string", enum: ["social_post", "poster", "flyer", "banner"] },
              dimensions: { type: "object", properties: { width: { type: "number" }, height: { type: "number" }}},
              colorScheme: { type: "array", items: { type: "string" }},
              mainMessage: { type: "string" },
              targetAudience: { type: "string" },
              brandGuidelines: { type: "object" },
              imageRequirements: { type: "array", items: { type: "string" }}
            }
          }
        }
      ]
    });
    
    return this.parseResponse(response);
  }
}
```

#### 3.3 Brief Processing System
**Database Schema:**
```sql
CREATE TABLE design_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  raw_brief TEXT NOT NULL,
  structured_requirements JSONB NOT NULL,
  ai_suggestions JSONB,
  status VARCHAR(50) DEFAULT 'processing',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sender VARCHAR(50) NOT NULL, -- 'user' or 'ai'
  message TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text', -- 'text', 'image', 'design_update'
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Phase 4: Design Generation Engine (Week 7-9)
*Convert briefs into HTML/CSS/JS designs*

#### 4.1 Template System
**Deliverables:**
- 15-20 professional design templates
- Template categorization by design type
- Dynamic template customization
- Brand guideline application

**Template Structure:**
```typescript
interface DesignTemplate {
  id: string;
  name: string;
  category: 'social_post' | 'poster' | 'flyer' | 'banner';
  dimensions: { width: number; height: number };
  htmlStructure: string;
  cssBase: string;
  jsInteractions?: string;
  customizableProperties: {
    colors: string[];
    fonts: string[];
    layouts: string[];
  };
  preview_url: string;
}

// Template examples to build
templates/
  ├── social-posts/
  │   ├── modern-gradient.tsx
  │   ├── minimal-clean.tsx
  │   └── bold-typography.tsx
  ├── posters/
  │   ├── event-promo.tsx
  │   └── product-showcase.tsx
  └── flyers/
      └── business-professional.tsx
```

#### 4.2 Design Generation Service
**Deliverables:**
- Convert structured brief to design specification
- Template selection algorithm
- Dynamic content population
- Color scheme and typography application

**Generation Pipeline:**
```typescript
class DesignGenerator {
  async generateDesign(brief: StructuredBrief): Promise<GeneratedDesign> {
    // 1. Select appropriate template
    const template = await this.selectTemplate(brief.designType, brief.style);
    
    // 2. Apply brief requirements to template
    const customizedTemplate = await this.customizeTemplate(template, brief);
    
    // 3. Generate HTML structure
    const html = this.generateHTML(customizedTemplate, brief.content);
    
    // 4. Generate CSS styling
    const css = this.generateCSS(customizedTemplate, brief.styling);
    
    // 5. Add interactions if needed
    const js = this.generateJavaScript(customizedTemplate, brief.interactions);
    
    return {
      html,
      css,
      js,
      metadata: {
        template_id: template.id,
        generation_timestamp: new Date(),
        brief_id: brief.id
      }
    };
  }
}
```

#### 4.3 Preview System
**Deliverables:**
- Real-time design preview in browser
- Multiple variant generation
- Responsive preview for different sizes

### Phase 5: Interactive Design Editor (Week 10-12)
*Real-time design manipulation interface*

#### 5.1 Canvas-Based Editor
**Deliverables:**
- Fabric.js integration for element manipulation
- Layer management system
- Real-time collaboration preparation
- Undo/redo functionality

**Editor Architecture:**
```typescript
class DesignEditor {
  private canvas: fabric.Canvas;
  private layers: DesignLayer[] = [];
  
  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement);
    this.setupEventHandlers();
  }
  
  addTextLayer(text: string, position: Position, styling: TextStyle): void {
    const textObject = new fabric.Text(text, {
      left: position.x,
      top: position.y,
      fontFamily: styling.fontFamily,
      fontSize: styling.fontSize,
      fill: styling.color
    });
    
    this.canvas.add(textObject);
    this.layers.push({ type: 'text', object: textObject });
  }
  
  addImageLayer(imageUrl: string, position: Position): Promise<void> {
    return new Promise((resolve) => {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({ left: position.x, top: position.y });
        this.canvas.add(img);
        this.layers.push({ type: 'image', object: img });
        resolve();
      });
    });
  }
  
  exportToHTML(): { html: string; css: string } {
    // Convert Fabric.js canvas back to HTML/CSS
    return this.canvasToHTML();
  }
}
```

#### 5.2 Element Interaction System
**Components:**
```typescript
// Editor UI components
- CanvasContainer
- LayerPanel
- PropertyPanel
- ToolPanel
- ColorPicker
- FontSelector
- ElementTransform controls
```

#### 5.3 Real-time AI Assistance
**Deliverables:**
- Conversational editing commands
- AI-powered design suggestions
- Smart element positioning
- Brand guideline enforcement

**AI Editor Integration:**
```typescript
class AIEditingAssistant {
  async processEditCommand(command: string, currentDesign: DesignState): Promise<EditOperation[]> {
    const prompt = `
    Current design state: ${JSON.stringify(currentDesign)}
    User command: "${command}"
    
    Generate specific edit operations to fulfill this request.
    `;
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      functions: [{
        name: "generate_edit_operations",
        description: "Generate specific design edit operations",
        parameters: {
          type: "object",
          properties: {
            operations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string", enum: ["move", "resize", "recolor", "replace_text", "add_element"] },
                  target: { type: "string" },
                  parameters: { type: "object" }
                }
              }
            }
          }
        }
      }]
    });
    
    return this.parseEditOperations(response);
  }
}
```

### Phase 6: Export & Image Processing (Week 13-16)
*High-quality export and advanced image features*

#### 6.1 Export System
**Deliverables:**
- PDF generation with print specifications
- PNG/JPEG export at multiple resolutions
- Word/PowerPoint template generation
- Batch export functionality

**Export Service:**
```typescript
class ExportService {
  async exportToPDF(design: DesignData, options: ExportOptions): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Prepare HTML for print
    const printHTML = this.preparePrintHTML(design, options);
    await page.setContent(printHTML);
    
    const pdf = await page.pdf({
      format: options.pageSize || 'A4',
      printBackground: true,
      margin: options.margin,
      preferCSSPageSize: true
    });
    
    await browser.close();
    return pdf;
  }
  
  async exportToImage(design: DesignData, format: 'png' | 'jpeg', resolution: number): Promise<Buffer> {
    // Use canvas rendering for high-quality image export
    const canvas = await this.renderToCanvas(design, resolution);
    return canvas.toBuffer(format === 'png' ? 'image/png' : 'image/jpeg');
  }
}
```

#### 6.2 Image Processing Integration
**Deliverables:**
- Unsplash API integration for stock photos
- Background removal via Remove.bg API
- Smart cropping and image optimization
- Real-time image processing feedback

**Image Processing Service:**
```typescript
class ImageProcessingService {
  async searchStockPhotos(query: string, provider: 'unsplash' | 'istock' = 'unsplash'): Promise<StockPhoto[]> {
    if (provider === 'unsplash') {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
        headers: { 'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
      });
      const data = await response.json();
      return data.results.map(photo => ({
        id: photo.id,
        url: photo.urls.regular,
        thumbnail: photo.urls.thumb,
        attribution: photo.user.name,
        download_url: photo.links.download
      }));
    }
  }
  
  async removeBackground(imageUrl: string): Promise<ProcessedImage> {
    const formData = new FormData();
    formData.append('image_url', imageUrl);
    
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: { 'X-Api-Key': process.env.REMOVE_BG_API_KEY },
      body: formData
    });
    
    const processedBuffer = await response.buffer();
    const processedUrl = await this.uploadToStorage(processedBuffer);
    
    return {
      original_url: imageUrl,
      processed_url: processedUrl,
      processing_cost: 1 // Track for billing
    };
  }
}
```

#### 6.3 Advanced Features
**Deliverables:**
- Batch processing capabilities
- Image library management
- Processing history and caching
- Cost tracking and optimization

## Database Schema (Complete)
```sql
-- Users and Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'free',
  usage_credits INTEGER DEFAULT 100,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects and Designs
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  design_type VARCHAR(100) NOT NULL,
  canvas_data JSONB,
  thumbnail_url VARCHAR(500),
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Conversational Interface
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  sender VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  message_type VARCHAR(50) DEFAULT 'text',
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE design_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  raw_brief TEXT NOT NULL,
  structured_requirements JSONB NOT NULL,
  ai_suggestions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Templates and Assets
CREATE TABLE design_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  html_structure TEXT NOT NULL,
  css_base TEXT NOT NULL,
  js_interactions TEXT,
  preview_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Image Processing and Assets
CREATE TABLE processed_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  original_url VARCHAR(500) NOT NULL,
  processed_url VARCHAR(500),
  processing_type VARCHAR(100), -- 'background_removal', 'crop', 'enhance'
  processing_cost DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Usage Tracking
CREATE TABLE usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL, -- 'design_generation', 'image_processing', 'export'
  credits_used INTEGER DEFAULT 1,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Documentation (Key Endpoints)
```typescript
// Authentication
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

// Projects
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id

// Design Generation
POST /api/design/brief - Submit design brief
POST /api/design/generate - Generate design from brief
GET /api/design/templates - List available templates

// Chat Interface
GET /api/chat/:projectId/messages
POST /api/chat/:projectId/message
WebSocket /ws/chat/:projectId

// Image Processing
POST /api/images/search - Search stock photos
POST /api/images/process - Process image (remove background, etc.)
GET /api/images/processed/:id

// Export
POST /api/export/pdf
POST /api/export/image
POST /api/export/office
```

## Environment Variables
```bash
# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Authentication
AUTH_SECRET=...
JWT_SECRET=...

# AI Services
OPENAI_API_KEY=sk-...
OPENAI_ORG_ID=org-...

# Image Processing
REMOVE_BG_API_KEY=...
UNSPLASH_ACCESS_KEY=...
ISTOCK_API_KEY=...

# Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...

# External Services
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
SENTRY_DSN=...
```

## Development Priorities

### Critical Path Features (Must Have)
- User authentication and project management
- Basic conversational interface with GPT-4
- Template-based design generation
- Simple editing capabilities
- PDF export functionality

### Enhanced Features (Should Have)
- Advanced image processing
- Real-time collaborative editing
- Brand guideline integration
- Multiple export formats
- Usage analytics

### Future Features (Could Have)
- Custom template creation
- API for third-party integrations
- Advanced AI fine-tuning
- White-label solutions
- Enterprise collaboration tools

---

This development-focused PRD provides clear phases and technical specifications that Claude Code can follow systematically. Each phase builds upon the previous one and includes specific deliverables, database schemas, and code examples.

**Recommended starting approach**: Begin with Phase 1 and validate each phase before moving to the next. This ensures you're building on solid foundations and can pivot based on user feedback.