import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import { NewArticleForm } from "@/components/NewArticleForm";
import { db } from "@/lib/db";
import { PageHero } from "@/components/PageHero";

export async function NewArticle({ category }: { category: string }) {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    return notFound();
  }

  const categories = await db.category.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  const result = await db.category.findMany({
    where: {
      title: {
        contains: category.replaceAll("-", " "),
        mode: "insensitive",
      },
    },
    take: 1,
    select: {
      id: true,
    },
  });

  let categoryId = 0;
  if (result.length) {
    categoryId = result[0].id;
  }
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center">
      <PageHero title="New Article" />

      <section className="w-full">
        <NewArticleForm
          categories={categories}
          currentCategoryId={categoryId}
        />
      </section>
    </main>
  );
}
