import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Markdown } from "@/lib/markdown";
import { BackgroundCircles } from "@/components/BackgroundCircles";

type PageParams = {
  params: { article: string };
};

export async function generateMetadata({ params }: PageParams) {
  const page = await db.article.findUnique({
    where: {
      id: Number(params.article),
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

export default async function Page({ params }: PageParams) {
  if (!params.article || isNaN(Number(params.article))) {
    return notFound();
  }
  const page = await db.article.findUnique({
    where: {
      id: Number(params.article),
    },
    select: {
      title: true,
      content: true,
      author: true,
      createdAt: true,
    },
  });

  if (!page) {
    return notFound();
  }

  return (
    <div className="">
      <div className="font-semibold text-5xl p-5 mt-10">{page.title}</div>
      <div className="p-5 bg-background border-foreground border rounded">
        Author: {page.author.name || page.author.email} | Published:{" "}
        {new Date(page.createdAt).toLocaleDateString()}
      </div>
      <div className="article space-y-10 p-5">
        <Markdown>{page.content}</Markdown>
      </div>
      <BackgroundCircles />
    </div>
  );
}
