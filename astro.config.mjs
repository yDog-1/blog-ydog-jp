// @ts-check

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  session: false,
  site: "https://blog.ydog.jp",
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
