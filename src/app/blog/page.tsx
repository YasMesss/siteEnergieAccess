import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ArticleCard from "@/components/ArticleCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { getAllArticles } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "Actualités marché de l’énergie, TRV, ARENH, gaz, efficacité et conseils pour les entreprises.",
};

export default function BlogPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <main>
      <PageHero
        eyebrow="Blog & veille"
        title="Décryptages pour décideurs et gestionnaires d’énergie."
        subtitle="TRV, ARENH, marché de gros, efficacité, CEE, décret tertiaire — on prend le temps d’expliquer ce qui impacte votre budget énergie."
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {featured && (
            <AnimateOnScroll>
              <ArticleCard article={featured} featured />
            </AnimateOnScroll>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {rest.map((a, i) => (
              <AnimateOnScroll key={a.slug} delay={(i % 3) * 60}>
                <ArticleCard article={a} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
