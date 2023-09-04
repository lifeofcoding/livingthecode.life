"use client";
import { useEffect } from "react";
import { PageCirclesHero } from "@/components/PageCirclesHero";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  let message = "Unknown Error Occured";
  let title = "Something Happen...";
  if (error.digest && error.digest === "NEXT_NOT_FOUND") {
    title = "Page Not Found";
    message =
      "Perhaps you are lost? Check out some of the cool categories since you are here.";
  }

  return (
    <main className="flex min-h-screen flex-col items-center relative">
      <PageCirclesHero title={title} />

      <section className="w-full text-center text-lg">
        {message}{" "}
        {/* <a href="#" className="text-primary" onClick={reset}>
          Try Again
        </a> */}
      </section>
    </main>
  );
}
