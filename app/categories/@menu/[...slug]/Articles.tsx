import { db } from "@lib/db";
import Link from "next/link";

export async function Articles({ category }: { category: string }) {
  const searchCategory = category.replaceAll("-", " ");

  const articles = await db.article.findMany({
    where: {
      categories: {
        some: {
          title: { contains: searchCategory, mode: "insensitive" },
        },
      },
    },
    select: {
      id: true,
      title: true,
      categories: {
        take: 1,
      },
    },
  });

  const getCategory = (article: (typeof articles)[0]) => {
    return article.categories[0].title.replaceAll(" ", "-");
  };
  return (
    <div className="pt-2 space-y-1">
      <div className="text-foreground mb-2">Articles:</div>
      {articles.map((article) => (
        <div
          key={article.id}
          className="flex items-center justify-between p-2 text-sm font-semibold text-gray-400  rounded-md cursor-pointer hover:bg-gray-100"
        >
          <Link href={`/categories/${getCategory(article)}/${article.id}`}>
            {article.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
