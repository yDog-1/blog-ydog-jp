import { GraphQLClient } from "graphql-request";
import { getSdk } from "./generated/client";

const endpoint = "https://api.github.com/graphql";
const client = new GraphQLClient(endpoint);

export const articleVariables = {
  owner: "yDog-1",
  name: "articles",
  expression: `${process.env.ARTICLES_REF || "HEAD"}:articles`,
};

export const NewGitHubSdk = (sdkClient = client, getToken = () => process.env.ARTICLES_READ_TOKEN) =>
  getSdk(
    sdkClient,
    <T>(action: (requestHeaders?: Record<string, string>) => Promise<T>) => {
      const token = getToken();
      if (!token) throw new Error("ARTICLES_READ_TOKEN is not set");
      return action({
        Authorization: `Bearer ${token}`,
      });
    },
  );

export const getArticleData = () =>
  NewGitHubSdk().listArticles(articleVariables);

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
