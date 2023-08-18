import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { PageHero } from "@/components/PageHero";
import { EditArticleForm } from "@/components/EditArticleForm";
import { db } from "@/lib/db";

export async function EditArticle({ article }: { article: string }) {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin) {
    return notFound();
  }

  if (!article || isNaN(Number(article))) {
    return notFound();
  }

  const data = await db.article.findUnique({
    where: {
      id: Number(article),
    },
    select: {
      id: true,
      title: true,
      content: true,
      categories: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  const categories = await db.category.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center">
      <PageHero title="Edit Article" />

      <section className="w-full">
        <EditArticleForm categories={categories} data={data} />
      </section>
    </main>
  );
}
