import { Header } from "@components/Header";

import { Suspense } from "react";

import { ChevronLeftSquare } from "lucide-react";

export default async function CategoriesLayout({
  children, // will be a page or nested layout
  menu, // will be a component
}: {
  children: React.ReactNode;
  menu: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="bg-background/70 hover:bg-background/90 md:hover:bg-transparent md:bg-transparent fixed top-14 z-30 ml-2 max-w-[220px] translate-x-[-102%] hover:translate-x-[calc(-1*2rem)] md:hover:translate-x-0 transition-transform  md:translate-x-0 h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block after:content-['>>'] md:after:hidden after:absolute after:top-[30vh] after:right-0 after:rounded-full after:h-10 after:w-10 after:flex after:justify-center after:items-center">
          <Suspense fallback={<div>Loading...</div>}>{menu}</Suspense>
        </aside>

        <section className="pl-5 md:pl-auto">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </section>
      </div>
    </main>
  );
}
