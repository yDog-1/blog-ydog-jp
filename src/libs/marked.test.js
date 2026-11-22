import { expect, test } from "bun:test";
import { marked } from "./marked";

test.each([
  ["![photo](image.png)", '<img src="image.png" title="null" alt="photo" />'],
  ["![photo|320](image.png \"caption\")", '<img src="image.png" title="caption" alt="photo" width="320"/>'],
  ["![photo|320x200](image.png \"caption\")", '<img src="image.png" title="caption" alt="photo" width="320" height="200"/>'],
])("renders image attributes for %s", async (markdown, image) => {
  expect(await marked.parse(markdown)).toBe(`<p>${image}</p>\n`);
});

test("renders a fenced code block without a filename and escapes code", async () => {
  const html = await marked.parse("```js\nconst x = 1 < 2;\n```");

  expect(html).toStartWith('<figure class="code-block"><pre class="shiki github-dark-default"');
  expect(html).not.toContain("<figcaption");
  expect(html).toContain("&#x3C;");
  expect(html).toEndWith("</code></pre></figure>");
});

test("renders an unlabelled fenced code block as plain text", async () => {
  const html = await marked.parse("```\nhello\n```");

  expect(html).toContain('<figure class="code-block"><pre class="shiki github-dark-default"');
  expect(html).toContain("<span>hello</span>");
  expect(html).not.toContain("<figcaption");
});

test("rejects an unknown code language", async () => {
  await expect(marked.parse("```no-such-language\nhello\n```")).rejects.toThrow("Language `no-such-language`");
});

test("renders article markdown with images and highlighted code", async () => {
  const html = await marked.parse(`# Heading

A **bold** [link](https://example.com).

- one
- two

![photo|320x200](https://example.com/a.png "title")

\`\`\`typescript:example.ts
const answer: number = 42;
\`\`\`
`);

  expect(html).toContain("<h1>Heading</h1>");
  expect(html).toContain('<strong>bold</strong> <a href="https://example.com">link</a>');
  expect(html).toContain("<li>one</li>");
  expect(html).toContain('<img src="https://example.com/a.png" title="title" alt="photo" width="320" height="200"/>');
  expect(html).toContain('<figcaption class="filename">example.ts</figcaption>');
  expect(html).toContain('<pre class="shiki github-dark-default"');
  expect(html).toContain('style="color:#FF7B72">const</span>');
  expect(html).toContain('style="color:#79C0FF"> 42</span>');
});
