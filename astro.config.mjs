// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: cloudflare(),
  site: "https://blog.ydog.jp",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
