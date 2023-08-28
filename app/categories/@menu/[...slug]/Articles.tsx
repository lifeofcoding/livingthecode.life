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
    orderBy: {
      createdAt: "desc",
    },
  });

  const getCategory = (article: (typeof articles)[0]) => {
    return article.categories[0].title.replaceAll(" ", "-");
  };
  return (
    <div className="pt-2 pr-2 space-y-1">
      <div className="text-foreground mb-2">Articles:</div>
      {articles.map((article) => (
        <Link
          href={`/categories/${getCategory(article)}/${article.id}`}
          key={article.id}
        >
          <div className="flex items-center justify-between p-2 text-sm font-semibold text-gray-400  rounded-md cursor-pointer hover:bg-primary dark:hover:text-white">
            {article.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
