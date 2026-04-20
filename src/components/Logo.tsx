import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export default function Logo({ inverted = false, compact = false }: LogoProps) {
  const height = compact ? 40 : 56;
  return (
    <Link
      href="/"
      className="group inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg transition-transform duration-300 hover:scale-[1.02]"
      aria-label="Energie Access — accueil"
    >
      <Image
        src="/logo.avif"
        alt="Energie Access"
        width={height * 3}
        height={height}
        priority
        className={`${inverted ? "brightness-0 invert" : ""} w-auto`}
        style={{ height: `${height}px` }}
      />
    </Link>
  );
}
