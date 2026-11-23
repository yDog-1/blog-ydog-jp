import { describe, expect, mock, test } from "bun:test";

const { articleVariables, isBlob, isTree, NewGitHubSdk } = await import(
  "./gitHub"
);

describe("NewGitHubSdk", () => {
  test("passes variables and the current injected token to the client", async () => {
    let token = "first";
    const requests = [];
    const result = { repository: { object: null } };
    const client = {
      request: async (request) => {
        requests.push(request);
        return result;
      },
    };
    const sdk = NewGitHubSdk(client, () => token);
    expect(await sdk.listArticles(articleVariables)).toEqual(result);
    token = "second";
    expect(await sdk.listArticles(articleVariables)).toEqual(result);
    expect(
      requests.map(({ variables, requestHeaders }) => ({
        variables,
        requestHeaders,
      })),
    ).toEqual([
      {
        variables: { owner: "yDog-1", name: "articles" },
        requestHeaders: { Authorization: "Bearer first" },
      },
      {
        variables: { owner: "yDog-1", name: "articles" },
        requestHeaders: { Authorization: "Bearer second" },
      },
    ]);
  });

  test("rejects missing tokens before calling the client", () => {
    const request = mock(() => Promise.resolve({}));
    const sdk = NewGitHubSdk({ request }, () => "");
    expect(() => sdk.listArticles(articleVariables)).toThrow(
      "ARTICLES_READ_TOKEN is not set",
    );
    expect(request).not.toHaveBeenCalled();
  });

  test("propagates client failures", async () => {
    const error = new Error("GitHub unavailable");
    const sdk = NewGitHubSdk(
      { request: () => Promise.reject(error) },
      () => "token",
    );
    await expect(sdk.listArticles(articleVariables)).rejects.toBe(error);
  });
});

describe("GitHub object guards", () => {
  test("distinguishes trees and blobs, including missing objects", () => {
    expect(isTree({ __typename: "Tree" })).toBe(true);
    expect(isTree({ __typename: "Blob" })).toBe(false);
    expect(isTree(null)).toBe(false);
    expect(isBlob({ __typename: "Blob" })).toBe(true);
    expect(isBlob({ __typename: "Tree" })).toBe(false);
    expect(isBlob(undefined)).toBe(false);
  });
});
