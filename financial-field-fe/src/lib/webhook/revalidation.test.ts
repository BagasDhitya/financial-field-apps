import { describe, expect, it } from "vitest";

import { planRevalidation } from "./revalidation";

describe("planRevalidation (webhook → cache tags)", () => {
  it("purges the article, the list and the navigation on publish", () => {
    expect(
      planRevalidation({
        event: "entry.publish",
        model: "article",
        entry: { slug: "a", publishedAt: "x" },
      }),
    ).toEqual({
      kind: "revalidate",
      tags: ["articles", "navigation", "article:a"],
    });
  });

  it("ignores draft-only saves", () => {
    expect(
      planRevalidation({
        event: "entry.update",
        model: "article",
        entry: { slug: "a", publishedAt: null },
      }),
    ).toEqual({
      kind: "ignore",
      reason: "draft",
    });
  });

  it("handles the new Phase 1 models", () => {
    expect(
      planRevalidation({
        event: "entry.publish",
        model: "static-page",
        entry: { slug: "redaksi", publishedAt: "x" },
      }),
    ).toMatchObject({
      tags: ["pages", "page:redaksi"],
    });
    expect(
      planRevalidation({ event: "entry.update", model: "redirect", entry: {} }),
    ).toEqual({ kind: "revalidate", tags: ["redirects"] });
    expect(
      planRevalidation({
        event: "entry.publish",
        model: "site-setting",
        entry: { publishedAt: "x" },
      }),
    ).toMatchObject({ tags: ["site-settings"] });
  });

  it("ignores unknown models", () => {
    expect(planRevalidation({ model: "something" })).toEqual({
      kind: "ignore",
      reason: "unknown-model",
    });
  });
});
