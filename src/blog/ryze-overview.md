---
slug: "ryze-overview"
title: "Ryze -  Project Overview & Starter Guide"
description: "Complete overview and feature set of Ryze Astro starter"
date: 2025-11-20
author: "Rahul"
tags: ["ryze", "astro", "theme", "guide"]
featured: true
---

<hr />

## Introduction

Ryze is a modern, content-first and responsive Astro template / theme built to be small, fast, and practical. This guide gives you a no-nonsense reference on what Ryze provides out of the box, how to run it locally, and where to make common edits.

<br />

What Ryze ships

- **Astro v5**: server-side-compiled static pages and components. Astro renders to static HTML by default, so pages load fast and ship zero JS unless using islands.
- **Tailwind CSS v4**: utility-first styling with theme and typography changes by extending colors, spacing, and font-family and more. Mobile first responsive design baked in.
- **Markdown Blogs**: posts with frontmatter for metadata, consumed by the dynamic blog route(s) using the Content Collection API. Supports components in MDX if needed.
- **TypeScript support and React integration**: use React hooks to build custom components for client-side interactivity when needed.
- **SEO and editorial features**: meta tags, OG graph, robots.txt, RSS, sitemap integration, featured blogs and tags.

Run it locally (exact commands)

```powershell
git clone https://github.com/yourusername/ryze.git
cd ryze
npm install
npm run dev
```

Open `http://localhost:4321` after `npm run dev`. This project config sets that port in package scripts or dev server config; change it only if you have port conflicts.

File map — what to change and why

- `astro.config.mjs` — Edit `site` to your production domain (used by sitemap, canonical URLs). Add or remove integrations here (e.g., `@astrojs/image`, `@astrojs/tailwind`). Keep `outDir` only if you need a custom build folder.
- `tailwind.config.js` — Adjust `content` globs to include any custom file extensions; extend `theme` with brand colors and fonts. Incorrect globs will cause missing CSS in production due to purge.
- `src/styles/global.css` — This is where you include Tailwind directives and your CSS `@layer base/components`. Put shared class sets in `@layer components` so Tailwind retains them in production.
- `src/layouts/BaseLayout.astro` — The global wrapper: edit head tags (fonts, meta defaults), header/footer placement, and main container width. Changing layout affects every page.
- `src/layouts/BlogLayout.astro` — Controls article rendering: meta injection (title, description), date display, and optional table of contents. Edit typography and spacing to control reading experience.
- `src/components/*` — Small, single-purpose components: `Header.astro`, `Footer.astro`, `PostCard.astro`, `Seo.astro`. Edit these for site-wide UI changes. Keep them small and composable.
- `src/blog/*.md` — Author content here; frontmatter drives routing and metadata. Use `slug` for stable URLs.

Authoring and content rules

- Minimal required frontmatter: `slug`, `title`, `description`, `date`, `author`.
- Optional fields: `tags` (array), `featured` (boolean), `cover` (path). If you include `cover` reference an image under `/public` or `/src/image`.
- Use `.md` files for static content. If you need React components inside content, use `.mdx` and import the component explicitly.

Styling and Tailwind tips

- Keep content globs accurate in `tailwind.config.js` so needed classes are not purged in production. Typical glob: `./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}`.
- For frequently repeated long utility lists (button variants, card styles), define them once in `src/styles/global.css` inside `@layer components {}` and use those class names in templates. This improves readability and ensures the utilities are included in the final CSS.
- Use the Typography plugin (`prose`) for article content to save manual typographic rules. Add the plugin in `tailwind.config.js` and apply `class="prose"` to article containers.

Build and deploy (practical)

```powershell
npm run build    # outputs static files to dist/
npm run preview  # optional: preview the built site locally
```

Recommended host: Cloudflare Pages for global CDN and edge caching. Netlify and Vercel are fully supported too — set `Build command` = `npm run build` and `Publish directory` = `dist`.

Short production checklist

1. `astro.config.mjs` `site` value points to production domain.
2. All required frontmatter present and slugs stable.
3. `tailwind.config.js` `content` globs include all source files.
4. Images optimized and stored under `/public` or processed by an image integration.
5. Build locally and run `npm run preview` to check markup and assets.

If you want, I can add exactly one of these for you now: update brand colors in `tailwind.config.js`, wire Cloudflare Pages config, or create a small contributor mapping listing each component and its purpose. Tell me which one and I’ll implement it.
Practical tips

- Keep frontmatter complete: `slug`, `title`, `description`, `date`, `author`.
- Use `@layer components` in `global.css` for reusable class sets so Tailwind keeps them in production.
- Add `PUBLIC_` prefix to env vars that need client-side access; keep secrets in host UI.

If you want, I can add deploy configs or a small contributor guide that maps every component to its purpose.

#### [Clean Folder Structure](#clean-folder-structure)

The starter uses a thoughtful organizational system:

