import { GITHUB_TOKEN } from "astro:env/server";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/client";

const endpoint = "https://api.github.com/graphql";
const client = new GraphQLClient(endpoint);

export const articleVariables = {
  owner: "yDog-1",
  name: "articles",
};

export const NewGitHubSdk = () => {
  console.log("GITHUB_TOKEN: ", GITHUB_TOKEN);
  return getSdk(
    client,
    <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>) => {
      return action({
        Authorization: `Bearer ${GITHUB_TOKEN}`,
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
