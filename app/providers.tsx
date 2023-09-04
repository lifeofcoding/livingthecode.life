"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import Provider from "@/app/_trpc/Provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Provider>{children}</Provider>
    </ThemeProvider>
  );
}
