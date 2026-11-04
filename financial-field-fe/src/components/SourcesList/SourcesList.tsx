import type { Source } from "@/types";

import { DateTime } from "../DateTime/DateTime";

import styles from "./SourcesList.module.css";

export type SourcesListProps = { sources: Source[] };

/** "Sumber": every number cites a source (REQ-ART-005, REQ-GEO-005). */
export function SourcesList({ sources }: SourcesListProps) {
  if (sources.length === 0) {
    return null;
  }
  return (
    <section className={styles.root} aria-labelledby="sumber">
      <h2 id="sumber" className={`type-label ${styles.label}`}>
        Sumber
      </h2>
      <ol className={styles.list}>
        {sources.map((source) => (
          <li key={`${source.title}-${source.url ?? ""}`}>
            {source.publisher ? <span>{source.publisher}. </span> : null}
            {source.url ? (
              <a href={source.url} rel="noopener">
                {source.title}
              </a>
            ) : (
              <cite>{source.title}</cite>
            )}
            {source.accessedOn ? (
              <span className={styles.accessed}>
                {" "}
                (diakses <DateTime iso={source.accessedOn} />)
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
