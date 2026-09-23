import { env } from "@/lib/env";
import type { MediaAsset } from "@/types";

import type { StrapiMedia } from "../strapi-types";

const RENDERABLE_IMAGE = /^image\//;

/**
 * The local upload provider returns paths like "/uploads/foo.jpg"; an external
 * provider returns absolute URLs. Both must resolve.
 */
export function resolveMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${env.cmsPublicUrl}${url}`;
}

/**
 * featured_image and avatar accept images, files, video, and audio in the CMS.
 * Anything that is not an image is dropped so callers can assume MediaAsset is
 * safe to hand to next/image.
 */
export function mapMedia(
  file: StrapiMedia | null | undefined,
): MediaAsset | null {
  const mime = file?.mime ?? "";
  if (!file?.url || !RENDERABLE_IMAGE.test(mime)) return null;

  return {
    url: resolveMediaUrl(file.url),
    alternativeText: file.alternativeText ?? null,
    width: file.width ?? null,
    height: file.height ?? null,
    mime,
  };
}
