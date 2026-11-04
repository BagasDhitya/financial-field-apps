import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { Container } from "@/components/Container/Container";
import { SectionHeader } from "@/components/SectionHeader/SectionHeader";
import type { StockTicker } from "@/types";

import styles from "./TickerView.module.css";

export type TickerViewProps = { ticker: StockTicker };

/** Hidden, noindex until OQ-16 decides whether ticker pages are in scope. */
export function TickerView({ ticker }: TickerViewProps) {
  return (
    <Container className={styles.root}>
      <h1 className={styles.title}>
        {ticker.symbol}
        {ticker.companyName ? (
          <span className={styles.company}> · {ticker.companyName}</span>
        ) : null}
      </h1>
      <SectionHeader title="Artikel terkait" />
      <ul className={styles.grid}>
        {ticker.articles.map((article) => (
          <li key={article.id}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
