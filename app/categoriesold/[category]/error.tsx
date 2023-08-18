"use client";
import { PageHero } from "@/components/PageHero";

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero title="Error" />
      {/* <HomeHero title={result.title} /> */}

      <section className="w-full">Unknown Error Occured</section>
    </main>
  );
}
