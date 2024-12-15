import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://docs.github.com/public/fpt/schema.docs.graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "./src/libs/generated/client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
    },
  },
};

export default config;
