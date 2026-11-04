import type { FaqItem } from "@/types";

import styles from "./FaqList.module.css";

export type FaqListProps = { items: FaqItem[] };

/**
 * Every answer is in the HTML (REQ-ART-004). Disclosure via native
 * details/summary: keyboard and screen-reader support for free.
 */
export function FaqList({ items }: FaqListProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <section className={styles.root} aria-labelledby="faq">
      <h2 id="faq" className={styles.heading}>
        Pertanyaan yang sering diajukan
      </h2>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary className={styles.question}>{item.question}</summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
