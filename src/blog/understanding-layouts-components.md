---
slug: "understanding-layouts-components"
title: "Layouts & Components — Ryze"
description: "Detailed, practical guide to layouts and components in Ryze. Explains structure, responsibilities, and best practices you should apply immediately."
date: 2025-11-20
author: "Rahul"
tags: ["astro", "components", "layouts", "ryze"]
featured: true
---

This is a direct, practical explanation of how layouts and components are organized in Ryze, exactly what each file is responsible for, and the decisions you should make when you change them. No conceptual fluff — only action.

1. Purpose and responsibilities

- Layouts: provide shared page shells (HTML, head, header/footer, page container). Change layouts when you need global structural changes (brand fonts, meta defaults, page grid).
- Components: small building blocks used inside layouts/pages (navigation, cards, SEO helper). Change components when you need to alter a single UI piece across multiple pages.

2. Files you will touch and why

- `src/layouts/BaseLayout.astro` — top-level page shell. Responsibilities:
  - Render `<html>` and `<head>` including site-level `<meta>` and font links.
  - Add `class` hooks for dark mode (e.g., `html.dark`) and global attributes.
  - Include the `Header` and `Footer` components and provide a `slot` for page content.
  - Use this file to add analytics snippets or global structured data only if required at build time.

- `src/layouts/BlogLayout.astro` — article wrapper. Responsibilities:
  - Accept post `frontmatter` and inject title, description, canonical, and Open Graph metadata.
  - Render post header (title, date, author, read time) and body slot.
  - Provide optional table-of-contents or share buttons (componentize them).

- `src/components/Seo.astro` — canonical SEO helper. Use this to centralize meta tags: `title`, `description`, `og:image`, `twitter:card`. Editing this affects every page that imports it.

- `src/components/PostCard.astro` — summary card used on index and tag pages. Edit this to change how posts are previewed across the site.

- `src/components/ThemeToggle.tsx` — small React island for toggling dark mode. Keep logic minimal; theme persistence should be localStorage-based.

3. Concrete patterns to use now

- Single responsibility: each component handles one piece (header, footer, post card). If a component grows beyond 60–120 lines, break it into smaller parts.
- Prop-driven rendering: components accept a fixed props shape and render defensively. Example: `const { title = 'Untitled' } = Astro.props;`.
- Avoid side effects in components. Do not access globals at build time unless guarded by a runtime check.

4. Loading posts (practical)

Use `import.meta.glob` with `eager: true` when you want to compile a complete list at build time and then map `frontmatter` for index pages. Example pattern (exact code snippet):

```js
const modules = import.meta.glob("../../blog/*.md", { eager: true });
const posts = Object.values(modules)
  .map((m) => m.frontmatter)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
```

Sort and filter client-side or during build. For large sites, rely on pagination and chunk loading.

5. Styling patterns with Tailwind

- Use `@layer components` in `src/styles/global.css` for named classes like `.btn` or `.card`. This prevents repeated long utility lists in templates and ensures Tailwind retains the utilities during purge.
- Keep most styling at the component level using Tailwind utility classes, but centralize repeated options in `@layer components`.

6. When to ship client JS

- Default rule: keep pages static. Add client JS only for features that require interactivity (theme toggle, forms with client validation, live previews).
- For small islands, keep hydration directives minimal (`client:idle` or `client:visible`) to minimize shipped JS.

7. Practical refactor checklist

If you need to change the global layout or typography, follow these steps:

1. Update `src/styles/global.css` or `tailwind.config.js` for typography and base variables.
2. Adjust `BaseLayout.astro` head tags and classes.
3. Test visually across the homepage and a blog post using `npm run dev`.
4. If CSS size increases significantly, extract repeated classes into `@layer components`.

5. Example: Change post preview

To change how post previews show on the index page:

1. Edit `src/components/PostCard.astro` to alter layout and classes.
2. If you need a new data field, update post frontmatter and the loader in `src/pages/index.astro` or the posts collector.
3. Run `npm run dev` and verify the change on the index page.

This guide gives you the exact files and small patterns to follow. If you tell me the change you want (e.g., wider article column, different meta tags, or a new post card layout), I will edit the exact files and present the diff.

Quick facts

- Framework: Astro v5 (zero JS shipped by default)
- Styling: Tailwind CSS v4
- Dev: `http://localhost:4321`

