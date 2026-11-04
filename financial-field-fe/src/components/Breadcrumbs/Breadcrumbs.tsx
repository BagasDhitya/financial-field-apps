import Link from "next/link";

import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = { label: string; href: string };

export type BreadcrumbsProps = { items: BreadcrumbItem[] };

/** Visible trail; the JSON-LD BreadcrumbList mirrors it (REQ-SEO-004/032). */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length < 2) {
    return null;
  }
  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className={styles.item}>
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
