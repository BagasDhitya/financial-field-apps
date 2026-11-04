import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Constant-time string comparison (REQ-SEC-002/003). Hashing first gives both
 * sides the same length, so the comparison time does not leak the length.
 */
export function safeEqual(
  received: string | null | undefined,
  expected: string,
): boolean {
  if (!received || !expected) {
    return false;
  }
  const a = createHash("sha256").update(received).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/** Slugs are lowercase ASCII words joined by hyphens. */
export function isValidSlug(value: string | null | undefined): value is string {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}
