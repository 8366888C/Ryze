---
slug: "deploying-your-astro-site"
title: "Deploying Your Astro Site: Complete Guide"
description: "Complete deployment guide for Ryze: builds, hosting options, CI, caching, and production checklist."
date: 2025-11-20
author: "Rahul"
tags: ["deployment", "astro", "cloudflare", "netlify"]
featured: true
---

This is a concrete deployment guide: exact build commands, recommended hosts with configuration notes, CI example, caching rules you should set, and a final checklist. Follow this step-by-step when you are ready to publish.

1. Build and preview (exact)

Run the production build locally and preview the build output.

```powershell
npm run build
npm run preview    # optional: preview built `dist/`
```

`npm run build` runs `astro build` and outputs a static `dist/` directory. Preview checks that files render as expected before pushing to production.

2. Recommended hosts and minimal setup

- Cloudflare Pages (recommended):
  - Connect your GitHub repo to Pages.
  - Build command: `npm run build`.
  - Build output directory: `dist`.
  - Configure environment variables in the Pages dashboard; do not commit secrets.
  - Cloudflare Pages serves the `dist/` content from the edge — you get global caching and TLS automatically.

- Netlify:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Add `netlify.toml` if you need redirects or headers (see example below).

- Vercel:
  - Auto-detects Astro in many repos; set build command to `npm run build` and output to `dist` if required.

3. Minimal `netlify.toml` example (copy if you need redirects/headers)

```toml
[build]
	command = "npm run build"
	publish = "dist"

[[redirects]]
	from = "/api/*"
	to = "/.netlify/functions/:splat"
	status = 200

[[headers]]
	for = "/*"
	[headers.values]
	Cache-Control = "public, max-age=0, s-maxage=60"
```

4. Example GitHub Actions (build + publish to gh-pages)

Use a workflow that runs `npm ci`, `npm run build`, and pushes `dist/` to `gh-pages` with `peaceiris/actions-gh-pages` or similar. Keep `node-version: '18'`.

5. Caching and headers — exact recommendations

- Static assets (CSS/JS/images with hashed filenames): `Cache-Control: public, max-age=31536000, immutable`.
- HTML or index routes: `Cache-Control: public, max-age=0, s-maxage=60` (or rely on host defaults). This keeps pages fresh while allowing CDN caching.
- Use `netlify.toml`, Vercel `headers`, or Cloudflare Workers/pages rules to set these headers.

6. Image optimization

- For editorial images, use `@astrojs/image` or process images during build (generate WebP/AVIF and multiple sizes). If you don’t need dynamic optimization, place images in `/public` and serve them directly.

7. Environment variables and secrets

- Use `.env` for local development; add production secrets in the host UI (Pages, Netlify, Vercel).
- Prefix variables exposed to client-side code with `PUBLIC_` (e.g., `PUBLIC_ANALYTICS_ID`). Do not commit private keys.

8. Performance checklist (before you go live)

1) Metadata: check `title`, `description`, Open Graph tags for all core pages and posts.
2) Favicons and `404.html` present.
3) Images optimized and have `alt` text.
4) Build locally and run `npm run preview` to verify links and assets.

9. Post-deploy monitoring

- Use host analytics or Plausible/Google Analytics for traffic.
- Consider Lighthouse or PageSpeed checks for performance. Automate with Lighthouse CI if desired.

10. Quick checklist to hand off to CI

- `npm ci`
- `npm run build`
- run optional tests/lint
- deploy `dist/` to host

If you want, I will create either:

- A `netlify.toml` with the headers and redirects above, or
- A ready-to-use GitHub Actions workflow that builds and publishes `dist/` to `gh-pages`, or
- A Cloudflare Pages config note / instructions. Tell me which and I will add it.
