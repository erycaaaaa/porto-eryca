// src/app/sitemap.ts
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://portfolio-erycadhamma.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
        