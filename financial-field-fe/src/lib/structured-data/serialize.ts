import type { JsonLdGraph, JsonLdNode } from "./types";

const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), "g");
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), "g");

/**
 * Safe for a <script> body: `<` is escaped so CMS text can never close the
 * tag (REQ-SEO-030, OWASP A03); U+2028/2029 are escaped for old JS parsers.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029");
}

/** Drops null nodes (builders return null instead of partial objects, W2). */
export function buildGraph(nodes: (JsonLdNode | null)[]): JsonLdGraph | null {
  const present = nodes.filter((node): node is JsonLdNode => node !== null);
  return present.length > 0
    ? { "@context": "https://schema.org", "@graph": present }
    : null;
}
