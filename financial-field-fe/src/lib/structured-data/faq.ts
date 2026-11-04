import type { FaqItem } from "@/types";

import { schemaIds } from "./ids";
import type { JsonLdNode } from "./types";

/**
 * Only for a rendered FAQ block with at least two pairs (ADR-0006). Google no
 * longer shows FAQ rich results; this is semantic markup only.
 */
export function buildFaqPage(url: string, items: FaqItem[]): JsonLdNode | null {
  if (items.length < 2) {
    return null;
  }
  return {
    "@type": "FAQPage",
    "@id": schemaIds.faq(url),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
