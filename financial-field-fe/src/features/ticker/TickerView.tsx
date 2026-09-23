import { routes } from "@/lib/routes";
import type { StockTicker } from "@/types";

export type TickerViewProps = {
  ticker: StockTicker;
};

export function TickerView({ ticker }: TickerViewProps) {
  return (
    <main>
      <h1>{ticker.symbol}</h1>
      <p>{ticker.companyName}</p>
      <ul>
        {ticker.articles.map((article) => (
          <li key={article.id}>
            <a href={routes.article(article.slug)}>{article.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
