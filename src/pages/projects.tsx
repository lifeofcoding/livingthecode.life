import { type NextPage } from "next";
import Link from "next/link";
import Layout from "../components/Main";

const Projects: NextPage = () => {
  return (
    <Layout title="Projects">
      <main className="relative z-10 flex min-h-screen flex-col items-center">
        <div className="container min-h-screen gap-12 px-4 py-16">
          <div className="flex h-full min-h-screen flex-col items-center gap-12 rounded bg-gradient-to-b from-transparent to-black/50 px-4 py-16">
            <h1 className="w-full text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Projects
            </h1>
            <div className="w-3/4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
                <Link
                  className="flex  flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href="https://github.com/lifeofcoding/desktop-chatgpt"
                  target="_blank"
                >
                  <h3 className="text-2xl font-bold">ChatGPT Desktop →</h3>
                  <div className="text-lg">
                    A Desktop application built on top of Electron and OpenAi
                    API
                  </div>
                </Link>
                <Link
                  className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                  href="https://github.com/lifeofcoding/AutoNFT"
                  target="_blank"
                >
                  <h3 className="text-2xl font-bold">AutoNFT →</h3>
                  <div className="text-lg">
                    A Web3 application to use AI (StableDiffusion) to generate
                    and mint NFTs
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Projects;
