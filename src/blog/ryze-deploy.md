---
slug: "ryze-deploy"
title: "Deploying Ryze using Cloudflare Pages"
description: "Complete deployment guide for Ryze with builds, hosting options, CICD, and performance checklist."
date: 2025-11-22
author: "Rahul"
tags: ["ryze", "deploy", "cloudflare"]
featured: true
---

<hr />

## [Build and Preview](#build-and-preview)

Run the production build locally and preview the build output.

```powershell
npm run build
npm run preview
```

`npm run build` runs `astro build` and outputs a static `dist/` directory. Preview checks that files render as expected before pushing to production.

<br />

## [Recommended Hosts and Setup](#recommended-hosts-and-setup)

#### [Cloudflare Pages (Recommended)](#cloudflare-pages-recommended)

- Connect your GitHub repo to Pages.
- Build command: `npm run build`.
- Build output directory: `dist`.
- Configure environment variables in the Pages dashboard. Do not commit secrets.
- Cloudflare Pages serves the `dist/` content from the edge. You get global caching and TLS automatically.

#### [Vercel](#vercel)

- Auto-detects Astro in your Github repos.

#### [Netlify](#netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Add `netlify.toml` if you need redirects or headers. See example below.

  ```toml
  [build]
  command = "npm run build"
  publish = "dist"

  [[redirects]]
  from = "/api/\*"
  to = "/.netlify/functions/:splat"
  status = 200

  [[headers]]
  for = "/\*"
  [headers.values]
  Cache-Control = "public, max-age=0, s-maxage=60"

  ```

<br />

## Recommendations

### [Image Optimization](#image-optimization)

For editorial images, use `@astrojs/image` or process images during build (generate WebP/AVIF and multiple sizes). If you don't need dynamic optimization, place images in `/public` and serve them directly.

<br />

### [Environment Variables and Secrets](#environment-variables-and-secrets)

Use `.env` for local development; add production secrets in the host UI (Pages, Netlify, Vercel).

Prefix variables exposed to client-side code with `PUBLIC_` (e.g., `PUBLIC_ANALYTICS_ID`). Do not commit private keys.

<br />

## [Post-Deploy Monitoring](#post-deploy-monitoring)

After your site goes live, track performance and usage:

<br />

- Use host analytics or Plausible/Google Analytics to monitor traffic.
- Consider Lighthouse or PageSpeed checks for performance metrics. Automate with Lighthouse CI if desired.

<br />
<br />

For future updates to Ryze, pull the latest changes from the [main branch](https://github.com/8366888C/Ryze/tree/main) and redeploy. Happy deploying!

<hr />
