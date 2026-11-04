/** A JSON-LD node. Kept loose on purpose: schema.org shapes vary per type. */
export type JsonLdNode = {
  "@type": string | string[];
  "@id"?: string;
} & Record<string, unknown>;

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};