Layouts

- `BaseLayout.astro`: global HTML/head, fonts, header/footer and site container.
- `BlogLayout.astro`: article wrapper, meta injection, date/author display.

Components

- `Header.astro`, `Footer.astro`, `PostCard.astro`, `Seo.astro`, `ThemeToggle.tsx` — small, single-responsibility components.
- Use `.astro` for static UI; use `.tsx` for interactive islands when you need client JS.

Patterns

- Pass frontmatter from posts into `BlogLayout` to render metadata and SEO tags.
- Use `import.meta.glob('../../blog/*.md', { eager: true })` to collect posts at build time.
- Create small `@layer components` items in `src/styles/global.css` for repeated utility sets so Tailwind keeps them when purging.

Practical examples

PostCard (concept):

```astro
---
const { title, excerpt, date, slug } = Astro.props;
---

<article class="rounded border p-4">
  <a href={`/blog/${slug}`}><h3>{title}</h3></a>
  <time>{date}</time>
</article>
```

When to add client JS

- Only for interactive features (theme switch, analytics opt-in). Keep pages as static HTML otherwise.

Edit `src/layouts` and `src/components` first when changing site structure or common UI.

## [What Are Layouts in Astro](#what-are-layouts-in-astro)

Layouts in Astro provide shared structure and behavior for pages. They let you define common shells — header, footer, meta tags — once, and reuse them across many pages.

<br />

### [Purpose of Layouts](#purpose-of-layouts)

#### [Shared Structure](#shared-structure)

Layouts are the place to keep components and HTML that appear across pages:

- Navigation and header
- Footer and site credits
- Global wrappers and grid containers

This reduces duplication and ensures consistent markup and accessibility.

#### [SEO Metadata](#seo-metadata)

Layouts often include a centralized SEO component or head tags so every page gets consistent meta information. Frontmatter values from individual pages (like `title` or `description`) are passed into the layout and injected into `<head>` for correct Open Graph, Twitter Card, and canonical URLs.

### [Base Layout](#base-layout)

A `BaseLayout` is the top-level shell used by most pages. Common responsibilities:

- Render the `<html>` and `<body>` structure
- Include global styles and font links
- Render site header and footer
- Provide slot for page content

Example (conceptual):

```astro
---
// src/layouts/BaseLayout.astro
const { title } = Astro.props;
---

<html lang="en">
  <head>
    <title>{title}</title>
    <meta charset="utf-8" />
  </head>
  <body class="bg-white antialiased dark:bg-gray-900">
    <Header />
    <main class="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

Key pieces inside `BaseLayout`:

- **Header**: top navigation and branding
- **Footer**: site credits and links
- **Main wrapper**: center column with consistent spacing

### [Blog Layout](#blog-layout)

`BlogLayout` typically extends `BaseLayout` and adds article-specific features:

- Article wrapper and typographic styles
- Table of contents or anchor links
- Metadata display (date, author, read time)
- Calls to action (subscribe, share)

It also receives the post's frontmatter so templates can access `title`, `date`, `tags`, and `featured` flags.

Example usage inside a post file frontmatter:

```markdown
---
layout: "BlogLayout"
title: "Sample Post"
date: 2025-11-19
author: "Rahul"
---
```

Within `BlogLayout` you can access `Astro.props.frontmatter` and render details at the top of the article.

<br />

## [Components Overview](#components-overview)

Components are the building blocks you use inside layouts and pages. They keep UI consistent and make maintenance easier.

### [Reusable UI Components](#reusable-ui-components)

Common components in Ryze:

- **Header**
  - Navigation items
  - Branding (logo / site title)
  - Theme toggle or sign-in links
- **Footer**
  - Helpful links (privacy, about)
  - Social icons and credits
- **PostCard**
  - Post title
  - Excerpt or description
  - Date display
  - Tag list and "Read more" link

Example `PostCard` markup:

```astro
---
// src/components/PostCard.astro
const { title, description, date, slug } = Astro.props;
---

<article class="rounded-lg border p-4 transition-shadow hover:shadow-lg">
  <a href={`/blog/${slug}`} class="block">
    <h3 class="text-lg font-semibold">{title}</h3>
    <p class="mt-2 text-sm text-gray-600">{description}</p>
  </a>
  <div class="mt-3 text-xs text-gray-500">
    {new Date(date).toLocaleDateString()}
  </div>
