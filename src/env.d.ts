/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GITHUB_TOKEN: string;
}
declare namespace App {
  interface Locals {
    tagColors?: ReturnType<typeof import("./libs/tag").getTagColors>;
  }
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
