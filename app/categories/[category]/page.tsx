import { db } from "@/lib/db";
import { notFound } from "next/navigation";
// import { HomeHero } from "@/components/HomeHero";
import { Markdown } from "@/lib/markdown";
import { PageHero } from "@/components/PageHero";

export default async function Categories({
  params,
}: {
  params: { category: string };
}) {
  const category = await db.category.findMany({
    where: {
      title: {
        contains: params.category.replaceAll("-", " "),
        mode: "insensitive",
      },
    },
    take: 1,
  });

  if (category.length === 0) {
    return notFound();
  }

  const result = category[0];
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
