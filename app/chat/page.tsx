import { serverClient } from "@/app/_trpc/serverClient";
import Chat from "./Chat";
import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { Footer } from "@components/Footer";

export default async function Page() {
  // const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
  // await sleep(5000);
  const token = await serverClient.getChatToken();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <Sidebar>History</Sidebar>

        <section className="pl-3 md:pl-auto flex w-full h-full">
          <Chat initialToken={token} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
