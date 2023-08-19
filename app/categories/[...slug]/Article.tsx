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
      author: {
        select: { name: true, email: true, image: true },
      },
      createdAt: true,
    },
  });

  if (!page) {
    return notFound();
  }

  return (
    <div className="relative">
      <div className="font-semibold text-5xl p-5 mb-5 mt-10">{page.title}</div>
      <div className="mx-5 mt-5 p-2 bg-background border-slate-500 border rounded flex items-center">
        <div className="rounded-full mr-2">
          <img
            src={page.author.image}
            alt={page.author.name || page.author.email}
            width="auto"
            height="45"
            className="rounded-full h-10 w-10"
          />
        </div>
        <div className="text-sm">
          Author: {page.author.name || page.author.email} | Published:{" "}
          {new Date(page.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="article px-5 pb-5">
        <Markdown>{page.content}</Markdown>
      </div>

      <div className="w-full fixed bottom-0 h-full z-[-1]">
        <BackgroundCircles />
      </div>
    </div>
  );
}
