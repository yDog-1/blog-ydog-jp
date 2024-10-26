import parse, { Element, Text, domToReact } from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import styles from "./ParseToJSX.module.scss";
import HighlightCode from "./highlightjs/HighlightCode";
import { v4 as uuidv4 } from "uuid";
import Iframely from "./script/Iframely";
import Twitter from "./script/Twitter";

const isElement = (element: unknown): element is Element =>
	element instanceof Element;
const isText = (text: unknown): text is Text => text instanceof Text;

export default function parseToJSX(rawHtml: string, liIndex = 0) {
	return parse(rawHtml, {
		replace: (domNode) => {
			// aタグの処理
			if (domNode instanceof Element && domNode.name === "a") {
				const children = domNode.children.filter(
					// childrenの型をElement | Textとする
					(node): node is Element | Text => isElement(node) || isText(node),
				);
				// 同一ドメインじゃない
				if (domNode.attribs.href.indexOf("http") !== -1) {
					const target = domNode.attribs?.target;
					const rel = domNode.attribs?.rel;
					return (
						<a
							href={domNode.attribs.href}
							target={target}
							rel={rel}
							className="text-blue-500 hover:underline"
						>
							{domToReact(children)}
						</a>
					);
				}
				// それ以外はLinkタグに置き換える。
				return (
					<Link
						href={domNode.attribs.href}
						className="text-blue-500 hover:underline"
					>
						{domToReact(children)}
					</Link>
				);
			}
			// code処理
			if (
				domNode instanceof Element &&
				domNode.name === "code" &&
				domNode.attribs.class === undefined
			) {
				if (!isText(domNode.firstChild)) return;
				return (
					<code className="rounded bg-slate-200 px-1 font-mono">
						{domNode.firstChild.data}
					</code>
				);
			}
			// コードブロックの処理
			if (
				domNode instanceof Element &&
				domNode.name === "div" &&
				"data-filename" in domNode.attribs
			) {
				// <pre>
				if (!isElement(domNode.firstChild)) return;
				// <code>
				if (!isElement(domNode.firstChild.firstChild)) return;
				const codeElement = domNode.firstChild.firstChild;

				// codeの内容
				if (!isText(codeElement.firstChild)) return;

				const code = codeElement.firstChild.data;
				const languageClass = codeElement.attribs.class;
				const dataFileName = domNode.attribs["data-filename"];

				return <HighlightCode hlc={{ code, languageClass, dataFileName }} />;
			}
			// 画像の処理
			if (domNode instanceof Element && domNode.name === "img") {
				const atr = domNode.attribs;
				return (
					<Image
						src={atr.src}
						alt={atr.alt}
						width={Number(atr.width)}
						height={Number(atr.height)}
					/>
				);
			}
			// ul処理
			if (domNode instanceof Element && domNode.name === "ul") {
				const liChildren = domNode.children;
				return (
					<ul className={styles["color-ul"]}>
						{liChildren.map((li) => {
							if (!isElement(li)) return;
							if (!isText(li.firstChild)) return;

							const data = li.firstChild.data;

							if (liIndex > 5) liIndex = 0;
							liIndex += 1;
							return (
								<li key={uuidv4()} className={styles[`ul-li-${liIndex}`]}>
									{data}
								</li>
							);
						})}
					</ul>
				);
			}
			// ol処理
			if (domNode instanceof Element && domNode.name === "ol") {
				const liChildren = domNode.children;
				return (
					<ol className={styles["color-ol"]}>
						{liChildren.map((li) => {
							if (!isElement(li)) return;
							if (!isText(li.firstChild)) return;

							const data = li.firstChild.data;

							if (liIndex > 5) liIndex = 0;
							liIndex += 1;
							return (
								<li key={uuidv4()} className={styles[`ol-li-${liIndex}`]}>
									{data}
								</li>
							);
						})}
					</ol>
				);
			}
			// 引用処理
			if (
				domNode instanceof Element &&
				domNode.name === "blockquote" &&
				domNode.attribs.class === undefined
			) {
				const textChildren = domNode.children.map((child) => {
					if (!isElement(child)) return;
					if (!isText(child.firstChild)) return;
					return child.firstChild;
				});
				return (
					<blockquote
						className={`relative border-l-2 border-slate-500 bg-slate-100 before:absolute before:font-mono before:text-4xl before:text-slate-500 before:content-['"'] `}
					>
						{textChildren.map((child) => (
							<p key={uuidv4()} className="py-4 pl-5">
								{child?.data}
							</p>
						))}
					</blockquote>
				);
			}
			// Iframely処理
			if (
				domNode instanceof Element &&
				domNode.name === "div" &&
				domNode.attribs.class === "iframely-embed"
			) {
				if (!isElement(domNode.firstChild)) return;
				const responsive = domNode.firstChild;
				if (!isElement(responsive.firstChild)) return;
				const a = responsive.firstChild;
				return (
					<>
						{domToReact([a])}
						<Iframely />
					</>
				);
			}
			// Twitter処理
			if (
				domNode instanceof Element &&
				domNode.name === "blockquote" &&
				domNode.attribs.class === "twitter-tweet"
			) {
				return (
					<>
						{domToReact([domNode])}
						<Twitter />
					</>
				);
			}
			// scriptがあるとhydrationエラーが起きてしまうため削除
			if (
				domNode instanceof Element &&
				domNode.name === "script" &&
				(domNode.attribs.src === "//cdn.iframe.ly/embed.js" ||
					domNode.attribs.src === "https://platform.twitter.com/widgets.js")
			) {
				return <></>;
			}
		},
	});
}
