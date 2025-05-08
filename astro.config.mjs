// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare(),
  site: "https://blog.ydog.jp",
  integrations: [tailwind(), sitemap()],
});
