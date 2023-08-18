import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import { EditCategoryForm } from "@/components/EditCategoryForm";
import { db } from "@/lib/db";
import { PageHero } from "@/components/PageHero";

export async function EditCategory({ category }: { category: string }) {
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
  });

  if (result.length === 0) {
    return notFound();
  }

  const data = result[0];
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center">
      <PageHero title="Edit Category" />

      <section className="w-full">
        <EditCategoryForm categories={categories} data={data} />
      </section>
    </main>
  );
}
