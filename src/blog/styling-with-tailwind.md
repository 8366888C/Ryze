---
slug: "styling-with-tailwind"
title: "Styling with Tailwind in Ryze — Practical Guide"
description: "In-depth, actionable instructions for using Tailwind CSS v4 in Ryze: exact config, patterns, and production considerations."
date: 2025-11-20
author: "Rahul"
tags: ["tailwind", "css", "styling", "astro"]
featured: true
---

This guide gives concrete, repeatable steps for styling Ryze with Tailwind v4: how to configure Tailwind, structure `global.css`, extract component classes, and keep the final CSS small in production. No theory — only the exact edits you will perform.

1. Tailwind config — what to check now

- `content` globs must include all files that reference class names. Use:

```js
content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"];
```

- If you add a new file extension (e.g., `.svx`), add it to this glob. If classes used in templates are omitted from scan, they will be purged in production.

2. `src/styles/global.css` — exact structure to use

At the top of `src/styles/global.css`, include Tailwind directives and add your component layer. Minimal example to copy:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --brand: #0ea5a4;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700;
  }
  .card {
    @apply rounded-lg bg-white p-6 shadow-sm;
  }
}
```

3. Reusable patterns (apply these immediately)

- Extract all repeated utility sets (buttons, cards, small layout wrappers) into `@layer components` with clear, short class names.
- Use Tailwind variants (`dark:`, `sm:`, `md:`, `hover:`) in these component classes when necessary.

4. Article and typography

- Use the Typography plugin (`prose`) for blog content. If not installed, add it to `tailwind.config.js` under `plugins` and apply `class="prose dark:prose-invert"` to article wrappers.
- Exact article wrapper to use in `BlogLayout.astro`:

```html
<main class="prose dark:prose-invert mx-auto max-w-3xl px-4 py-8">
  <slot />
</main>
```

5. Code blocks and syntax highlighting

- Use Shiki at build time for server-side syntax highlighting. Install `shiki` and, if you prefer, integrate it into your markdown pipeline or use an Astro integration.
- Add minimal global `pre` styling for padding and overflow so long lines don't break layout:

```css
.prose pre {
  @apply overflow-auto rounded-md bg-gray-900 p-4 text-gray-100;
}
```

6. Keeping CSS small in production (practical checklist)

1) Confirm `content` globs cover all file types that include class names.
2) Move repeated utility lists into `@layer components` so purge picks required utilities.
3) Avoid constructing class names at runtime (e.g., `class={isActive ? 'bg-blue-500' : 'bg-gray-200'}` is fine — but avoid building `class="text-" + size` patterns). Tailwind purge cannot detect dynamic class strings.
4) Run `npm run build` and check generated CSS size under `.astro/_dist` or the location where Vite outputs CSS.

7. Practical examples you can apply now

- Create a `btn` component by adding `.btn-primary` in `global.css` and replace inline button classes site-wide.
- Create `.card` for post previews and replace repeated classes in `PostCard.astro`.

8. Troubleshooting

- Missing styles in production: ensure classes are used literally in templates (not built dynamically) and check `content` globs.
- Typography plugin not applied: make sure plugin is loaded and `prose` class is present in the markup.

If you want, I will open `src/styles/global.css` and add the exact `@layer components` snippet above adapted to your current color palette from `tailwind.config.js`.

Core points

- Tailwind CSS v4 (utility-first). Keep styles declarative via utilities; add custom components via `@layer components`.
- Tailwind scans `src/**/*` (see `tailwind.config.js`) — maintain content globs so tree-shaking keeps used utilities.

How the repo uses Tailwind

- `src/styles/global.css`: include `@import "tailwindcss"` or directives and define `@layer base/components` entries.
- Use `@layer components` for repeated utility sets (buttons, cards) to avoid duplicating long utility lists in templates.

Quick examples

Button component (global):

```css
@layer components {
  .btn-primary {
    @apply rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700;
  }
}
```

Article wrapper (use in layouts):

```html
<main class="prose dark:prose-invert mx-auto max-w-3xl px-4 py-8">
  <!-- post content -->
</main>
```

Code & syntax highlighting

- Use Shiki at build time for production HTML highlights.
- Add minimal `pre`/`code` styles in `global.css` for overflow and padding.

Best practices (short)

- Prefer utility composition over deep CSS selectors.
- Extract repeating utility groups into `@layer components` so Tailwind retains them.
- Use `.astro` scoped styles only when a rule must not be global.

If you want, I will add a short `global.css` snippet that matches the current Tailwind theme in `tailwind.config.js`.
