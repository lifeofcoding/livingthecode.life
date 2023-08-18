import { db } from "@lib/db";
import { NewCategory } from "./NewCategory";
import { Category } from "./Category";
import { NewArticle } from "./NewArticle";
import { Article } from "./Article";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}) {
  const [category, article] = params.slug;

  if (category == "new") {
    return {
      title: "LivingTheCode.Life | New Category",
      description: "A blog about living the code life.",
    };
  }

  if (!article) {
    return {
      title: "LivingTheCode.Life | " + category.replaceAll("-", " "),
      description: "A blog about living the code life.",
    };
  }

  if (article == "new") {
    return {
      title: "LivingTheCode.Life | New Article",
      description: "A blog about living the code life.",
    };
  } else {
    if (isNaN(Number(article))) {
      return {
        title: "LivingTheCode.Life",
        description: "A blog about living the code life.",
      };
    }
    const page = await db.article.findUnique({
      where: {
        id: Number(article),
      },
    });

    if (!page) {
      return {
        title: "LivingTheCode.Life",
        description: "A blog about living the code life.",
      };
    }

    return {
      title: "LivingTheCode.Life | " + page.title,
      description: "A blog about living the code life.",
    };
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const [category, article] = params.slug;

  if (category == "new") {
    return <NewCategory />;
  }

  if (!article) {
    return <Category category={category} />;
  }

  if (article == "new") {
    return <NewArticle category={category} />;
  } else {
    return <Article article={article} />;
  }
}
