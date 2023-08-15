import { BackgroundCircles } from "@/components/BackgroundCircles";
import { PageCirclesHero } from "@/components/PageCirclesHero";
import { db } from "@/lib/db";
import Link from "next/link";
export default async function Categories() {
  const categories = await db.category.findMany({
    take: 10,
  });
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title="Categories" />

      <section className="w-full">
        <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              href={`/categories/${category.title.replaceAll(" ", "-")}`}
              key={category.id}
            >
              <div className="border border-foreground rounded p-5 hover:bg-primary">
                {category.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
