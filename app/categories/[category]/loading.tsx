import { PageHero } from "@components/PageHero";
export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHero title="" />

      <section className="w-full">Loading ...</section>
    </main>
  );
}
