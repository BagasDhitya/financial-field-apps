// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { summary } from "@/components/__fixtures__/domain";

import { ArticleCard } from "./ArticleCard";

describe("ArticleCard", () => {
  it("names the card by its title link (REQ-A11Y-010)", () => {
    render(<ArticleCard article={summary()} />);
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toContain(
      "/artikel/cara-menghitung-pajak-penghasilan",
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Cara menghitung pajak penghasilan",
    );
  });

  it("labels PR articles (REQ-ART-003)", () => {
    render(<ArticleCard article={summary({ articleType: "pr_article" })} />);
    expect(screen.getByText("PR")).toBeInTheDocument();
    expect(screen.getByText("(konten bersponsor)")).toBeInTheDocument();
  });

  it("renders without image, author or category (AC21)", () => {
    render(
      <ArticleCard
        article={summary({
          featuredImage: null,
          author: null,
          primaryCategory: null,
        })}
      />,
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders nothing without a slug", () => {
    const { container } = render(
      <ArticleCard article={summary({ slug: "" })} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});
