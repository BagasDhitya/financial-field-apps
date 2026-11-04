"use client";

import "./globals.css";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Last resort when the root layout itself fails. */
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="id">
      <body>
        <main
          style={{
            display: "grid",
            gap: "1.3125rem",
            padding: "3.4375rem 1.3125rem",
            maxWidth: "38rem",
          }}
        >
          <p className="type-label">Financial Field Indonesia</p>
          <h1 style={{ margin: 0 }}>Situs sedang mengalami gangguan</h1>
          <p style={{ margin: 0 }}>Silakan coba lagi beberapa saat lagi.</p>
          <div>
            <button type="button" className="button" onClick={reset}>
              Coba lagi
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
