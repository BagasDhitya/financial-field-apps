// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ArticleBody } from "./ArticleBody";

const ORIGIN = "https://example.test";

const body = [
  {
    type: "heading",
    level: 1,
    children: [{ type: "text", text: "Judul bagian" }],
  },
  {
    type: "paragraph",
    children: [
      {
        type: "link",
        url: "https://example.test/artikel/lain",
        children: [{ type: "text", text: "internal" }],
      },
      {
        type: "link",
        url: "https://ojk.go.id",
        children: [{ type: "text", text: "eksternal" }],
      },
      {
        type: "link",
        url: "javascript:alert(1)",
        children: [{ type: "text", text: "berbahaya" }],
      },
    ],
  },
  { type: "paragraph", children: [{ type: "text", text: "" }] },
  { type: "mystery", children: [] },
];

describe("ArticleBody (REQ-ART-011, REQ-SEC-004, REQ-SEO-021/024)", () => {
  it("renders body headings one level down", () => {
    render(<ArticleBody body={body} siteOrigin={ORIGIN} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Judul bagian" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
  });

  it("keeps internal links relative and marks external links noopener", () => {
    render(<ArticleBody body={body} siteOrigin={ORIGIN} />);
    expect(screen.getByRole("link", { name: "internal" })).toHaveAttribute(
      "href",
      "/artikel/lain",
    );
    const external = screen.getByRole("link", { name: "eksternal" });
    expect(external).toHaveAttribute("rel", "noopener");
    expect(external).not.toHaveAttribute("target");
  });

  it("drops unsafe protocols but keeps the text", () => {
    render(<ArticleBody body={body} siteOrigin={ORIGIN} />);
    expect(screen.queryByRole("link", { name: "berbahaya" })).toBeNull();
    expect(screen.getByText("berbahaya")).toBeInTheDocument();
  });

  it("marks every outbound link sponsored in PR articles", () => {
    render(<ArticleBody body={body} siteOrigin={ORIGIN} sponsored />);
    const external = screen.getByRole("link", { name: /eksternal/ });
    expect(external).toHaveAttribute("rel", "sponsored noopener");
    expect(external).toHaveAttribute("target", "_blank");
  });

  it("skips empty paragraphs and unknown blocks", () => {
    const { container } = render(
      <ArticleBody body={body} siteOrigin={ORIGIN} />,
    );
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });
});
