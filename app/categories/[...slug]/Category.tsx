import { db } from "@/lib/db";
import { notFound } from "next/navigation";
// import { HomeHero } from "@/components/HomeHero";
import { Markdown } from "@/lib/markdown";
import { PageHero } from "@/components/PageHero";

export async function Category({ category }: { category: string }) {
  const categories = await db.category.findMany({
    where: {
      title: {
        contains: category.replaceAll("-", " "),
        mode: "insensitive",
      },
    },
    take: 1,
  });

  if (categories.length === 0) {
    return notFound();
  }

  const result = categories[0];
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero title={result.title} />
      {/* <HomeHero title={result.title} /> */}

      <section className="w-full">
        <Markdown>{result.content}</Markdown>
      </section>
    </main>
  );
}