</article>
```

### [Why Componentization Matters](#why-componentization-matters)

- **Reusability**: Write once, use many places
- **Consistency**: Single source of truth for UI patterns
- **Maintainability**: Fix bugs and update styles in one component

Componentization also enables better testing and speeds up new feature development.

<br />

## [Blog System Structure](#blog-system-structure)

A typical blog setup in this starter lives under `src/pages/blog` and `src/blog` for content.

### [src/pages/blog](#srcpagesblog)

- `index.astro` — renders the blog index, lists posts using `PostCard`
- `[slug].astro` — dynamic route that renders individual posts by slug

`[slug].astro` reads the post file's frontmatter and content and then renders it inside `BlogLayout`.

### [How Posts Are Loaded](#how-posts-are-loaded)

Astro provides helpers like `Astro.glob` to load markdown files at build/dev time.

Example pattern to collect posts:

```js
const allPosts = Object.values(
  import.meta.glob("../../blog/*.md", { eager: true }),
)
  .map((p) => p.frontmatter)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
```

Common post processing steps:

- **Sorting**: newest first by `date`
- **Filtering featured**: `posts.filter(p => p.featured)`
- **Pagination**: slice results into pages for `index.astro`

Use `eager: true` to import content immediately during build. For large sites, dynamic imports or streaming strategies may be preferable.

<br />

## [Creating New Components](#creating-new-components)

A clear folder structure and naming conventions make component maintenance easy.

### [Folder Organization](#folder-organization)

Suggested organization:

```
src/components/
  ├── core/       # small, generic building blocks (Button, Icon)
  └── ui/         # higher-level UI components (PostCard, Newsletter)
```

- **core**: primitives with minimal styling and clear props
- **ui**: composed components using `core` building blocks

### [Naming Conventions](#naming-conventions)

- Use `PascalCase` for component filenames: `Header.astro`, `PostCard.astro`
- Keep filenames aligned with exported component names for clarity
- Use `.astro` for static components and `.tsx` for interactive React components

### [Passing Props](#passing-props)

Define and document expected props in each component. Use an interface-like comment or explicit checks where helpful.

Example `PostCard` props interface (conceptual):

```ts
// Props: { title: string; description?: string; date: string; slug: string }
```

Provide default values where appropriate:

```astro
---
const { title = "Untitled", description = "", date, slug } = Astro.props;
---
```

Use defensive rendering for optional props to avoid runtime errors.

### [Reusability Patterns](#reusability-patterns)

- **Extract common sections**: If multiple pages share a sub-section, make it a component
- **Tailwind utility patterns**: Create small utility classes or `@layer components` in `global.css` for repeated patterns
- **Prop-driven styling**: Accept variant props (`size`, `variant`) and map them to Tailwind classes inside the component

Example variant pattern:

```astro
---
const { variant = "primary" } = Astro.props;
const bg = variant === "primary" ? "bg-blue-600" : "bg-gray-200";
---

<button class={`px-4 py-2 rounded ${bg}`}>Action</button>
```

<br />

## [Customization Tips](#customization-tips)

### [Editing Layouts](#editing-layouts)

- To change the global header, edit `src/components/Header.astro` and `src/layouts/BaseLayout.astro`.
- To add dark mode, update `src/styles/global.css` with CSS variables and apply the `dark` class to `<html>`.

Example to toggle dark mode (client-side):

```js
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
}
```

### [Overriding Component Styles](#overriding-component-styles)

Two approaches:

- **Tailwind classes**: Change utility classes where the component is used to slightly alter appearance
- **Global CSS overrides**: Add specific rules in `src/styles/global.css` or use `@layer components` to create named classes

Prefer utility classes for small tweaks and component-level CSS for major style changes.

### [Expanding UI](#expanding-ui)

- Add new sections by creating components in `src/components/ui/` and importing them into layouts or pages
- Create content blocks (quote, code showcase, feature grid) as reusable components so authors can recompose pages easily
- Document component usage in a simple `README.md` or storybook-like index for the repo

---

<figure class="group">
<img src="/src/image/background.svg" loading="lazy" alt="Layouts and components overview" title="Layouts and components patterns" />
<figcaption>Clean layouts and well-structured components make Ryze easy to extend and maintain</figcaption>
</figure>
