function requireServerEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. See .env.example.`,
    );
  }
  return value;
}

/** The only module that reads process.env. Lint-enforced — see docs/0001 §6.5. */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  cmsUrl: process.env.CMS_URL ?? "http://localhost:1337",
  cmsPublicUrl: process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337",
  cmsApiToken: process.env.CMS_API_TOKEN ?? "",
  revalidateSecret: requireServerEnv(
    "REVALIDATE_SECRET",
    process.env.REVALIDATE_SECRET,
  ),
  previewSecret: requireServerEnv("PREVIEW_SECRET", process.env.PREVIEW_SECRET),
  skipCmsFetch: process.env.SKIP_CMS_FETCH === "1",
} as const;
