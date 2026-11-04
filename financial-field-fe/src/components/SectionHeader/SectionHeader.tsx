import Link from "next/link";

import styles from "./SectionHeader.module.css";

export type SectionHeaderProps = {
  title: string;
  id?: string;
  href?: string;
  linkLabel?: string;
  as?: "h2" | "h3";
};

/** Tracked uppercase label over a golden divider (B3, I4, I6). */
export function SectionHeader({
  title,
  id,
  href,
  linkLabel = "Lihat semua",
  as: Heading = "h2",
}: SectionHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <Heading id={id} className={`type-label ${styles.title}`}>
          {title}
        </Heading>
        {href ? (
          <Link
            href={href}
            className={styles.more}
            data-track="select_content"
            data-content-type="category_more"
            data-item-id={href}
          >
            {linkLabel}
            <span className="visually-hidden"> {title}</span>
          </Link>
        ) : null}
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </div>
  );
}
