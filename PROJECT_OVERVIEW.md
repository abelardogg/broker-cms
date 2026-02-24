# The Arrowhead Group - Project Overview

## 🏢 Project Description

**The Arrowhead Group** is a full-service real estate and mortgage website serving San Bernardino and the Inland Empire in California. The platform helps users find homes for sale, explore mortgage options, and connect with licensed real estate agents.

**Live Website:** https://thearrowheadgroup.com
**DRE License:** #01847350

---

## 🏗️ Architecture Overview

### Multi-Service Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Production Architecture                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐
│  DigitalOcean VPS (469MB)    │
│  IP: [Your Droplet IP]       │
│                              │
│  Services:                   │
│  ├─ Next.js Frontend         │
│  │  Port: 3000               │
│  │  Process: PM2             │
│  │  Domain: thearrowhead     │
│  │          group.com        │
│  │                           │
│  └─ Nginx (Reverse Proxy)    │
│     Port: 80, 443 (SSL)      │
│     SSL: Let's Encrypt       │
└──────────────────────────────┘
          │
          │ API Calls
          ▼
┌──────────────────────────────┐
│  Railway.app (Free Tier)     │
│                              │
│  Services:                   │
│  ├─ Strapi CMS               │
│  │  Port: 1337               │
│  │  Auto-deploy from GitHub  │
│  │                           │
│  └─ PostgreSQL Database      │
│     Size: 5GB (free tier)    │
└──────────────────────────────┘
```

---

## 📦 Repository Structure

### Frontend Repository: `arrowhead-realty/broker`
- **Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Hosting:** Digital Ocean VPS
- **Domain:** thearrowheadgroup.com
- **Process Manager:** PM2
- **Reverse Proxy:** Nginx
- **SSL:** Let's Encrypt (auto-renew)

### CMS Repository: `arrowhead-cms` (To be created)
- **Tech Stack:** Strapi 4, PostgreSQL
- **Hosting:** Railway.app
- **Domain:** TBD (will be admin.thearrowheadgroup.com or Railway subdomain)
- **Database:** Railway PostgreSQL (5GB free tier)

---

## 🛠️ Technology Stack

### Frontend (Next.js)
```json
{
  "framework": "Next.js 14.2.21",
  "language": "TypeScript",
  "styling": "Tailwind CSS",
  "fonts": "DM Sans, Plus Jakarta Sans (Google Fonts)",
  "icons": "Lucide React",
  "email": "Nodemailer (Gmail SMTP)",
  "analytics": {
    "google_analytics": "G-WNMTKLDNRY",
    "google_tag_manager": "GTM-KFZSRT8G"
  },
  "seo": {
    "structured_data": "JSON-LD (RealEstateAgent, LocalBusiness, Website)",
    "sitemap": "Dynamic sitemap.ts",
    "meta_optimization": "SEO-optimized copy with keywords"
  }
}
```

### CMS (Strapi - Planned)
```json
{
  "framework": "Strapi 4 (latest)",
  "database": "PostgreSQL (Railway)",
  "authentication": "Strapi built-in",
  "api": "REST + GraphQL",
  "hosting": "Railway.app"
}
```

---

## 🗂️ Content Types Plan (CMS)

### Properties
```typescript
{
  title: string              // e.g., "5571 Clover Hill"
  slug: string               // e.g., "5571-clover-hill"
  price: number              // e.g., 549000
  description: text          // Rich text
  bedrooms: number
  bathrooms: number
  sqft: number
  address: string
  city: string
  state: string              // "CA"
  zipCode: string
  images: media[]            // Gallery
  featuredImage: media       // Main image
  status: enum               // "active" | "pending" | "sold"
  propertyType: enum         // "residential" | "commercial" | "land"
  featured: boolean          // Show on homepage?
  mls: string                // MLS listing number
  publishedAt: datetime
}
```

### Loan Programs
```typescript
{
  title: string              // e.g., "Conventional Loan"
  slug: string               // e.g., "conventional"
  description: richtext
  features: component[]      // Repeatable feature list
  requirements: richtext
  icon: string               // Icon name from Lucide
  order: number              // Display order
  publishedAt: datetime
}
```

### Blog Posts (Future)
```typescript
{
  title: string
  slug: string
  content: richtext
  excerpt: text
  author: string
  featuredImage: media
  category: relation         // Categories
  tags: relation[]           // Tags
  seoTitle: string
  seoDescription: string
  publishedAt: datetime
}
```

### Team Members (Future)
```typescript
{
  name: string
  role: string               // "Real Estate Agent" | "Loan Officer"
  bio: richtext
  photo: media
  email: string
  phone: string
  license: string            // DRE number
  order: number
  publishedAt: datetime
}
```

---

## 🌐 Deployment Strategy

### Frontend Deployment (Digital Ocean)

**Current Status:** ✅ Live in production

**Server Specs:**
- RAM: 469MB (very limited)
- Swap: 2GB (required for npm install)
- Node.js: v20.x
- PM2: Process manager with auto-restart

**Build Process:**
```bash
# LOCAL (Windows) - Build must be done locally due to low RAM
npm run build

# Upload build to server
scp -r .next dev@droplet-ip:/var/www/arrowhead-realty/broker/

