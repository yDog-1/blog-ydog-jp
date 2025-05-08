import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/client";

const endpoint = "https://api.github.com/graphql";
const client = new GraphQLClient(endpoint);

export const articleVariables = {
  owner: "yDog-1",
  name: "articles",
};

const githubToken = import.meta.env.GITHUB_TOKEN;

if (!githubToken) {
  throw new Error("GITHUB_TOKEN is not set");
}

export const NewGitHubSdk = (GithubToken = githubToken) => {
  return getSdk(
    client,
    <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>) => {
      return action({
        Authorization: `Bearer ${GithubToken}`,
      });
    },
  );
};

export const isTree = (
  object: { __typename?: string } | null | undefined,
): object is { __typename: "Tree" } => {
  return object?.__typename === "Tree";
};

export const isBlob = (
  object: { __typename?: string } | null | undefined,
): object is { __typename: "Blob" } => {
  return object?.__typename === "Blob";
};
