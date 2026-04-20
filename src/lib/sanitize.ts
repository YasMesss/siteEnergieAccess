const HTML_TAG_RE = /<[^>]*>/g;
const MULTI_SPACE_RE = /\s{2,}/g;

export function sanitize(input: string, maxLength = 500): string {
  return input
    .replace(HTML_TAG_RE, "")
    .replace(MULTI_SPACE_RE, " ")
    .trim()
    .slice(0, maxLength);
}
