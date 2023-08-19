import { BackgroundCircles } from "@/components/BackgroundCircles";
import { Header } from "../components/Header";
import Link from "next/link";
import { db } from "@/lib/db";

// https://stackoverflow.com/questions/74379563/next-js-13-why-isnt-my-root-page-dynamic
export const revalidate = 60 * 60; //1 hour

export default async function Home() {
  const lastestArticles = await db.article.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      categories: {
        take: 1,
      },
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  const getCategory = (article: (typeof lastestArticles)[0]) => {
    return article.categories[0].title.replaceAll(" ", "-");
  };
  const getCategories = (article: (typeof lastestArticles)[0]) => {
    return article.categories.map((category) => category.title).join(", ");
  };
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="container mt-[30vh] flex h-[200vh] flex-col items-center justify-start px-4 py-6">
        <div className="sticky top-20 flex flex-col items-center justify-center gap-12 px-4 py-6">
          <div className="page-bg-gradient absolute z-[-1]"></div>
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Hi, I&apos;m Life<span className="text-purple-500">Of</span>
            Coding<span className="text-hot-pink">.</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/categories"
            >
              <h3 className="text-2xl font-bold">Categories →</h3>
              <div className="text-lg">Software Engineering Topics</div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="about"
            >
              <h3 className="text-2xl font-bold">About Me →</h3>
              <div className="text-lg">
                A little bit about me and my journey
              </div>
            </Link>
          </div>
        </div>
        <div className="z-[-1] fixed w-full h-screen">
          <BackgroundCircles />
        </div>
      </div>

      <div className="relative mt-[-100vh] min-h-screen w-full bg-black/50 text-center text-white backdrop-blur-sm">
        <div className="m-2 container ml-auto mr-auto">
          <h1 className="mb-5 text-2xl">Recent Articles</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {lastestArticles.map((article) => (
              <Link
                href={`/categories/${getCategory(article)}/${article.id}`}
                className="flex justify-center items-center border rounded-sm border-slate-800 aspect-square flex-col"
                key={article.id}
              >
                <div className="w-full p-2 bg-white/50 dark:bg-black/50">
                  {article.title}
                </div>
                <div className="flex-grow p-2 w-full flex justify-center items-center bg-white/40 dark:bg-black/30">
                  <div className="text-xl">{getCategories(article)}</div>
                </div>
                <div className="flex justify-between w-full p-2 bg-white/50 dark:bg-black/50">
                  {article.author.image ? (
                    <div className="flex items-center">
                      {/*  eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={article.author.image}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <div>{article.author.name}</div>
                    </div>
                  ) : null}

                  <div className="text-sm">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
