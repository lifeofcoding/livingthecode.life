import { PageCirclesHero } from "@/components/PageCirclesHero";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title="Categories" />

      <section className="w-full">
        <Skeleton className="w-full h-48" />
      </section>
    </main>
  );
}
