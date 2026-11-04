import { afterEach, describe, expect, it, vi } from "vitest";

import { SeedGuardError, assertSeedAllowed, createClient } from "./client.mjs";

const base = {
  cmsUrl: "http://localhost:1337",
  token: "t",
  siteEnv: "local",
  allowedHosts: undefined,
};

describe("assertSeedAllowed (REQ-SEED-003, AC-S8)", () => {
  it("allows localhost with a token", () => {
    expect(() => assertSeedAllowed(base)).not.toThrow();
    expect(() =>
      assertSeedAllowed({ ...base, cmsUrl: "http://127.0.0.1:1337" }),
    ).not.toThrow();
  });

  it("refuses production, unknown hosts, bad URLs and a missing token", () => {
    expect(() => assertSeedAllowed({ ...base, siteEnv: "production" })).toThrow(
      SeedGuardError,
    );
    expect(() =>
      assertSeedAllowed({ ...base, cmsUrl: "https://cms.example.org" }),
    ).toThrow(/SEED_ALLOWED_HOSTS/);
    expect(() => assertSeedAllowed({ ...base, cmsUrl: "not a url" })).toThrow(
      SeedGuardError,
    );
    expect(() => assertSeedAllowed({ ...base, token: "" })).toThrow(
      /CMS_SEED_TOKEN/,
    );
  });

  it("allows a staging host only when it is listed", () => {
    const staging = {
      ...base,
      cmsUrl: "https://cms-staging.example.org",
      allowedHosts: "cms-staging.example.org",
    };
    expect(() => assertSeedAllowed(staging)).not.toThrow();
  });
});

describe("createClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends no network request in dry-run and logs writes without the token", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const lines = [];
    const client = createClient({
      cmsUrl: "http://localhost:1337",
      token: "secret-token-value",
      dryRun: true,
      log: (l) => lines.push(l),
    });
    const result = await client.upsert("articles", "a", { title: "A" });
    expect(result.created).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(lines.join("\n")).not.toContain("secret-token-value");
  });

  it("creates with an explicit status (a POST without it publishes, DSC-0016)", async () => {
    const calls = [];
    vi.stubGlobal("fetch", async (url, init) => {
      calls.push({ url: String(url), init });
      const body = String(url).includes("filters")
        ? { data: [] }
        : { data: { documentId: "d1" } };
      return new Response(JSON.stringify(body), { status: 200 });
    });
    const client = createClient({
      cmsUrl: "http://localhost:1337",
      token: "t",
    });
    await client.upsert(
      "articles",
      "slug-a",
      { title: "A" },
      { publish: false },
    );
    const post = calls.find((call) => call.init.method === "POST");
    expect(post.url).toBe("http://localhost:1337/api/articles?status=draft");
    expect(JSON.parse(post.init.body)).toEqual({
      data: { title: "A", slug: "slug-a" },
    });
    expect(post.init.headers.Authorization).toBe("Bearer t");
  });

  it("updates an existing document by documentId", async () => {
    const calls = [];
    vi.stubGlobal("fetch", async (url, init) => {
      calls.push({ url: String(url), init });
      const body = String(url).includes("filters")
        ? { data: [{ documentId: "d9" }] }
        : { data: { documentId: "d9" } };
      return new Response(JSON.stringify(body), { status: 200 });
    });
    const client = createClient({
      cmsUrl: "http://localhost:1337",
      token: "t",
    });
    const result = await client.upsert("tags", "pajak", { name: "Pajak" });
    expect(result).toEqual({ documentId: "d9", created: false });
    expect(calls.at(-1).url).toBe(
      "http://localhost:1337/api/tags/d9?status=published",
    );
    expect(calls.at(-1).init.method).toBe("PUT");
  });

  it("raises a readable error on 4xx without echoing the token", async () => {
    vi.stubGlobal(
      "fetch",
      async () =>
        new Response(
          JSON.stringify({ error: { message: "Invalid key faq" } }),
          { status: 400 },
        ),
    );
    const client = createClient({
      cmsUrl: "http://localhost:1337",
      token: "secret-token-value",
    });
    await expect(
      client.request("POST", "/articles?status=draft", { data: {} }),
    ).rejects.toThrow(/400: Invalid key faq/);
    await expect(
      client.request("POST", "/articles?status=draft", { data: {} }),
    ).rejects.not.toThrow(/secret-token-value/);
  });
});
