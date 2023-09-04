import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";

import { Suspense } from "react";

// Have to do this because main pages loading state will show for both parallel routes before their individal loading states show see: https://github.com/vercel/next.js/issues/49243
import Loading from "./_loading";
import { Footer } from "@components/Footer";

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
        <Sidebar>
          <Suspense fallback={<div>Loading...</div>}>
            {menu ? menu : null}
          </Suspense>
        </Sidebar>

        <section className="pl-3 md:pl-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </section>
      </div>

      <Footer />
    </main>
  );
}
