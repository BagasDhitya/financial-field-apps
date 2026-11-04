/**
 * Crawler policy (ADR-0005). Tokens verified against each vendor's own
 * documentation on 2026-11-04 (T42). Re-verify before each release and
 * quarterly (SPC-seo §14):
 * - OpenAI: https://developers.openai.com/api/docs/bots
 * - Anthropic: https://support.claude.com/en/articles/8896518
 * - Perplexity: https://docs.perplexity.ai/guides/bots
 * - Google: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
 * - Apple: https://support.apple.com/en-us/119829
 * - Common Crawl: https://commoncrawl.org/ccbot
 * - Meta: https://developers.facebook.com/docs/sharing/webmasters/web-crawlers
 */

/**
 * AI search and user-initiated retrieval agents: always allowed (GEO).
 * Note: the user-initiated ones (ChatGPT-User, Perplexity-User,
 * meta-externalfetcher) may ignore robots.txt by their vendors' own docs.
 */
export const AI_RETRIEVAL_AGENTS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "meta-webindexer",
  "meta-externalfetcher",
] as const;

/**
 * AI training / model-use tokens: allowed by default until OQ-10 decides.
 * Google-Extended also controls grounding in Gemini Apps and Vertex AI, so
 * blocking it reduces Gemini citations, not only training use. It never
 * affects Google Search inclusion or ranking.
 */
export const AI_TRAINING_AGENTS = [
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
] as const;

/** Flip to false to block training crawlers (one-line change, ADR-0005). */
export const ALLOW_AI_TRAINING = true;
