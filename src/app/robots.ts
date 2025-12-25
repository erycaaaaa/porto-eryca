// src/app/robots.ts
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://portfolio-erycadhamma.vercel.app/sitemap.xml",
  };
}
