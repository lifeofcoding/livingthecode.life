import { db } from "@lib/db";
import { siteConfig } from "@/config/site";
import { NewCategory } from "./NewCategory";
import { Category } from "./Category";
import { NewArticle } from "./NewArticle";
import { Article } from "./Article";
import { EditCategory } from "./EditCategory";
import { EditArticle } from "./EditArticle";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const [category, article] = params.slug;

  if (category == "new") {
    return {
      title: siteConfig.name + " | New Category",
      description: siteConfig.description,
    };
  }

  if (!article) {
    return {
      title: siteConfig.name + " | " + category.replaceAll("-", " "),
      description: siteConfig.description,
    };
  }

  if (article == "new") {
    return {
      title: siteConfig.name + " | New Article",
      description: siteConfig.description,
    };
  } else if (article == "edit") {
    return {
      title: siteConfig.name + " | Edit Article",
      description: siteConfig.description,
    };
  } else {
    if (isNaN(Number(article))) {
      return {
        title: siteConfig.name,
        description: siteConfig.description,
      };
    }
    const page = await db.article.findUnique({
      where: {
        id: Number(article),
      },
    });

    if (!page) {
      return {
        title: siteConfig.name,
        description: siteConfig.description,
      };
    }

    return {
      metadataBase: new URL(siteConfig.url),
      title: `${page.title} | ${siteConfig.name}`,
      description: siteConfig.description,
      openGraph: {
        title: `${page.title} | ${siteConfig.name}`,
        description: siteConfig.description,
        type: "article",
        url: `${siteConfig.url}/categories/${category}/${article}`,
        images: [
          {
            url: `${siteConfig.url}/og.jpg`,
            width: 1200,
            height: 630,
            alt: `${page.title} | ${siteConfig.name}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${page.title} | ${siteConfig.name}`,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og.jpg`],
      },
    };
  }
}

// export async function generateStaticParams() {
//   const categories = await db.category.findMany({
//     select: {
//       title: true,
//     },
//   });

//   const articles = await db.article.findMany({
//     select: {
//       id: true,
//       categories: {
//         select: {
//           title: true,
//         },
//       },
//     },
//   });

//   const params = [
//     ...categories.map((category) => ({
//       slug: [category.title.replaceAll(" ", "-")],
//     })),
//   ];

//   articles.forEach((article) => {
//     article.categories.forEach((category) => {
//       params.push({
//         slug: [category.title.replaceAll(" ", "-"), article.id.toString()],
//       });
//     });
//   });

//   return params;
// }

export default async function Page({ params }: { params: { slug: string[] } }) {
  const [category, article, editArticleFlag] = params.slug;

  if (category == "new") {
    return <NewCategory />;
  }

  if (!article) {
    return <Category category={category} />;
  }

  if (article == "edit") {
    return <EditCategory category={category} />;
  }

  if (article == "new") {
    return <NewArticle category={category} />;
  }

  if (editArticleFlag == "edit") {
    return <EditArticle article={article} />;
  }

  return <Article article={article} />;
}
