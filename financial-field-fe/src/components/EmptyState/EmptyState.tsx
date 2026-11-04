import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./EmptyState.module.css";

export type EmptyStateProps = {
  title: string;
  children?: ReactNode;
  links?: { label: string; href: string }[];
};

/** Empty listings and error pages: say what happened and offer a way on. */
export function EmptyState({ title, children, links = [] }: EmptyStateProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>
      {children}
      {links.length > 0 ? (
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
