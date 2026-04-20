interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={centered ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      {eyebrow && (
        <span
          className={`chip mb-5 ${
            light
              ? "bg-white/10 text-white border border-white/15"
              : "bg-primary/8 text-primary border border-primary/15"
          }`}
        >
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${light ? "bg-accent" : "bg-primary"}`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold tracking-tight leading-[1.08] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-[1.05rem] mt-5 leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-text-light"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
