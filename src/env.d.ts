/// <reference types="vite/client" />

declare namespace App {
  interface Locals {
    tagColors?: ReturnType<typeof import("./libs/tag").getTagColors>;
    articleData?: ReturnType<typeof import("./libs/gitHub").getArticleData>;
  }
}
