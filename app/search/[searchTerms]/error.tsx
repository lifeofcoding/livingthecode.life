"use client";
import { PageCirclesHero } from "@/components/PageCirclesHero";
export default function ErrorPage({
  params,
}: {
  params: { searchTerms: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title={`Search For ${params.searchTerms}`} />

      <section className="w-full">
        <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
          Unknown Error Occured
        </div>
      </section>
    </main>
  );
}
