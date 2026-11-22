/// <reference types="vite/client" />

declare namespace App {
  interface Locals {
    tagColors?: ReturnType<typeof import("./libs/tag").getTagColors>;
  }
}

declare module "virtual:github-token" {
  export function githubToken(): string | undefined;
}
