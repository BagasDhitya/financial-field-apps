import { describe, expect, it } from "vitest";

import { mapMedia, resolveBodyMedia, resolveMediaUrl } from "./media";

describe("media", () => {
  it("drops anything that is not an image", () => {
    expect(
      mapMedia({ url: "/uploads/a.pdf", mime: "application/pdf" }),
    ).toBeNull();
    expect(mapMedia({ url: "/uploads/a.mp4", mime: "video/mp4" })).toBeNull();
    expect(mapMedia(null)).toBeNull();
  });

  it("resolves relative and keeps absolute URLs", () => {
    expect(resolveMediaUrl("/uploads/a.jpg")).toBe(
      "http://cms.example.test/uploads/a.jpg",
    );
    expect(resolveMediaUrl("https://cdn.example/a.jpg")).toBe(
      "https://cdn.example/a.jpg",
    );
  });

  it("rewrites only image nodes in a body", () => {
    const body = resolveBodyMedia([
      { type: "paragraph", children: [] },
      { type: "image", image: { url: "/uploads/b.jpg" } },
    ]);
    expect(body[0]).toEqual({ type: "paragraph", children: [] });
    expect((body[1] as { image: { url: string } }).image.url).toBe(
      "http://cms.example.test/uploads/b.jpg",
    );
  });
});
