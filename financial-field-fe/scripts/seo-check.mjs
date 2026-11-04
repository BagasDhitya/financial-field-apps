/**
 * SEO validation (PRP-0002.p1.T46, AC7–AC9). Crawls the sitemap of a running
 * site plus a seed list and asserts, per URL: 200, title ≤ 70, description
 * 50–160, exactly one <h1>, absolute self-canonical, no noindex, parseable
 * JSON-LD with an @graph, and OG basics. Exit code 1 on any failure.
 *
 * Usage: node scripts/seo-check.mjs [baseUrl]   (default http://localhost:3100)
 */
const BASE = (
  process.argv[2] ??
  process.env.SEO_CHECK_BASE_URL ??
  "http://localhost:3100"
).replace(/\/+$/, "");
const SEED = ["/", "/terbaru"];

const problems = [];

function attr(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "manual" });
  return { status: response.status, text: await response.text() };
}

async function sitemapUrls() {
  const index = await fetchText(`${BASE}/sitemap.xml`);
  if (index.status !== 200) {
    problems.push(`sitemap.xml returned ${index.status}`);
    return [];
  }
  const files = [...index.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1],
  );
  const urls = [];
  for (const file of files) {
    const local = file.replace(/^https?:\/\/[^/]+/, BASE);
    const body = await fetchText(local);
    if (body.status !== 200) {
      problems.push(`${file} returned ${body.status}`);
      continue;
    }
    urls.push(
      ...[...body.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]),
    );
  }
  return urls;
}

function check(path, status, html) {
  const fail = (message) => problems.push(`${path}: ${message}`);
  if (status !== 200) {
    fail(`status ${status}`);
    return;
  }
  const title = decode(attr(html, /<title>([^<]*)<\/title>/) ?? "");
  if (!title) {
    fail("missing <title>");
  }
  if (title.length > 70) {
    fail(`title is ${title.length} chars`);
  }

  const description = decode(
    attr(html, /<meta name="description" content="([^"]*)"/) ?? "",
  );
  if (description.length < 50 || description.length > 160) {
    fail(`description is ${description.length} chars`);
  }

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) {
    fail(`${h1} <h1> elements`);
  }

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical?.startsWith("http")) {
    fail("missing absolute canonical");
  } else if (new URL(canonical).pathname !== path.split("?")[0]) {
    fail(`canonical points to ${canonical}`);
  }

  if (/<meta name="robots" content="[^"]*noindex/.test(html)) {
    fail("noindex page listed in sitemap");
  }

  for (const property of ["og:title", "og:url", "og:image", "og:locale"]) {
    if (!html.includes(`property="${property}"`)) {
      fail(`missing ${property}`);
    }
  }

  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ];
  if (blocks.length === 0) {
    fail("no JSON-LD");
  }
  for (const block of blocks) {
    try {
      const data = JSON.parse(block[1]);
      if (!Array.isArray(data["@graph"]) || data["@graph"].length === 0) {
        fail("JSON-LD without @graph");
      }
    } catch (error) {
      fail(`invalid JSON-LD (${error.message})`);
    }
  }
}

const urls = [
  ...new Set([
    ...SEED.map((path) => `${BASE}${path}`),
    ...(await sitemapUrls()),
  ]),
];
for (const url of urls) {
  const path = url.replace(/^https?:\/\/[^/]+/, "") || "/";
  const { status, text } = await fetchText(`${BASE}${path}`);
  check(path, status, text);
}

console.log(`seo-check: ${urls.length} URLs checked against ${BASE}`);
if (problems.length > 0) {
  console.error(problems.map((problem) => `  ✗ ${problem}`).join("\n"));
  process.exit(1);
}
console.log("seo-check: all URLs pass");
