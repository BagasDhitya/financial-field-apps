import Link from "next/link";

import { isLaterDayWib } from "@/lib/format";
import { routes } from "@/lib/routes";
import type { AuthorSummary } from "@/types";

import { CmsImage } from "../CmsImage/CmsImage";
import { DateTime } from "../DateTime/DateTime";

import styles from "./Byline.module.css";

export type BylineProps = {
  author: AuthorSummary | null;
  reviewer: AuthorSummary | null;
  lastReviewedAt: string | null;
  publishedAt: string | null;
  contentUpdatedAt: string | null;
  readingMinutes: number;
};

function Person({ person, role }: { person: AuthorSummary; role: string }) {
  return (
    <div className={styles.person}>
      {person.avatar ? (
        <span className={styles.avatar}>
          <CmsImage image={person.avatar} sizes="40px" ratio="1/1" decorative />
        </span>
      ) : null}
      <p className={styles.line}>
        <span className={styles.role}>{role} </span>
        <Link href={routes.author(person.slug)} className={styles.name}>
          {person.fullName}
        </Link>
        {person.credentials ? <span>, {person.credentials}</span> : null}
        {person.roleTitle ? (
          <span className={styles.title}> · {person.roleTitle}</span>
        ) : null}
      </p>
    </div>
  );
}

/**
 * Author + CFP reviewer + dates (REQ-ART-002). The reviewer appears only when
 * a fact-check date is recorded; "Diperbarui" only when a day or more after
 * publication.
 */
export function Byline({
  author,
  reviewer,
  lastReviewedAt,
  publishedAt,
  contentUpdatedAt,
  readingMinutes,
}: BylineProps) {
  const showUpdated = isLaterDayWib(publishedAt, contentUpdatedAt);
  return (
    <div className={styles.root}>
      <div className={styles.people}>
        {author ? <Person person={author} role="Ditulis oleh" /> : null}
        {reviewer && lastReviewedAt ? (
          <Person person={reviewer} role="Ditinjau oleh" />
        ) : null}
      </div>
      <p className={`type-meta ${styles.dates}`}>
        {publishedAt ? (
          <span>
            Terbit <DateTime iso={publishedAt} />
          </span>
        ) : null}
        {showUpdated ? (
          <span>
            Diperbarui <DateTime iso={contentUpdatedAt} />
          </span>
        ) : null}
        {reviewer && lastReviewedAt ? (
          <span>
            Ditinjau <DateTime iso={lastReviewedAt} />
          </span>
        ) : null}
        <span>{readingMinutes} menit baca</span>
      </p>
    </div>
  );
}
