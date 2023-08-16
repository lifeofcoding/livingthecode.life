import { PageCirclesHero } from "@/components/PageCirclesHero";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading({
  params,
}: {
  params: { searchTerms: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title={`Search For ${params.searchTerms}`} />

      <section className="w-full">
        <Skeleton className="w-full h-48" />
      </section>
    </main>
  );
}
