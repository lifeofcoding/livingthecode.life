import { Header } from "@components/Header";

import { Suspense } from "react";

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
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <Suspense fallback={<div>Loading...</div>}>{menu}</Suspense>
        </aside>

        <section>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </section>
      </div>
    </main>
  );
}
