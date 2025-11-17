// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), sitemap()],

  markdown: {
    shikiConfig: {
      defaultColor: false,
      themes: {
        light: "one-light",
        dark: "plastic",
      },
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    // defaultStrategy: "load",
  },

  redirects: {
    "/archive": "archive/1",
    "/blog": "/archive/1",
    "/blogs": "/archive/1",
    "/post": "/archive/1",
    "/posts": "/archive/1",
    "/tags/[tag]": "/tags/[tag]/1",
    "/rss": "/rss.xml",
    "/feed": "/rss.xml",
  },

  output: "static",
  site: "https://ryze.pages.dev",
});
