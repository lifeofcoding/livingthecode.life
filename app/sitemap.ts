import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { env } from "@/env.mjs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const map: { url: string; lastModified: Date }[] = [
    {
      url: `${env.NEXT_PUBLIC_APP_URL}`,
      lastModified: new Date(),
    },
    {
      url: `${env.NEXT_PUBLIC_APP_URL}categories`,
      lastModified: new Date(),
    },
    {
      url: `${env.NEXT_PUBLIC_APP_URL}about`,
      lastModified: new Date(),
    },
  ];
  const categories = await db.category.findMany({
    select: {
      title: true,
    },
  });

  categories.forEach((category) => {
    map.push({
      url: `${env.NEXT_PUBLIC_APP_URL}categories/${category.title.replaceAll(
        " ",
        "-"
      )}`,
      lastModified: new Date(),
    });
  });

  const articles = await db.article.findMany({
    select: {
      id: true,
      categories: {
        select: {
          title: true,
        },
      },
    },
  });

  /* Time complexity: O(n * m) */
  articles.forEach((article) => {
    article.categories.forEach((category) => {
      map.push({
        url: `${env.NEXT_PUBLIC_APP_URL}categories/${category.title.replaceAll(
          " ",
          "-"
        )}/${article.id}`,
        lastModified: new Date(),
      });
    });
  });

  return map;
}
