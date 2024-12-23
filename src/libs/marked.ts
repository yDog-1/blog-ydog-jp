import { Marked } from "marked";
import { codeToHtml } from "shiki";

export const marked = new Marked({
  async: true,
  extensions: [
    {
      name: "code",
      renderer(token) {
        const { text, lang } = token;
        const filename = lang.split(":")[1];
        return `<figure class="code-block">${filename ? `<figcaption class="filename">${filename}</figcaption>` : ""}${text}`;
      },
    },
    {
      name: "image",
      renderer(token) {
        const { href, text, title } = token;
        // text: alt|size or alt
        const [alt, size] = text.split("|");

        // size: widthxheight or width or empty
        const [width, height] = size?.split("x") || [size, ""];
        const sizeAttr = height
          ? `width="${width}" height="${height}"`
          : width
            ? `width="${width}"`
            : "";
        return `<img src="${href}" title="${title}" alt="${alt}" ${sizeAttr} >`;
      },
    },
  ],
  async walkTokens(token) {
    if (token.type === "code") {
      const { text: rawText, lang } = token;
      const languageName = lang.split(":")[0];
      const text = await highlight(rawText, languageName);
      token.text = text;
    }
  },
});

async function highlight(rawCode: string, lang: string) {
  const html = codeToHtml(rawCode, {
    lang: lang,
    theme: "github-dark-default",
  });

  return html;
}
