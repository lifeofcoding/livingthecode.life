import { db } from "@lib/db";
import Link from "next/link";
export async function Categories() {
  const categories = await db.category.findMany({
    select: {
      id: true,
      title: true,
      articles: {
        select: {
          id: true,
        },
      },
    },
  });
  return (
    <div className="pt-2 pr-2 space-y-1">
      <div className="text-foreground mb-2">Categories:</div>
      {categories.map((category) => (
        <Link
          href={`/categories/${category.title.replaceAll(" ", "-")}`}
          key={category.id}
        >
          <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-400  rounded-md cursor-pointer hover:bg-primary dark:hover:text-white group">
            {category.title}

            <span className="text-xs text-gray-400 group-hover:dark:text-white">
              {category.articles.length}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
