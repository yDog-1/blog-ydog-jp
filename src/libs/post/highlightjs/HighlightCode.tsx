import hljs from "highlight.js/lib/common";
import parse from "html-react-parser";
import "highlight.js/styles/lioshi.css";

type Props = {
  hlc: { code: string; languageClass: string; dataFileName: string };
};

export default function HighlightCode({
  hlc: { code, languageClass, dataFileName },
}: Props) {
  const language = languageClass.replace("language-", "");
  const highlightCode = hljs.highlight(code, {
    language: language,
    ignoreIllegals: true,
  }).value;
  return (
    <div>
      <div>{dataFileName}</div>
      <pre>
        <code className={languageClass}>{parse(highlightCode)}</code>
      </pre>
    </div>
  );
}
