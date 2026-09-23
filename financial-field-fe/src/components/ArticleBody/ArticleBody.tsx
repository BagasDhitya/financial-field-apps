import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

import type { ArticleBody as ArticleBodyContent } from "@/types";

export type ArticleBodyProps = {
  body: ArticleBodyContent;
};

/** The single sanctioned cast from opaque Blocks JSON to the renderer's type. */
export function ArticleBody({ body }: ArticleBodyProps) {
  return <BlocksRenderer content={body as unknown as BlocksContent} />;
}
