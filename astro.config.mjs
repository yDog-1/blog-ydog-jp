// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  adapter: cloudflare(),
  site: "https://blog.ydog.jp",
  integrations: [tailwind(), sitemap()],
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
