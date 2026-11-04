import Link from "next/link";

import styles from "./Pagination.module.css";

export type PaginationProps = {
  page: number;
  pageCount: number;
  /** Builds the URL of a page (path pagination, REQ-SEO-006). */
  hrefFor: (page: number) => string;
};

function pageWindow(page: number, pageCount: number): (number | "gap")[] {
  const pages = new Set([1, pageCount, page - 1, page, page + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);
  return sorted.flatMap((p, index) => {
    const previous = sorted[index - 1];
    return previous !== undefined && p - previous > 1
      ? (["gap", p] as const)
      : [p];
  });
}

/** Crawlable links, never buttons (SPC-ui-design-system §3). */
export function Pagination({ page, pageCount, hrefFor }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }
  return (
    <nav aria-label="Halaman" className={styles.root}>
      <ul className={styles.list}>
        <li>
          {page > 1 ? (
            <Link href={hrefFor(page - 1)} className={styles.step} rel="prev">
              ← Sebelumnya
            </Link>
          ) : (
            <span
              className={`${styles.step} ${styles.disabled}`}
              aria-hidden="true"
            >
              ← Sebelumnya
            </span>
          )}
        </li>
        {pageWindow(page, pageCount).map((item, index) =>
          item === "gap" ? (
            <li key={`gap-${index}`} className={styles.gap} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              {item === page ? (
                <span
                  className={`${styles.page} ${styles.current}`}
                  aria-current="page"
                >
                  <span className="visually-hidden">Halaman </span>
                  {item}
                </span>
              ) : (
                <Link href={hrefFor(item)} className={styles.page}>
                  <span className="visually-hidden">Halaman </span>
                  {item}
                </Link>
              )}
            </li>
          ),
        )}
        <li>
          {page < pageCount ? (
            <Link href={hrefFor(page + 1)} className={styles.step} rel="next">
              Berikutnya →
            </Link>
          ) : (
            <span
              className={`${styles.step} ${styles.disabled}`}
              aria-hidden="true"
            >
              Berikutnya →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
