import { routes } from "@/lib/routes";
import type { EditorialStatus } from "@/types";

import styles from "./PreviewBanner.module.css";

export const EDITORIAL_STATUS_LABELS: Record<EditorialStatus, string> = {
  draft: "Draf",
  submitted: "Menunggu review",
  changes_requested: "Perlu revisi",
  fact_checked: "Sudah dicek CFP",
  approved: "Disetujui, belum terbit",
  rejected: "Ditolak",
};

export type PreviewBannerProps = {
  status: EditorialStatus | null;
  slug: string;
};

/** Draft mode only (REQ-ART-010). Shows the approval state; never public. */
export function PreviewBanner({ status, slug }: PreviewBannerProps) {
  return (
    <div className={styles.root} role="status">
      <p className={styles.text}>
        <strong className="type-label">Pratinjau</strong>
        <span>
          Status: {status ? EDITORIAL_STATUS_LABELS[status] : "tidak tersedia"}
        </span>
      </p>
      <a
        className={styles.exit}
        href={`${routes.exitPreview()}?slug=${encodeURIComponent(slug)}`}
      >
        Keluar dari pratinjau
      </a>
    </div>
  );
}