- **src/pages**: Routes in Astro—file and folder names automatically become URL paths
- **src/layouts**: Reusable page templates for consistency across your site
- **src/components**: Modular UI pieces that you can combine to build pages
- **src/blog**: Markdown content files with structured metadata
- **public**: Static assets like images, favicons, and downloadable files

This structure scales beautifully. Whether you have 5 pages or 500, everything stays organized and maintainable.

```
src/
  ├── pages/
  │   ├── index.astro           # Home page
  │   ├── blog/
  │   │   └── [slug].astro      # Dynamic blog routes
  │   └── 404.astro             # Error page
  ├── layouts/
  │   ├── BaseLayout.astro      # Main layout
  │   └── BlogLayout.astro      # Blog-specific layout
  ├── components/
  │   ├── Header.astro
  │   ├── Footer.astro
  │   └── PostCard.astro
  └── blog/
      └── your-post.md          # Your markdown files
```

#### [Extendable Layouts](#extendable-layouts)

Layouts are template files that wrap your content. Need a different design for blog posts vs. landing pages? Create a new layout, define it in your file's frontmatter, and you're done.

Layouts support nesting, so you can create BaseLayout → BlogLayout → SpecializedBlogLayout chains without code duplication.

### [SEO-Friendly Setup](#seo-friendly-setup)

#### [Meta Tags](#meta-tags)

The starter includes a dedicated SEO component that handles:

- Open Graph tags for social media previews
- Twitter Card tags for better sharing
- Canonical URLs to prevent duplicate content issues
- Structured data for search engines
- Dynamic title and description generation

Simply define your metadata in frontmatter, and the system generates proper HTML:

```markdown
---
title: "My Blog Post"
description: "A brief summary for search results"
---
```

#### [Sitemap + RSS](#sitemap--rss)

Automatic sitemap generation helps search engines crawl your entire site. RSS feeds allow readers to subscribe to your content using their favorite readers. Both are generated automatically—no configuration needed.

<br />

### [Responsive Design with Tailwind](#responsive-design-with-tailwind)

#### [Mobile-First Approach](#mobile-first-approach)

Every component in this starter is designed mobile-first. This means we design for small screens, then add enhancements for larger screens. The result is a site that works beautifully everywhere.

Use Tailwind's responsive prefixes to adapt your layout:

```html
<div class="flex flex-col md:flex-row lg:flex-row-reverse">
  <!-- Mobile: column layout, Tablet+: row layout, Desktop: reversed row -->
</div>
```

#### [Utility Class Structure](#utility-class-structure)

Tailwind's utility-first approach means you build designs by composing small, reusable classes:

```html
<button
  class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
>
  Click Me
</button>
```

No writing CSS files. No naming class conflicts. Just combine utilities until your design looks right. It sounds strange at first, but it becomes second nature quickly and dramatically speeds up development.

<br />

## [Technologies Used](#technologies-used)

### [Astro Framework](#astro-framework)

Astro is a modern web framework optimized for content-driven sites.

#### [Island Architecture (High-Level Explanation)](#island-architecture-high-level-explanation)

Traditional web frameworks send all your JavaScript to the browser. Astro uses "Islands Architecture"—think of your page as mostly static HTML with small interactive "islands" of JavaScript.

For example:

- **Static**: Blog post content, headers, footers → rendered as HTML
- **Interactive**: Theme toggle, comment form → ships minimal JavaScript

This hybrid approach gives you the best of both worlds: SEO benefits of static sites with interactivity where you need it.

#### [Static Site Generation](#static-site-generation)

Astro generates your entire site at build time into static HTML. This means:

1. **Ultra-fast**: Serve pre-built HTML instead of computing on each request
2. **Secure**: No server-side code executing, no databases to protect
3. **Scalable**: Deploy anywhere—static hosting, CDNs, even S3
4. **Eco-friendly**: Less computational overhead

<br />

### [Tailwind CSS](#tailwind-css)

#### [Utility-first Styling](#utility-first-styling)

Instead of writing custom CSS, Tailwind provides a comprehensive set of pre-defined utility classes:

```html
<!-- Before: Write custom CSS -->
<style>
  .card {
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>
<div class="card">...</div>

<!-- After: Compose utilities -->
<div class="rounded-lg bg-white p-6 shadow-md">...</div>
```

#### [Customization Possibilities](#customization-possibilities)

Tailwind is highly customizable. Modify `tailwind.config.js` to:

- Extend color palettes with your brand colors
- Adjust spacing, typography, and breakpoints
- Add custom utilities for frequently-used patterns
- Configure plugins for extended functionality

Everything from light mode to dark mode theming is configurable without leaving your config file.

<br />

### [Markdown Content System](#markdown-content-system)

#### [MD/MDX Files](#mdmdx-files)

Write your content in Markdown, the human-friendly markup language. Astro also supports MDX, which lets you embed React or Vue components directly in your markdown:

```markdown
---
title: "Interactive Blog Post"
---

This is regular markdown.

<InteractiveCounter client:load />

More markdown below the component.
```

