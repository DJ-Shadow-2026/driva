import type { MetadataRoute } from "next";
import { copy } from "@/content/copy";

const site = (process.env.NEXT_PUBLIC_SITE_URL || copy.brand.url).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
