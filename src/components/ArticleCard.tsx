import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/blog-data";
import { Clock, ArrowUpRight } from "lucide-react";

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: BlogArticle;
  featured?: boolean;
}) {
  const date = new Date(article.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article
      className={`group relative flex flex-col rounded-2xl border border-line bg-white overflow-hidden transition-all duration-300 hover:border-primary/25 hover:shadow-[0_28px_60px_-28px_rgba(10,15,28,0.18)] ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      <Link
        href={`/blog/${article.slug}`}
        className={`relative overflow-hidden block ${
          featured ? "aspect-[16/10] lg:aspect-auto lg:w-[55%]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 768px) 100vw, 33vw"}
        />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/40 to-transparent" aria-hidden />
        <span className="absolute top-4 left-4 chip bg-white/95 backdrop-blur-sm text-ink border border-white/40 shadow-sm">
          {article.category}
        </span>
      </Link>
      <div className={`p-6 lg:p-7 flex flex-col flex-1 ${featured ? "lg:p-10 lg:justify-center" : ""}`}>
        <h2
          className={`font-display font-bold text-ink tracking-tight leading-tight group-hover:text-primary transition-colors ${
            featured ? "text-2xl lg:text-[1.8rem]" : "text-[1.15rem]"
          }`}
        >
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className={`text-text-light leading-relaxed flex-1 ${featured ? "mt-4 text-[1rem]" : "mt-3 text-[0.92rem] line-clamp-3"}`}>
          {article.excerpt}
        </p>
        <div className={`flex items-center justify-between gap-3 pt-5 mt-5 border-t border-line ${featured ? "lg:pt-6 lg:mt-6" : ""}`}>
          <div className="flex items-center gap-3 text-xs text-text-muted">
            <time dateTime={article.publishedAt}>{date}</time>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime} min
            </span>
          </div>
          <span className="flex items-center gap-1 text-[0.82rem] font-semibold text-primary group-hover:text-accent transition-colors">
            Lire
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
