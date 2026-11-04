import { describe, expect, it } from "vitest";

import { CMS_CAPABILITIES, parseCapabilities } from "./capabilities";

describe("CMS capabilities (strictParams gate)", () => {
  it("is empty by default", () => {
    expect(parseCapabilities("").size).toBe(0);
  });

  it("parses a comma list and ignores unknown names", () => {
    const set = parseCapabilities(" seo, dates ,bogus");
    expect([...set].sort()).toEqual(["dates", "seo"]);
  });

  it("enables everything with `all`", () => {
    expect(parseCapabilities("all").size).toBe(CMS_CAPABILITIES.length);
  });
});
