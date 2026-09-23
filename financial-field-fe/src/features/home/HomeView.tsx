import { routes } from "@/lib/routes";
import type { ArticleSummary, MenuItem, SiteNavigation } from "@/types";

export type HomeViewProps = {
  navigation: SiteNavigation;
  latest: ArticleSummary[];
};

function menuHref(item: MenuItem): string | null {
  if (item.url) return item.url;
  if (item.category?.slug) return routes.category(item.category.slug);
  return null;
}

function ArticleList({ articles }: { articles: ArticleSummary[] }) {
  if (articles.length === 0) return <p>None yet.</p>;

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <a href={routes.article(article.slug)}>{article.title}</a>
        </li>
      ))}
    </ul>
  );
}

export function HomeView({ navigation, latest }: HomeViewProps) {
  return (
    <main>
      <nav>
        <ul>
          {navigation.menuItems.map((item) => {
            const href = menuHref(item);
            return (
              <li key={`${item.label}-${href ?? "none"}`}>
                {href ? <a href={href}>{item.label}</a> : item.label}
              </li>
            );
          })}
        </ul>
      </nav>

      <h1>Featured</h1>
      <ArticleList articles={navigation.featuredArticles} />

      <h1>Latest</h1>
      <ArticleList articles={latest} />
    </main>
  );
}
