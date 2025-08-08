# Deployment Strategy

## Environment Structure

### Local Development
- **Marketing Site (Next.js)**: Run on port 3000
- **Application (Vite)**: Run on port 5173
- **Local Proxy**: Routes `/app/*` requests from Next.js to Vite

### Staging Environment
- **Platform**: Netlify
- **Marketing Site**: `dinopix-marketing-staging.netlify.app`
- **Application**: `dinopix-app-staging.netlify.app`
- **Branch**: `staging`

### Production Environment
- **Platform**: Netlify
- **Marketing Site**: `dinopix.ai`
- **Application**: `app.dinopix.ai`
- **Branch**: `main`

## Deployment Workflow

### Setting Up a New Deployment

1. **Initialize Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <repository-url>
   git push -u origin main
   ```

2. **Create Staging Branch**
   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

3. **Deploy to Netlify**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy Marketing Site
   cd dinopix-marketing
   netlify init
   
   # Deploy Application
   cd ../dinopix-app
   netlify init
   ```

### Development Workflow

1. **Local Development**
   - Make changes locally
   - Test on local development servers

2. **Staging Deployment**
   ```bash
   # Push changes to staging branch
   git checkout staging
   git merge <feature-branch>
   git push origin staging
   ```
   - Netlify automatically deploys from staging branch
   - Test on staging environment:
     - Marketing: `dinopix-marketing-staging.netlify.app`
     - Application: `dinopix-app-staging.netlify.app`

3. **Production Deployment**
   ```bash
   # Create pull request from staging to main
   # After approval, merge pull request
   git checkout main
   git pull origin main
   ```
   - Netlify automatically deploys from main branch

## Domain Configuration

### Custom Domains

1. **Marketing Site**
   - Primary domain: `dinopix.ai`
   - Configure in Netlify domain settings

2. **Application**
   - Subdomain: `app.dinopix.ai`
   - Configure in Netlify domain settings

### DNS Configuration

1. **Root Domain (dinopix.ai)**
   - Set up DNS records for Netlify

2. **Subdomain (app.dinopix.ai)**
   - Add CNAME record pointing to Netlify

## Contact Information

For support or inquiries, contact:
- Email: support@dinopix.com.au
