// @ts-check

import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: cloudflare({ prerenderEnvironment: "node" }),
  session: false,
  site: "https://blog.ydog.jp",
  integrations: [sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "github-token-binding",
        resolveId(id) {
          if (id === "virtual:github-token") return "\0virtual:github-token";
        },
        load(id) {
          if (id !== "\0virtual:github-token") return;
          return this.environment.name === "prerender"
            ? "export const githubToken = () => process.env.GITHUB_TOKEN;"
            : 'import { env } from "cloudflare:workers"; export const githubToken = () => env.GITHUB_TOKEN;';
        },
      },
    ],
  },
});
