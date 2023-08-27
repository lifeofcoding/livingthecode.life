import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default async function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <section className="flex-grow">Page Not Found</section>

      <Footer />
    </main>
  );
}
