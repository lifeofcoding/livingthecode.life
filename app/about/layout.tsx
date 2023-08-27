import { Header } from "@components/Header";

import { Suspense } from "react";

import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "About Me",
};

export default async function AboutLayout({
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

      <Footer />
    </main>
  );
}
