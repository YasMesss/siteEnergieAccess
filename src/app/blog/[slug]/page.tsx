import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Button from "@/components/Button";
import { getArticleBySlug, getAllSlugs, getAllArticles } from "@/lib/blog-data";
import { getBaseUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article" };
  const base = getBaseUrl();
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      url: `${base}/blog/${article.slug}`,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const base = getBaseUrl();
  const date = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    image: article.image.startsWith("http") ? article.image : `${base}${article.image}`,
    mainEntityOfPage: `${base}/blog/${article.slug}`,
  };

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white pt-10 pb-16 lg:pt-16 lg:pb-24 grain isolate">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full bg-primary/25 blur-[120px] mesh-blob-1" />
          <div className="absolute top-1/2 -right-20 w-[380px] h-[380px] rounded-full bg-accent/20 blur-[120px] mesh-blob-2" />
        </div>
        <div className="absolute inset-0 -z-10 grid-lines opacity-40" aria-hidden />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          <span className="chip bg-white/10 border border-white/15 text-white/85 mt-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {article.category}
          </span>
          <h1 className="mt-5 font-display font-extrabold text-3xl sm:text-4xl lg:text-[3rem] tracking-tight leading-[1.08]">
            {article.title}
          </h1>
          <p className="mt-5 text-white/70 text-[1.05rem] leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-accent" />
              <time dateTime={article.publishedAt}>{date}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              {article.readingTime} min de lecture
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4 text-accent" />
              {article.author}
            </span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-16 relative z-10">
        <div className="relative aspect-[21/10] rounded-3xl overflow-hidden border border-line shadow-[0_40px_80px_-40px_rgba(10,15,28,0.35)]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width:1024px) 100vw, 1024px"
          />
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        <div className="mt-14 p-6 lg:p-8 rounded-2xl bg-bg-alt border border-line">
          <p className="font-display font-bold text-ink text-lg">
            Besoin d’une lecture appliquée à votre facture ?
          </p>
          <p className="mt-2 text-text-light text-[0.95rem] leading-relaxed">
            Nos conseillers transposent ces enjeux marché sur votre profil en 48 h.
          </p>
          <div className="mt-5">
            <Button href="/contact">Étude gratuite</Button>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 lg:py-20 bg-bg-alt">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-extrabold text-ink text-2xl lg:text-[2rem] tracking-tight mb-8">
              À lire aussi
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group block p-5 rounded-2xl bg-white border border-line hover:border-primary/25 hover:shadow-[0_20px_50px_-20px_rgba(10,15,28,0.18)] transition-all"
                >
                  <span className="chip bg-bg-alt text-text-light border border-line">
                    {a.category}
                  </span>
                  <p className="mt-3 font-display font-bold text-ink text-[1.05rem] leading-tight group-hover:text-primary transition-colors">
                    {a.title}
                  </p>
                  <p className="mt-2 text-text-light text-sm line-clamp-2 leading-relaxed">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
