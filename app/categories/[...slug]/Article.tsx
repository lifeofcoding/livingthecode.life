import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Markdown } from "@/lib/markdown";
import { BackgroundCircles } from "@/components/BackgroundCircles";

export async function Article({ article }: { article: string }) {
  if (!article || isNaN(Number(article))) {
    return notFound();
  }
  const page = await db.article.findUnique({
    where: {
      id: Number(article),
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
    <div className="relative">
      <div className="font-semibold text-5xl p-5 mb-5 mt-10">{page.title}</div>
      <div className="m-5 p-2 bg-background border-foreground border rounded">
        Author: {page.author.name || page.author.email} | Published:{" "}
        {new Date(page.createdAt).toLocaleDateString()}
      </div>
      <div className="article p-5">
        <Markdown>{page.content}</Markdown>
      </div>

      <div className="w-full fixed bottom-0 h-full z-[-1]">
        <BackgroundCircles />
      </div>
    </div>
  );
}
