import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import { NewCategoryForm } from "@/components/NewCategoryForm";
import { db } from "@/lib/db";
import { PageHero } from "@/components/PageHero";

export async function NewCategory() {
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

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center">
      <PageHero title="New Category" />

      <section className="w-full">
        <NewCategoryForm categories={categories} />
      </section>
    </main>
  );
}
