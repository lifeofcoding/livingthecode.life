import { env } from "@/env.mjs";
import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        `${env.NEXT_PUBLIC_APP_URL}/categories/*/edit`,
        `${env.NEXT_PUBLIC_APP_URL}/categories/new`,
        `${env.NEXT_PUBLIC_APP_URL}/categories/*/*/edit`,
        `${env.NEXT_PUBLIC_APP_URL}/categories/*/new`,
      ],
    },
    sitemap: `${env.NEXT_PUBLIC_APP_URL}sitemap.xml`,
  };
}
