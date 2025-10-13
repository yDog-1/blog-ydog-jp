// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: cloudflare(),
  site: "https://blog.ydog.jp",
  integrations: [tailwind(), sitemap()],
});
