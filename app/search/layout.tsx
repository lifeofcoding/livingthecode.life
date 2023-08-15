import { Header } from "@components/Header";

import { Suspense } from "react";

export default async function SearchLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <div className="container">
        <section>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </section>
      </div>
    </main>
  );
}
