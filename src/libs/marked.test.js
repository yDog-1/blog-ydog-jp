import { expect, test } from "bun:test";
import { marked } from "./marked";

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
