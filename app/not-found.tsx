import { Header } from "../components/Header";

export default async function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <section>Page Not Found</section>
    </main>
  );
}