# SERVER - Update code and restart
ssh dev@droplet-ip
cd /var/www/arrowhead-realty/broker
git pull
pm2 restart arrowhead-realty
```

**Why local build?**
- Server has insufficient RAM for Next.js build process
- Build fails with "Bus error (core dumped)" on server
- Local build + SCP is the workaround

### CMS Deployment (Railway)

**Status:** 📋 Planned

**Deployment Flow:**
1. Create Strapi project locally
2. Push to GitHub repository
3. Connect GitHub repo to Railway
4. Railway auto-detects Strapi and configures
5. Add PostgreSQL plugin in Railway
6. Auto-deploy on every git push to main

**Cost:** Free tier (~500 hours/month), then ~$5/month

---

## 🔑 Environment Variables

### Frontend (.env.local)
```bash
# Email Configuration (Nodemailer)
EMAIL_USER=arrowheadrealty.contact@gmail.com
EMAIL_PASS=[Gmail App Password - 16 chars]
EMAIL_TO=abelardogg.dev@gmail.com

# Environment
NODE_ENV=production

# CMS (Future - when Strapi is deployed)
NEXT_PUBLIC_STRAPI_URL=https://your-strapi.up.railway.app
STRAPI_API_TOKEN=[API token from Strapi]
```

### CMS (.env - Railway)
```bash
# Database (Auto-configured by Railway)
DATABASE_CLIENT=postgres
DATABASE_HOST=${PGHOST}
DATABASE_PORT=${PGPORT}
DATABASE_NAME=${PGDATABASE}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}
DATABASE_SSL=true

# Strapi
APP_KEYS=[auto-generated]
API_TOKEN_SALT=[auto-generated]
ADMIN_JWT_SECRET=[auto-generated]
JWT_SECRET=[auto-generated]

# URLs
STRAPI_ADMIN_BACKEND_URL=https://your-strapi.up.railway.app
```

---

## 📊 SEO Strategy

### Target Keywords (Already Implemented)
- Primary: houses for sale, homes for sale, California
- Secondary: real estate agent, buy a house, sell your house
- Long-tail: first time home buyer, mortgage options, property for sale

### On-Page SEO
✅ SEO-optimized homepage copy
✅ Structured data (JSON-LD): RealEstateAgent, LocalBusiness, Website
✅ Dynamic sitemap.xml
✅ Meta titles and descriptions
✅ Google Analytics (G-WNMTKLDNRY)
✅ Google Tag Manager (GTM-KFZSRT8G)
✅ Page view tracking with GTM

### Technical SEO
✅ SSL/HTTPS (Let's Encrypt)
✅ Mobile responsive (Tailwind)
✅ Fast loading (Next.js optimization)
✅ Semantic HTML
✅ Alt tags on images (needs improvement)

---

## 🚀 Integration Plan (Frontend ↔ CMS)

### Step 1: Create Strapi Utility
```typescript
// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${STRAPI_URL}/api${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
  })

  if (!res.ok) throw new Error('Failed to fetch from Strapi')
  return res.json()
}

export async function getProperties() {
  const data = await fetchAPI('/properties?populate=*&filters[status][$eq]=active')
  return data.data
}

export async function getPropertyBySlug(slug: string) {
  const data = await fetchAPI(`/properties?filters[slug][$eq]=${slug}&populate=*`)
  return data.data[0]
}

export async function getLoanPrograms() {
  const data = await fetchAPI('/loan-programs?populate=*&sort=order:asc')
  return data.data
}
```

### Step 2: Update Pages to Use CMS
```typescript
// app/properties/page.tsx
import { getProperties } from '@/lib/strapi'

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <PropertyShowcase properties={properties} />
  )
}

// app/properties/[slug]/page.tsx
export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((property) => ({
    slug: property.attributes.slug,
  }))
}
```

### Step 3: TypeScript Types (Shared)
```typescript
// types/strapi.ts
export interface StrapiProperty {
  id: number
  attributes: {
    title: string
    slug: string
    price: number
    bedrooms: number
    bathrooms: number
    sqft: number
    address: string
    city: string
    state: string
    description: string
    status: 'active' | 'pending' | 'sold'
    featured: boolean
    images: {
      data: StrapiMedia[]
    }
    createdAt: string
    updatedAt: string
  }
}

export interface StrapiMedia {
  id: number
  attributes: {
    url: string
    alternativeText: string
    width: number
    height: number
  }
}
```

---

## 📝 Current Status

### ✅ Completed
- Frontend deployed to Digital Ocean
- HTTPS with Let's Encrypt
- Contact form with Nodemailer
- Google Analytics + Tag Manager
- SEO optimization (copy, structured data, sitemap)
- Page view tracking
- Apply button redirected to contact (apply form incomplete)

### 🔄 In Progress
- CMS setup (Strapi on Railway)
- Content type definitions
- Frontend-CMS integration

### 📋 Pending
- Deploy Strapi to Railway
- Create content types in Strapi
- Migrate hardcoded properties to CMS
- Connect Next.js to Strapi API
- Add blog functionality (future)
- Add team members section (future)
- Complete apply form (mortgage application)

---

## 🐛 Known Issues

1. **VPS Low RAM**
   - Problem: npm build fails with "Bus error"
   - Solution: Build locally, upload via SCP
   - Status: Workaround in place

2. **Incomplete Apply Form**
   - Problem: /apply route disabled, redirects to /contact
   - Solution: Complete mortgage application form
   - Status: Future work

3. **Image Optimization**
   - Problem: Using `<img>` instead of Next.js `<Image>`
   - Solution: Refactor to use next/image
   - Status: Low priority (build warnings only)

---

## 👥 Contact Information

**Website:** https://thearrowheadgroup.com
**Email:** info@thearrowheadgroup.com
**Phone:** (909) 915-9500
**License:** DRE #01847350

**Developer Contact:**
Email: abelardogg.dev@gmail.com

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io)
- [Railway Documentation](https://docs.railway.app)
- [Tailwind CSS](https://tailwindcss.com)

---

**Last Updated:** 2026-02-12
**Version:** 1.0.0
**Status:** Production (Frontend) | Planning (CMS)
