import { serverClient } from "@/app/_trpc/serverClient";
import Chat from "./Chat";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { Footer } from "@components/Footer";
import { BackgroundCircles } from "@/components/BackgroundCircles";

export const dynamic = "force-dynamic";
export default async function Page() {
  // const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  // await sleep(5000);
  const token = await serverClient.getChatToken();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      {/* <div className="container flex-1 flex items-end md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"> */}
      <div className="container grid flex-1 items-start md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar>History</Sidebar>

        <section className="relative flex h-full">
          <div className="pl-3 md:pl-auto flex w-full h-full items-end">
            <Chat initialToken={token} />
          </div>
          <div className="absolute bottom-0">
            <BackgroundCircles className="z-[-1] fixed bottom-0" />
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
