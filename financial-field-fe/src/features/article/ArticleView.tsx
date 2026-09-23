import { ArticleBody } from "@/components/ArticleBody/ArticleBody";
import { CmsImage } from "@/components/CmsImage/CmsImage";
import { routes } from "@/lib/routes";
import type { Article } from "@/types";

export type ArticleViewProps = {
  article: Article;
};

export function ArticleView({ article }: ArticleViewProps) {
  return (
    <article>
      <p>{article.articleType}</p>
      <h1>{article.title}</h1>
      {article.leadText ? <p>{article.leadText}</p> : null}

      {article.featuredImage ? (
        <CmsImage image={article.featuredImage} />
      ) : null}

      {article.author ? (
        <p>
          Author:{" "}
          <a href={routes.author(article.author.slug)}>
            {article.author.fullName}
          </a>
        </p>
      ) : null}

      {article.reviewer ? (
        <p>
          Reviewer:{" "}
          <a href={routes.author(article.reviewer.slug)}>
            {article.reviewer.fullName}
          </a>
        </p>
      ) : null}

      {article.primaryCategory ? (
        <p>
          Section:{" "}
          <a href={routes.category(article.primaryCategory.slug)}>
            {article.primaryCategory.name}
          </a>
        </p>
      ) : null}

      <ul>
        {article.categories.map((category) => (
          <li key={category.id}>
            <a href={routes.category(category.slug)}>{category.name}</a>
          </li>
        ))}
      </ul>

      <ul>
        {article.tags.map((tag) => (
          <li key={tag.id}>
            <a href={routes.tag(tag.slug)}>{tag.name}</a>
          </li>
        ))}
      </ul>

      <ul>
        {article.stocksMentioned.map((stock) => (
          <li key={stock.id}>
            <a href={routes.ticker(stock.symbol)}>{stock.symbol}</a>
          </li>
        ))}
      </ul>

      <ArticleBody body={article.body} />
    </article>
  );
}
