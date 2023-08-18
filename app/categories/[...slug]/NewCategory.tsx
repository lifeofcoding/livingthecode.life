import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/session";

import { NewCategoryForm } from "@/components/NewCategoryForm";
import { db } from "@/lib/db";

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
      <div className="category_header_wrapper relative min-h-[300px] flex flex-col justify-center mt-5">
        <div className="flex min-w-max p-5 text-4xl font-semibold category_header">
          New Gategory
        </div>
      </div>

      <section className="w-full">
        <NewCategoryForm categories={categories} />
      </section>
    </main>
  );
}
