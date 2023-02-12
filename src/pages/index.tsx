import { type NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
// import { signIn, signOut, useSession } from "next-auth/react";

import Layout from "../components/Main";
// import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <Layout title="Home">
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="container mt-[30vh] flex h-[200vh] flex-col items-center justify-start px-4 py-6">
          <div className="sticky top-20 flex flex-col items-center justify-center gap-12 px-4 py-6">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hi, I&apos;m Life<span className="text-hot-pink">Of</span>
              Coding
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="about"
              >
                <h3 className="text-2xl font-bold">About Me →</h3>
                <div className="text-lg">A little about me and my goals</div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="projects"
              >
                <h3 className="text-2xl font-bold">Projects →</h3>
                <div className="text-lg">
                  Checkout what kind of projects I&aps;ve been working on
                  lately.
                </div>
              </Link>
            </div>
            {/* <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div> */}
          </div>
        </div>
        <div className="relative mt-[-100vh] min-h-screen w-full bg-black/50 text-center text-white">
          <div className="m-2">
            <h1 className="mb-5 text-2xl">Showcase</h1>

            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="group relative">
                <a
                  href="https://github.com/lifeofcoding/desktop-chatgpt"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/desktop-chatgpt.png"
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    alt="Desktop ChatGPT"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:!opacity-100">
                    <p>Desktop ChatGPT</p>
                  </div>
                </a>
              </div>
              <div className="group relative">
                <a
                  href="https://github.com/lifeofcoding/AutoNFT"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/autonft.png"
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt="Auto NFT"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:!opacity-100">
                    <p>AutoNFT</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => signOut() : () => signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
