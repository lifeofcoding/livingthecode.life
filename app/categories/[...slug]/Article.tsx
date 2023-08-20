import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { Markdown } from "@/lib/markdown";
import Link from "next/link";
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
        select: { name: true, image: true },
      },
      categories: {
        select: {
          id: true,
          title: true,
        },
      },
      createdAt: true,
    },
  });

  if (!page) {
    return notFound();
  }

  return (
    <div className="relative">
      <div className="font-semibold text-4xl md:text-5xl p-5 mb-5 mt-10">
        {page.title}
      </div>
      <div className="mx-5 mt-5 p-2 bg-background border-slate-500 border rounded flex items-center">
        {page.author.image ? (
          <div className="rounded-full mr-2 min-w-max">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.author.image}
              alt={page.author.name}
              width="auto"
              height="45"
              className="rounded-full h-10 w-10"
            />
          </div>
        ) : null}
        <div className="text-sm">
          Author: {page.author.name} | Published:{" "}
          {new Date(page.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="flex flex-wrap max-w-md py-5 mx-5 gap-2 items-center">
        {page.categories.map((category) => (
          <Link
            href={`/categories/${category.title.replaceAll(" ", "-")}`}
            key={category.id}
          >
            <div className="bg-primary rounded-md p-2 text-sm h-full flex items-center justify-center">
              <span>{category.title}</span>
            </div>
          </Link>
        ))}
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
