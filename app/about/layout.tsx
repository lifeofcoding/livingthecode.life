import { Header } from "@components/Header";

import { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "LivingTheCode.Life | About Me",
  description: "A blog about living the code life.",
};

export default async function CategoriesLayout({
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
