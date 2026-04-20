import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variantStyles = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-white shadow-[0_14px_36px_-12px_rgba(29,78,216,0.45)] hover:shadow-[0_18px_44px_-12px_rgba(16,185,129,0.5)] hover:-translate-y-[1px] btn-shine",
  secondary:
    "bg-white text-ink border border-line hover:border-primary/30 hover:bg-bg-alt shadow-[0_8px_24px_-16px_rgba(10,15,28,0.3)]",
  outline:
    "border-2 border-ink/80 text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-bg-alt",
  dark:
    "bg-ink text-white shadow-[0_14px_36px_-14px_rgba(10,15,28,0.7)] hover:bg-primary hover:shadow-[0_18px_44px_-12px_rgba(29,78,216,0.4)] hover:-translate-y-[1px] btn-shine",
};

const sizeStyles = {
  sm: "px-4 py-2.5 text-[0.85rem] min-h-[42px]",
  md: "px-5 py-3 text-[0.92rem] min-h-[46px]",
  lg: "px-7 py-4 text-[1rem] min-h-[54px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
