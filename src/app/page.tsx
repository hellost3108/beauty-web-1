import CmsSections from "@/components/cms/CmsSections";
import { getArticles } from "@/lib/cms/server";
import Index from "@/views/Index";

export default async function Home() {
  const journalPosts = await getArticles("blog");

  return (
    <CmsSections modules={["home"]}>
      <Index journalPosts={journalPosts.slice(0, 8)} />
    </CmsSections>
  );
}
