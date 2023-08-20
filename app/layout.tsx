import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import ThemeContextProvider from "./ThemeContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LivingTheCode.Life",
  description: "A blog about living the code life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const currentThemeValue: { name: string; value: string } | undefined =
    cookieStore.get("theme");

  let theme: "light" | "dark" = "dark";
  if (currentThemeValue && currentThemeValue.value === "light") {
    theme = "light";
  }
  return (
    <html lang="en">
      <ThemeContextProvider className={inter.className} currentTheme={theme}>
        {children}
      </ThemeContextProvider>
    </html>
  );
}
