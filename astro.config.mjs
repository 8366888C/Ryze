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
        light: "plastic", // one-light
        dark: "plastic",
      },
      wrap: true,
    },
  },

  prefetch: {
    prefetchAll: true,
    // defaultStrategy: "load",
  },

  output: "static",
  site: "https://ryze.pages.dev",
});
