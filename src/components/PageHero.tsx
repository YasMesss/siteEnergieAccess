interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { href: string; label: string }[];
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-white grain isolate">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full bg-primary/30 blur-[120px] mesh-blob-1" />
        <div className="absolute top-1/2 -right-20 w-[380px] h-[380px] rounded-full bg-accent/25 blur-[120px] mesh-blob-2" />
      </div>
      <div className="absolute inset-0 -z-10 grid-lines opacity-60" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        {eyebrow && (
          <span className="chip bg-white/10 border border-white/15 text-white/85 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-[1.05rem] lg:text-lg text-white/70 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
    </section>
  );
}
