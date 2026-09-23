import { getLatestArticles } from "@/lib/content/articles";
import { getSiteNavigation } from "@/lib/content/navigation";

import { HomeView } from "@/features/home/HomeView";

/** Safety-net window. Keep in sync with REVALIDATE.home. */
export const revalidate = 60;

export default async function Home() {
  const [navigation, latest] = await Promise.all([
    getSiteNavigation(),
    getLatestArticles(),
  ]);

  return <HomeView navigation={navigation} latest={latest} />;
}
