import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <section className="w-full">
        <div className="container mx-auto px-4">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-8 mb-2" />
            ))}
        </div>
      </section>
    </main>
  );
}
