import { BackgroundCircles } from "@/components/BackgroundCircles";
import { Header } from "../components/Header";
import Link from "next/link";
import { db } from "@/lib/db";

export const revalidate = 60 * 60; //1 hour

export default async function Home() {
  const lastestArticles = await db.article.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      categories: {
        take: 1,
      },
    },
  });
  const getCategory = (article: (typeof lastestArticles)[0]) => {
    return article.categories[0].title.replaceAll(" ", "-");
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

      <div className="relative mt-[-100vh] min-h-screen w-full bg-black/50 text-center text-white">
        <div className="m-2 container ml-auto mr-auto">
          <h1 className="mb-5 text-2xl">Recent Articles</h1>

          <div>
            {lastestArticles.map((article) => (
              <div key={article.id} className="mb-5">
                <Link
                  href={`/categories/${getCategory(article)}/${article.id}`}
                >
                  {article.title}
                </Link>
              </div>
            ))}
          </div>
          {/* <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="group relative border border-red-400">
              <a
                href="https://github.com/lifeofcoding/desktop-chatgpt"
                target="_blank"
                rel="noreferrer"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:!opacity-100">
                  <p>Desktop ChatGPT</p>
                </div>
              </a>
            </div>
            <div className="group relative border border-red-400">
              <a
                href="https://github.com/lifeofcoding/AutoNFT"
                target="_blank"
                rel="noreferrer"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:!opacity-100">
                  <p>AutoNFT</p>
                </div>
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
}
