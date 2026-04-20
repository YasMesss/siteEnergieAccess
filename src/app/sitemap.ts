import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/blog-data";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/a-propos`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services`, lastModified, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/prix-energie`, lastModified, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.65 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/mentions-legales`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cgv`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/politique-confidentialite`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/accessibilite`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const slugs = getAllSlugs();
  const blogPages: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
