import { db } from "@/lib/db";
import { PageCirclesHero } from "@/components/PageCirclesHero";
import Link from "next/link";
export default async function SearchPage({
  params,
}: {
  params: { searchTerms: string };
}) {
  const articles = await db.article.findMany({
    where: {
      title: {
        // Replace eveyrthing but alphanumeric characters with a space
        contains: params.searchTerms.replaceAll(/[^a-zA-Z0-9]/g, " "),
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      categories: {
        take: 1,
      },
    },
    take: 20,
  });
  const getCategory = (article: (typeof articles)[0]) => {
    return article.categories[0].title.replaceAll(" ", "-");
  };
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title={`Search For ${params.searchTerms}`} />

      <section className="w-full">
        <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Link
              href={`/categories/${getCategory(article)}/${article.id}`}
              key={article.id}
            >
              <div className="border border-foreground rounded p-5 hover:bg-primary">
                {article.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
