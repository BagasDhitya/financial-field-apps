import { CmsImage } from "@/components/CmsImage/CmsImage";
import { routes } from "@/lib/routes";
import type { ArticleSummary, Author } from "@/types";

export type AuthorViewProps = {
  author: Author;
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

export function AuthorView({ author }: AuthorViewProps) {
  return (
    <main>
      {author.avatar ? <CmsImage image={author.avatar} /> : null}
      <h1>{author.fullName}</h1>
      {author.roleTitle ? <p>{author.roleTitle}</p> : null}
      {author.bio ? <p>{author.bio}</p> : null}

      <h2>Written</h2>
      <ArticleList articles={author.writtenArticles} />

      <h2>Supervised</h2>
      <ArticleList articles={author.supervisedArticles} />
    </main>
  );
}
