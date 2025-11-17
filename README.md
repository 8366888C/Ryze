# Ryze - Astro Blogging Theme Documentation

**Ryze** is a modern, minimalist blogging theme built with **Astro v5**, **Tailwind CSS v4**, and optimized for static sites, responsiveness, and SEO. Perfect for personal blogs and content-focused websites.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Customization Guide](#customization-guide)
5. [Adding & Editing Content](#adding--editing-content)
6. [Deployment](#deployment)
7. [Contributing](#contributing)

---

## Features

### 🎨 **Modern & Minimalist Design**

- Clean, distraction-free interface
- Responsive layout that works on all devices
- Two-theme support (Light & Dark mode with system preference detection)
- Beautiful typography powered by Space Grotesk and IBM Plex Mono fonts

### ⚡ **Performance & SEO**

- **Static Site Generation** - Fast, secure, and efficient
- **Sitemap Generation** - Automatic XML sitemap for search engines
- **RSS Feed** - Built-in RSS feed generation for subscribers
- **Open Graph Tags** - Social media sharing optimization
- **Twitter Card Support** - Enhanced Twitter previews
- **Canonical URLs** - Prevent duplicate content issues
- **Prefetching Strategy** - Improved navigation performance

### 📝 **Content Management**

- **Markdown Support** - Write blog posts in Markdown
- **Frontmatter Schema** - Structured metadata for each post
- **Syntax Highlighting** - Code blocks with Shiki (Light: One Light, Dark: Plastic theme)
- **Featured Posts** - Highlight important articles
- **Tag System** - Organize posts by topics
- **Archive by Date** - Browse posts chronologically
- **Reading Time Estimation** - Auto-calculated for each post

### 🎯 **Developer Experience**

- **TypeScript Support** - Type-safe development
- **Component-Based Architecture** - Reusable Astro components
- **Tailwind CSS Integration** - Utility-first styling
- **React Components** - Use React for interactive features
- **ESLint & Prettier** - Code quality and formatting

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone or download the project
cd Ryze

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Available Commands

| Command             | Description                        |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Start local development server     |
| `npm run build`     | Build production-ready static site |
| `npm run preview`   | Preview production build locally   |
| `npm run astro ...` | Run Astro CLI commands             |

---

## Project Structure

```
Ryze/
├── public/                    # Static assets (images, favicon)
│   └── favicon.svg
│
├── src/
│   ├── blog/                  # Blog post markdown files
│   │   ├── post-title.md
│   │   ├── another-post.md
│   │   └── ... (add your posts here)
│   │
│   ├── components/            # Reusable Astro & React components
│   │   ├── Header.astro       # Navigation header
│   │   ├── Footer.astro       # Footer section
│   │   ├── Navigation.astro   # Main navigation menu
│   │   ├── Seo.astro          # SEO metadata component
│   │   ├── Title.astro        # Blog post title component
│   │   ├── PostCard.astro     # Blog post card display
│   │   ├── Featured.astro     # Featured posts section
│   │   ├── PostNavigation.astro # Previous/Next post navigation
│   │   ├── Pagination.astro   # Page navigation
│   │   ├── ThemeToggle.tsx    # Dark/Light mode switcher (React)
│   │   ├── ProgressBar.tsx    # Reading progress indicator (React)
│   │   ├── Index.tsx          # Index/list view (React)
│   │   ├── Introduction.astro # Homepage introduction
│   │   ├── Newsletter.astro   # Newsletter signup
│   │   ├── Socials.astro      # Social media links
│   │   ├── FeatureCard.astro  # Feature cards
│   │   └── Year.astro         # Copyright year component
│   │
│   ├── layouts/               # Page templates
│   │   ├── BaseLayout.astro   # Main layout (header, footer, SEO)
│   │   └── BlogLayout.astro   # Blog post layout
│   │
│   ├── pages/                 # Route pages (auto-routed by Astro)
│   │   ├── index.astro        # Homepage (/)
│   │   ├── [...slug].astro    # Dynamic blog post routes
│   │   ├── 404.astro          # 404 not found page
│   │   ├── rss.xml.ts         # RSS feed generation
│   │   ├── robots.txt.ts      # robots.txt generation
│   │   ├── archive/
│   │   │   ├── [page].astro   # Archive listing with pagination
│   │   │   └── [year]/[page].astro # Posts by year
│   │   └── tags/
│   │       ├── index.astro    # Tags index page
│   │       └── [tag]/[page].astro # Posts by tag
│   │
│   ├── styles/                # Global styles
│   │   ├── global.css         # Global styles & Tailwind directives
│   │   └── typography.css     # Typography styles
│   │
│   ├── image/                 # Image optimization assets
│   │
│   └── content.config.ts      # Content collection schema
│
├── astro.config.mjs           # Astro configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Basic project info
```

### Key Directories Explained

#### `/src/blog`

- **Purpose**: Store all blog post markdown files
- **File Naming**: Use kebab-case with `.md` extension
- **Metadata**: Each post requires frontmatter (see "Adding & Editing Content")

#### `/src/components`

- **Purpose**: Reusable building blocks for pages
- **Astro Components**: Static, server-rendered components (`.astro`)
- **React Components**: Interactive client-side components (`.tsx`)
- **Usage**: Import in layouts and pages

#### `/src/layouts`

- **BaseLayout**: Wraps all pages with header, footer, and SEO
- **BlogLayout**: Specialized layout for blog posts with reading progress

#### `/src/pages`

- **File-based Routing**: Files become routes automatically
- **Dynamic Routes**: `[...slug].astro` matches any URL path
- **API Routes**: `.ts` files become API endpoints (RSS, robots.txt)

#### `/src/styles`

- **Global Styles**: Applied to entire site
- **Tailwind**: Configured in `astro.config.mjs`

---

## Customization Guide

### 1. **Site Metadata & Branding**

#### Update Site Information

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://yourdomain.com", // Change to your domain
  // ... other config
});
```

#### Update Header/Logo

Edit `src/components/Header.astro`:

```astro
<a href="/">Ryze</a>
<!-- Change "Ryze" to your site name -->
```

#### Update Footer Information

Edit `src/components/Footer.astro`:

- Change author name
- Update social links
- Modify copyright year

#### Customize SEO Defaults

Edit `src/components/Seo.astro`:

```typescript
const {
  title = "Your Site Title",
  description = "Your site description",
  author = "Your Name",
  // ...
} = Astro.props;
```

### 2. **Colors & Theme**

#### Tailwind CSS Configuration

Edit `tailwind.config.js` to customize colors:

```javascript
export default {
  theme: {
	extend: {
	  colors: {
		background: "hsl(...)",
		foreground: "hsl(...)",
		accent: "hsl(...)",
		// Add your colors
	  },
	},
  },
};
```

#### CSS Variables

Edit `src/styles/global.css` to define color variables:

```css
@layer base {
  :root {
	--color-background: #ffffff;
	--color-foreground: #000000;
	--color-accent: #0066cc;
  }

  :root.dark {
	--color-background: #0a0a0a;
	--color-foreground: #ffffff;
	--color-accent: #3399ff;
  }
}
```

### 3. **Typography**

#### Change Fonts

Edit `src/layouts/BaseLayout.astro`:

```astro
import "@fontsource-variable/space-grotesk"; // Change this import
"@fontsource/ibm-plex-mono"; // Or this
```

View available fonts at [Google Fonts](https://fonts.google.com/)

#### Update Font Sizes

Edit `tailwind.config.js`:

```javascript
fontSize: {
  sm: "0.875rem",
  base: "1rem",
  // Customize sizes
}
```

### 4. **Navigation Menu**

Edit `src/components/Navigation.astro` to add/remove navigation links:

```astro
<nav>
  <a href="/archive/1">Blog</a>
  <a href="/tags">Tags</a>
  <a href="/about">About</a>
  <!-- Add more links -->
</nav>
```

### 5. **Social Links**

Edit `src/components/Socials.astro`:

```astro
<a href="https://twitter.com/yourhandle" aria-label="Twitter">
  <IconBrandTwitter />
</a>
```

View available icons from [@tabler/icons-react](https://tabler-icons.io/)

### 6. **RSS Feed**

Edit `src/pages/rss.xml.ts` to customize feed:

```typescript
return rss({
  title: "Your Blog Title",
  description: "Your blog description",
  site: context.site,
  items: blogs.map(...),
});
```

### 7. **Homepage Content**

#### Introduction Section

Edit `src/components/Introduction.astro` to change homepage text

#### Featured Posts

Edit `src/components/Featured.astro` to customize featured section display

#### Newsletter Signup

Edit `src/components/Newsletter.astro` to customize or remove

---

## Adding & Editing Content

### Creating a Blog Post

#### Step 1: Create Markdown File

Create a new file in `src/blog/` with kebab-case naming:

```
src/blog/my-first-post.md
```

#### Step 2: Add Frontmatter Metadata

Every post requires metadata in YAML format at the top:

```markdown
---
slug: "my-first-post"
title: "My First Blog Post"
description: "A brief description of your post for SEO and preview"
date: 2024-11-17
author: "Your Name"
tags: ["astro", "blogging", "tutorial"]
featured: false
image:
  url: "https://example.com/image.jpg"
  alt: "Image description for accessibility"
  caption: "Image caption text"
---

# Your Content Here

Write your blog post in Markdown...
```

---

## Resources

- **[Astro Documentation](https://docs.astro.build)** - Official Astro docs
- **[Tailwind CSS](https://tailwindcss.com)** - Styling framework
- **[Markdown Guide](https://www.markdownguide.org)** - Markdown syntax
- **[Tabler Icons](https://tabler-icons.io)** - Icon library
