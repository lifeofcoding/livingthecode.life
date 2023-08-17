import { db } from "@lib/db";
import Link from "next/link";
export default async function Page() {
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
    <div className="pt-2 space-y-1">
      <div className="text-foreground mb-2">Categories:</div>
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex items-center justify-between p-2 text-sm font-semibold text-gray-400  rounded-md cursor-pointer hover:bg-gray-100"
        >
          <Link href={`/categories/${category.title.replaceAll(" ", "-")}`}>
            {category.title}
          </Link>
          <span className="text-xs text-gray-400">
            {category.articles.length}
          </span>
        </div>
      ))}
    </div>
  );
}
