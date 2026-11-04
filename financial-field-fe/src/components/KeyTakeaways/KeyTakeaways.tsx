import styles from "./KeyTakeaways.module.css";

export type KeyTakeawaysProps = { items: string[] };

/** "Poin penting": the answer-first summary (REQ-GEO-001). */
export function KeyTakeaways({ items }: KeyTakeawaysProps) {
  if (items.length === 0) {
    return null;
  }
  return (
    <section className={styles.root} aria-labelledby="poin-penting">
      <h2 id="poin-penting" className={`type-label ${styles.label}`}>
        Poin penting
      </h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
