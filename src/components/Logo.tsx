import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export default function Logo({ inverted = false, compact = false }: LogoProps) {
  const height = compact ? 40 : 56;

  const image = (
    <Image
      src="/logo.avif"
      alt="Energie Access"
      width={height * 3}
      height={height}
      priority
      className={`w-auto ${compact ? "h-10" : "h-12 sm:h-14"}`}
    />
  );

  return (
    <Link
      href="/"
      className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg transition-transform duration-300 hover:scale-[1.02]"
      aria-label="Energie Access — accueil"
    >
      {inverted ? (
        <span className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/30">
          {image}
        </span>
      ) : (
        image
      )}
    </Link>
  );
}
