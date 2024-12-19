// . が使用できないため、- と入力したものを . に変換する
export const decodeTag = (tagName: string) => {
  if (tagName.includes("-")) {
    return tagName.replace("-", ".");
  }
  return decodeURI(tagName);
};

export const encodeTag = (tagName: string) => {
  if (tagName.includes(".")) {
    return tagName.replace(".", "-");
  }
  return tagName;
};
