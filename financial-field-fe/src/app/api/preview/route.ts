import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/lib/env";
import { routes } from "@/lib/routes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("secret") !== env.previewSecret) {
    return new Response("Invalid token", { status: 401 });
  }

  const slug = searchParams.get("slug");
  if (!slug) return new Response("Missing slug", { status: 400 });

  const draft = await draftMode();
  draft.enable();
  redirect(routes.article(slug));
}
