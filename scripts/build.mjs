import { createAppAuth } from "@octokit/auth-app";
import { request } from "@octokit/request";
import { spawnSync } from "node:child_process";

async function articleToken() {
  if (process.env.ARTICLES_READ_TOKEN) return process.env.ARTICLES_READ_TOKEN;

  const { ARTICLES_CLIENT_ID, ARTICLES_APP_PRIVATE_KEY } = process.env;
  if (!ARTICLES_CLIENT_ID || !ARTICLES_APP_PRIVATE_KEY) {
    throw new Error("Set ARTICLES_READ_TOKEN or both ARTICLES_CLIENT_ID and ARTICLES_APP_PRIVATE_KEY");
  }

  const auth = createAppAuth({ appId: ARTICLES_CLIENT_ID, privateKey: ARTICLES_APP_PRIVATE_KEY });
  const { data: installation } = await auth.hook(request, "GET /repos/{owner}/{repo}/installation", {
    owner: "yDog-1",
    repo: "articles",
  });
  const { token } = await auth({
    type: "installation",
    installationId: installation.id,
    repositoryNames: ["articles"],
    permissions: { contents: "read" },
  });
  return token;
}

try {
  const token = await articleToken();
  const env = { ...process.env, ARTICLES_READ_TOKEN: token };
  delete env.ARTICLES_APP_PRIVATE_KEY;
  const result = spawnSync("bun", ["run", "astro", "build"], { stdio: "inherit", env });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(`Build failed: ${error.message}`);
  process.exitCode = 1;
}
