import { routes } from "@/lib/routes";
import type { Tag } from "@/types";

export type TagViewProps = {
  tag: Tag;
};

export function TagView({ tag }: TagViewProps) {
  return (
    <main>
      <h1>{tag.name}</h1>
      <ul>
        {tag.articles.map((article) => (
          <li key={article.id}>
            <a href={routes.article(article.slug)}>{article.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