#### [Frontmatter Metadata](#frontmatter-metadata)

YAML frontmatter at the top of your markdown files stores metadata:

```markdown
---
title: "Post Title"
description: "What's this about?"
date: 2025-11-19
author: "Your Name"
tags: ["tag1", "tag2"]
featured: true
---
```

This metadata is parsed and available to your layout templates, enabling automatic sorting, filtering, and organized content management.

<br />

## [Project Structure Overview](#project-structure-overview)

### [Root-Level Files](#root-level-files)

#### [astro.config](#astro-config)

This is Astro's configuration file. Here you:

- Configure integrations (like Tailwind, React, etc.)
- Set your site URL for SEO
- Define output format and build options
- Add custom vite configuration

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://yoursite.com",
  integrations: [tailwind()],
});
```

#### [package.json](#package-json)

Lists your project's dependencies and npm scripts:

```json
{
  "name": "my-astro-blog",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "astro": "^latest",
    "tailwindcss": "^latest"
  }
}
```

Run `npm run dev` to start development, `npm run build` to create production files.

<br />

### [src Directory](#src-directory)

#### [layouts](#layouts)

##### [Blog Layout](#blog-layout)

Specialized template for blog posts. Typically includes:

- Post header with title, date, and author
- Table of contents (optional)
- Main content area
- Post navigation (previous/next posts)
- Related posts or tags section

```astro
---
// layouts/BlogLayout.astro
interface Props {
  frontmatter: {
    title: string;
    date: Date;
    author: string;
  };
}

const { frontmatter } = Astro.props;
---

<html>
  <head>
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <header>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.author} • {frontmatter.date.toLocaleDateString()}</p>
    </header>
    <main>
      <slot />
    </main>
  </body>
</html>
```

##### [Base Layout](#base-layout)

The foundation layout used by most pages. Includes:

- HTML structure and head tags
- Header and navigation
- Footer
- Global styles

All other layouts typically extend this one.

<br />

#### [components](#components)

##### [Header](#header)

Navigation bar component. Usually includes:

- Site logo/brand
- Navigation menu
- Theme toggle button
- Mobile menu (hamburger)

##### [Footer](#footer)

Site footer. Typically contains:

- Copyright information
- Social media links
- Additional navigation
- Sitemap links

##### [PostCard](#postcard)

A reusable component for displaying blog post previews in lists:

```astro
---
// components/PostCard.astro
interface Props {
  title: string;
  description: string;
  date: Date;
  tags: string[];
  slug: string;
}

const { title, description, date, tags, slug } = Astro.props;
---

<article class="rounded-lg border p-4 transition-shadow hover:shadow-lg">
  <h3 class="mb-2 text-xl font-bold">{title}</h3>
  <p class="mb-4 text-gray-600">{description}</p>
  <div class="flex items-center justify-between">
    <span class="text-sm text-gray-500">{date.toLocaleDateString()}</span>
    <a href={`/blog/${slug}`} class="text-blue-600 hover:underline"
      >Read More →</a
    >
  </div>
</article>
```

<br />

#### [pages](#pages)

##### [Static Pages](#static-pages)

Individual `.astro` files become routes. `src/pages/about.astro` becomes `/about`.

```astro
---
// src/pages/about.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="About Me">
  <h1>About Me</h1>
  <p>Your bio here...</p>
</BaseLayout>
```

##### [Blog Index](#blog-index)

Dynamic routes using square brackets: `src/pages/blog/[slug].astro` creates routes like `/blog/my-post`.

The template queries markdown files, generates a page for each, and handles metadata automatically.

<br />

### [public Directory](#public-directory)

#### [Assets](#assets)

Store static files here that don't need processing:

- Images
- Videos
- PDFs
- Fonts

These files copy directly to your build without modification.

#### [Favicons](#favicons)

Your site's icon files:

- `favicon.ico` - Classic browser tab icon
- `apple-touch-icon.png` - iOS home screen icon
- `manifest.json` - PWA configuration (optional)

<br />

## [Getting Started](#getting-started)

Now that you understand the starter's architecture and capabilities, you're ready to start building. Here are your next steps:

1. **Clone or fork the repository** to your machine
2. **Install dependencies**: Run `npm install`
3. **Start developing**: Run `npm run dev` and open your browser to `http://localhost:3000`
4. **Customize**: Edit components, layouts, and colors to match your vision
5. **Add content**: Create markdown files in `src/blog` with your posts
6. **Deploy**: Build with `npm run build` and deploy the `dist` folder

---

The starter is designed to be your foundation, not your limitation. Extend it, modify it, and make it your own. Happy building!

<figure class="group">
<img src="/src/image/background.svg" loading="lazy" alt="Astro + Tailwind CSS workflow visualization" title="Build fast, modern content-driven sites" />
<figcaption>The Astro + Tailwind CSS Starter empowers you to build fast, beautiful content-driven websites</figcaption>
</figure>
