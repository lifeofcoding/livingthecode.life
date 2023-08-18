import { PageHero } from "@components/PageHero";
import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero title="" />

      <section className="w-full">
        <Skeleton className="w-full h-48" />
      </section>
    </main>
  );
}
