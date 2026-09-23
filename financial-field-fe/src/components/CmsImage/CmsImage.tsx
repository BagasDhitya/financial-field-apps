import Image from "next/image";

import type { MediaAsset } from "@/types";

export type CmsImageProps = {
  image: MediaAsset;
};

export function CmsImage({ image }: CmsImageProps) {
  return (
    <Image
      src={image.url}
      alt={image.alternativeText ?? ""}
      width={image.width ?? 1200}
      height={image.height ?? 630}
    />
  );
}
