import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export type OgCardInput = {
  /** Article title; omitted for the default brand card. */
  title?: string;
  /** Category label shown as a kicker. */
  kicker?: string | null;
};

const INK = "#030303";
const FF_BLUE = "#003aa0";

/** Long titles step down in size so they always fit three or four lines. */
function titleSize(title: string): number {
  if (title.length > 90) {
    return 52;
  }
  if (title.length > 60) {
    return 62;
  }
  return 72;
}

/**
 * The social card (SPC-seo §7, T44): paper, ink frame, 21 px FF-blue stroke,
 * stacked wordmark. Sharp edges throughout (I1). Without a title it is the
 * default brand card.
 */
export function renderOgCard({
  title,
  kicker,
}: OgCardInput = {}): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#ffffff",
        padding: 34,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          border: `3px solid ${INK}`,
          borderLeft: `21px solid ${FF_BLUE}`,
          padding: 55,
        }}
      >
        {title ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {kicker ? (
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: FF_BLUE,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                }}
              >
                {kicker}
              </div>
            ) : null}
            <div
              style={{
                fontSize: titleSize(title),
                fontWeight: 700,
                color: INK,
                lineHeight: 1.12,
                marginTop: 13,
              }}
            >
              {title.length > 140 ? `${title.slice(0, 137)}…` : title}
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 96,
                fontWeight: 700,
                color: INK,
                letterSpacing: -2,
              }}
            >
              Financial Field
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: FF_BLUE,
                letterSpacing: 18,
                marginTop: 8,
              }}
            >
              INDONESIA
            </div>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title ? 30 : 34,
              color: "rgba(3,3,3,0.82)",
            }}
          >
            {title
              ? "Financial Field Indonesia"
              : "Artikel dan panduan keuangan pribadi"}
          </div>
        </div>
      </div>
    </div>,
    OG_SIZE,
  );
}
