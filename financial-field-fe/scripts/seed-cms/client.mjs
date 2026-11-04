/**
 * Strapi 5 REST writer for the seed (PRP-0002.p1b §4.8, REQ-SEED-003/008).
 * Findings that shape it (DSC-0016): a POST without `status` publishes in
 * Strapi 5.53, so every write passes `status` explicitly; unknown body keys
 * return 400, so callers gate fields by capability.
 */

export class SeedGuardError extends Error {}

/**
 * Throws before any request when the target is not allowed (REQ-SEED-003).
 * @param {{ cmsUrl: string, token: string | undefined, siteEnv: string | undefined, allowedHosts: string | undefined }} env
 */
export function assertSeedAllowed({ cmsUrl, token, siteEnv, allowedHosts }) {
  if (siteEnv === "production") {
    throw new SeedGuardError(
      "Refusing to seed: SITE_ENV=production. Seed content is for local and staging only.",
    );
  }
  let host;
  try {
    host = new URL(cmsUrl).hostname;
  } catch {
    throw new SeedGuardError(`Refusing to seed: invalid CMS_URL.`);
  }
  const allowed = (allowedHosts || "localhost,127.0.0.1")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  if (!allowed.includes(host.toLowerCase())) {
    throw new SeedGuardError(
      `Refusing to seed: host "${host}" is not in SEED_ALLOWED_HOSTS (${allowed.join(", ")}).`,
    );
  }
  if (!token) {
    throw new SeedGuardError(
      "Refusing to seed: CMS_SEED_TOKEN is not set (see RUN-seed-content).",
    );
  }
}

export class CmsWriteError extends Error {
  constructor(method, path, status, message) {
    super(`${method} ${path} → ${status}: ${message}`);
    this.status = status;
  }
}

/**
 * @param {{ cmsUrl: string, token: string, dryRun?: boolean, log?: (line: string) => void }} options
 */
export function createClient({
  cmsUrl,
  token,
  dryRun = false,
  log = () => {},
}) {
  const api = `${cmsUrl.replace(/\/+$/, "")}/api`;
  let fakeId = 0;

  async function request(method, path, body) {
    if (dryRun && method !== "GET") {
      log(`[dry-run] ${method} ${path}`);
      fakeId += 1;
      return { data: { documentId: `dry-${fakeId}`, id: fakeId } };
    }
    if (dryRun) {
      return { data: [] };
    }
    const isForm = body instanceof FormData;
    const response = await fetch(`${api}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(body && !isForm ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
      signal: AbortSignal.timeout(60_000),
    });
    if (response.status === 204) {
      return null;
    }
    const text = await response.text();
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
    if (!response.ok) {
      const message =
        typeof payload === "object" ? (payload?.error?.message ?? text) : text;
      throw new CmsWriteError(
        method,
        path,
        response.status,
        String(message).slice(0, 300),
      );
    }
    return payload;
  }

  /** Every version (draft and published) of a document by slug. */
  async function findBySlug(type, slug) {
    const result = await request(
      "GET",
      `/${type}?filters[slug][$eq]=${encodeURIComponent(slug)}&status=draft&pagination[limit]=1`,
    );
    return result?.data?.[0] ?? null;
  }

  /**
   * Create or update by slug. `publish` false keeps it a draft.
   * @returns {Promise<{ documentId: string, created: boolean }>}
   */
  async function upsert(type, slug, data, { publish = true } = {}) {
    const status = publish ? "published" : "draft";
    const existing = await findBySlug(type, slug);
    if (existing) {
      const result = await request(
        "PUT",
        `/${type}/${existing.documentId}?status=${status}`,
        { data },
      );
      return {
        documentId: result?.data?.documentId ?? existing.documentId,
        created: false,
      };
    }
    const result = await request("POST", `/${type}?status=${status}`, {
      data: { ...data, slug },
    });
    return { documentId: result.data.documentId, created: true };
  }

  /** Uploads once; later runs reuse the file with the same name. */
  async function ensureFile(name, bytes, alternativeText) {
    const existing = await request(
      "GET",
      `/upload/files?filters[name][$eq]=${encodeURIComponent(name)}`,
    );
    if (Array.isArray(existing) && existing.length > 0) {
      return { id: existing[0].id, created: false };
    }
    const form = new FormData();
    form.append("files", new Blob([bytes], { type: "image/png" }), name);
    form.append("fileInfo", JSON.stringify({ name, alternativeText }));
    const result = await request("POST", "/upload", form);
    const file = Array.isArray(result) ? result[0] : result?.data;
    return { id: file.id, created: true };
  }

  return {
    request,
    findBySlug,
    upsert,
    ensureFile,
    remove: (type, documentId) => request("DELETE", `/${type}/${documentId}`),
    removeFile: (id) => request("DELETE", `/upload/files/${id}`),
  };
}
