import type { MetadataRoute } from "next";
import { copy } from "@/content/copy";

const site = (process.env.NEXT_PUBLIC_SITE_URL || copy.brand.url).replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
