---
slug: "creating-your-first-blog"
title: "Creating Your First Blog Post with Ryze"
description: "A practical walkthrough for writing, previewing, and publishing your first blog using the Ryze Astro + Tailwind starter"
date: 2025-11-23
author: "Rahul"
tags: ["blogging", "markdown", "ryze"]
featured: true
---

<hr />

## [How the Blog System Works](#how-the-blog-system-works)

Ryze uses Markdown files combined with Astro's content collections as the source for blog posts. Each blog lives in `src/blog` and is parsed at build time. Frontmatter provides metadata and the Markdown body becomes HTML.

<br />

This guide explains exactly how to write, preview, and publish your first Markdown blog in Ryze, with explicit frontmatter rules, file naming conventions, image handling, SEO steps, and a publish checklist. Follow the steps in order.

<br />

#### 1. Create the file

Create a file under `src/blog` folder with a URL-safe filename [**kebab case**]. Example:

```
src/blog/blog-title.md
```

#### 2. Required frontmatter

```yaml
---
slug: "blog-title"
title: "Blog Title"
description: "One-line summary suitable for meta description (120–160 chars)"
date: 2025-11-20
author: "Your Name"
tags: ["blogging", "getting-started", "first-blog"]
featured: false
---
```

- **slug**: stable URL part, don’t change it after publishing.
- **title**: visible title and part of SEO.
- **description**: used for meta description and social previews, keep it concise.
- **date**: YYYY-MM-DD format.
- **author**: display name for the author.
- **tags**, **featured**: optional but commonly used.

#### 3. Write content in Markdown

- Start by writing your blog content in Markdown below the frontmatter section. Donot start with the title, the title is auto-generated from frontmatter.
- Use `h2` for the sections of the blog. Use `h2`, `h3`, `h4` for subsections.
- Keep paragraphs short and semantic. Use `<br />` tag for line breaks between paragraphs. Use lists for steps and inline code for commands.
- For images, put the files in `src/image` and reference them with absolute paths like `/image/cover.png`. This ensures the images are optimized by your deployment service of choice.

#### 4. Preview locally

Run the dev server and navigate to the post URL. Replace **blog-title** with your slug.

```powershell
npm run dev
# open http://localhost:4321/blog/blog-title
```

If the post doesn't show:

- Confirm the frontmatter is valid YAML at the top of the file (no stray characters).
- Confirm filename is in `src/blog/` and the slug is unique.

#### 5. Publish steps

```powershell
git add src/blog/blog-title.md
git commit -m "Add: blog-title"
git push origin main
```

After push, your hosting platform will pick up the build. Verify on production once deployment completes.

## Notes and Best Practices

- Use `.md` unless you need React components, then use `.mdx`.
- Name files in **kebab case**, keep **slug** stable after publish.
- Include **images** for your blog content inside `/src/image` for auto image optimization.
- Custom changes to frontmatter keys require updates to `content.config.ts`.
- Review changes locally before publishing to avoid issues.

<br />
<br />

Following these steps ensures your blog post is properly formatted, discoverable, and ready for your audience. Happy blogging!

<hr />
