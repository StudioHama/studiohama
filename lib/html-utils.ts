/**
 * HTML 태그 제거 및 엔티티 디코딩
 * 미리보기/요약 텍스트에서 &nbsp; 등이 그대로 보이는 문제 해결
 */
export function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

export function stripHtml(html: string): string {
  if (!html) return "";
  const noTags = html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  return decodeHtmlEntities(noTags);
}
