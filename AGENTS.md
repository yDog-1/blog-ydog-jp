# Repository guidance

## Commands
- CI uses Bun 1.4.4 and `bun install --frozen-lockfile`.
- Tests: `bun test`; one file: `bun test ./src/libs/article.test.js`.
  Even the GitHub integration suite mocks network requests; no real token or service is needed.
- `bun run fmtlint` applies repository-wide fixes. For a read-only check,
  use `bunx biome check .`. There is no dedicated typecheck script.
- Build with `ARTICLES_READ_TOKEN` set to a token that can read
  `yDog-1/articles`; then use `bun run preview` to inspect the output.
  CI builds only on pushes to main, not on pull requests.

## Content and rendering
- Content is external: `src/libs/gitHub.ts` and `src/libs/listArticles.graphql`
  fetch `HEAD:articles` from `yDog-1/articles`, not local Markdown files.
- Article frontmatter uses `title`, `topics`, and `published`, with optional
  `published_at`. Drafts and future-dated articles are excluded.
  Article URLs use the frontmatter title, not the Markdown filename.
- Components share GitHub-data and tag-color promises through
  `Astro.locals.articleData` and `Astro.locals.tagColors`; preserve that reuse.
- Tag colors come from the external `tagColor.yaml`, parsed as frontmatter.
- Tailwind v4 is wired through `@tailwindcss/vite` and
  `src/styles/tailwind.css`; the legacy `tailwind.config.ts` is not referenced.

## Generated files and deployment
- After changing `src/**/*.graphql`, run `bun run codegen`.
  It fetches GitHub's public schema and regenerates the tracked
  `src/libs/generated/client.ts`; do not edit that file manually.
  Biome excludes the generated directory.
- Output is static `dist/`, served through `[assets]` in `wrangler.toml`.
  There is no runtime GitHub token or `/preview` route.
  GitHub App setup is documented in `README.md`.
- After changing workflow action references, regenerate
  `.github/workflows/actions.lock` with `gh actions-lock` and verify with
  `gh actions-lock --verify`; do not edit the lock manually.
