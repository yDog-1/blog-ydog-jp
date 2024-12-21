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
