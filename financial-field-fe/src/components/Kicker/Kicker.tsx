import Link from "next/link";

import { routes } from "@/lib/routes";
import type { CategorySummary } from "@/types";

import styles from "./Kicker.module.css";

export type PrLabelProps = { size?: "small" | "large" };

/** "PR" in an ink box; the hidden text explains it (REQ-ART-003). */
export function PrLabel({ size = "small" }: PrLabelProps) {
  return (
    <span className={`type-label ${styles.pr} ${styles[size]}`}>
      PR<span className="visually-hidden"> (konten bersponsor)</span>
    </span>
  );
}

export type KickerProps = {
  category: CategorySummary | null;
  isPr?: boolean;
  /** Plain text instead of a link (inside a card whose title is the link). */
  asLink?: boolean;
};

/** Category kicker above a headline, with the PR label when sponsored. */
export function Kicker({ category, isPr = false, asLink = true }: KickerProps) {
  if (!category && !isPr) {
    return null;
  }
  return (
    <p className={styles.root}>
      {isPr ? <PrLabel /> : null}
      {category ? (
        asLink ? (
          <Link
            href={routes.category(category)}
            className={`type-kicker ${styles.link}`}
          >
            {category.name}
          </Link>
        ) : (
          <span className={`type-kicker ${styles.text}`}>{category.name}</span>
        )
      ) : null}
    </p>
  );
}
