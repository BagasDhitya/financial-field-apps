import { routes } from "@/lib/routes";
import type { ArticleSummary, Category } from "@/types";

export type CategoryViewProps = {
  category: Category;
};

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

export function CategoryView({ category }: CategoryViewProps) {
  return (
    <main>
      <h1>{category.name}</h1>
      {category.parent ? (
        <p>
          Parent:{" "}
          <a href={routes.category(category.parent.slug)}>
            {category.parent.name}
          </a>
        </p>
      ) : null}

      <h2>Children</h2>
      <ul>
        {category.children.map((child) => (
          <li key={child.id}>
            <a href={routes.category(child.slug)}>{child.name}</a>
          </li>
        ))}
      </ul>

      <h2>In this section</h2>
      <ArticleList articles={category.articlesInSection} />

      <h2>Also mentioned</h2>
      <ArticleList articles={category.articlesMentioning} />
    </main>
  );
}
