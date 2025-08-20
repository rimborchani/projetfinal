# Deployment Guide

## 🚀 Production Deployment

This guide covers deploying the NextGenCoding Interactive Lab to production environments with performance optimization and security considerations.

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All ESLint warnings resolved
- [ ] No console.log statements in production code
- [ ] Error boundaries implemented
- [ ] Loading states for all async operations
- [ ] Responsive design tested on multiple devices

### Performance
- [ ] Images optimized and properly sized
- [ ] Bundle size analyzed and optimized
- [ ] Lazy loading implemented where appropriate
- [ ] Caching strategies configured

### Security
- [ ] No sensitive data in client-side code
- [ ] Content Security Policy configured
- [ ] HTTPS enabled
- [ ] Input validation implemented

## 🔧 Build Configuration

### Next.js Configuration
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Static exports (if needed)
  output: 'export',
  trailingSlash: true,
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Blockly optimization
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    
    return config;
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Environment Variables
```bash
# .env.production
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_API_URL=https://api.nextgencoding.com
NEXT_PUBLIC_CDN_URL=https://cdn.nextgencoding.com
ANALYTICS_ID=your-analytics-id
```

### Build Commands
```bash
# Install dependencies
npm ci

# Run linting
npm run lint

# Build for production
npm run build

# Start production server
npm run start
```

## 🌐 Platform-Specific Deployment

### Vercel (Recommended)
Vercel provides optimal Next.js hosting with automatic optimizations.

#### 1. Vercel CLI Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### 2. GitHub Integration
1. Connect repository to Vercel
2. Configure environment variables in dashboard
3. Enable automatic deployments

#### 3. Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_APP_ENV": "production"
  }
}
```

### Netlify
Static hosting with CDN and form handling.

#### 1. Build Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

#### 2. Static Export Setup
```javascript
// next.config.mjs for Netlify
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};
```

### AWS Amplify
Full-stack hosting with AWS integration.

#### 1. Amplify Configuration
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Docker Deployment

#### 1. Dockerfile
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### 2. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  nextgencoding:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_ENV=production
    restart: unless-stopped
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - nextgencoding
    restart: unless-stopped
```

## 📊 Performance Optimization

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Analyze bundle
ANALYZE=true npm run build
```

### Code Splitting
```javascript
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const BlocklyWorkspace = dynamic(
  () => import('../components/blockly/BlocklyWorkspace'),
  { 
    ssr: false,
    loading: () => <div>Loading workspace...</div>
  }
);
```

### Image Optimization
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['cdn.nextgencoding.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### Caching Strategy
```javascript
// Cache configuration for static assets
const nextConfig = {
  async headers() {
    return [
      {
        source: '/blocks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/sprites/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## 🔒 Security Configuration

### Content Security Policy
```javascript
// next.config.mjs
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};
```

### Environment Security
```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production

# Never expose sensitive data
# ❌ NEVER DO THIS
NEXT_PUBLIC_API_SECRET=secret-key

# ✅ Do this instead
API_SECRET=secret-key  # Server-side only
```

## 📈 Monitoring and Analytics

### Error Tracking
```javascript
// lib/error-tracking.js
export const logError = (error, errorInfo) => {
  if (process.env.NODE_ENV === 'production') {
    // Send to error tracking service
    console.error('Production Error:', error, errorInfo);
  }
};

// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
}
```

### Performance Monitoring
```javascript
// lib/analytics.js
export const trackEvent = (eventName, properties) => {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    // Send analytics event
    gtag('event', eventName, properties);
  }
};

// Usage in components
trackEvent('lesson_completed', {
  lesson_id: lesson.id,
  completion_time: Date.now() - startTime
});
```

### Health Checks
```javascript
// pages/api/health.js
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_APP_ENV: production
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 🔧 Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix automatically fixable vulnerabilities
npm audit fix
```

### Backup Strategy
- Database backups (if applicable)
- Source code in version control
- Configuration backups
- Asset backups (images, documents)

### Monitoring Checklist
- [ ] Uptime monitoring
- [ ] Performance metrics
- [ ] Error rate tracking
- [ ] User analytics
- [ ] Security scanning

## 🌍 Global Deployment

### CDN Configuration
```javascript
// Optimize for global delivery
const nextConfig = {
  images: {
    domains: ['cdn.nextgencoding.com'],
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
};

// lib/image-loader.js
export default function cloudflareLoader({ src, width, quality }) {
  const params = [`w=${width}`, `q=${quality || 75}`];
  return `https://cdn.nextgencoding.com/cdn-cgi/image/${params.join(',')}/${src}`;
}
```

### Internationalization (Future)
```javascript
// next.config.mjs
const nextConfig = {
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
    localeDetection: false,
  },
};
```

This deployment guide ensures your NextGenCoding Interactive Lab runs efficiently and securely in production environments.
