"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/Logo";
import { navLinks, company } from "@/lib/data";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-all duration-300 bg-white ${
          isScrolled
            ? "shadow-[0_8px_24px_-16px_rgba(10,15,28,0.18)] border-b border-line"
            : "border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Logo />

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-2 text-[0.93rem] font-medium rounded-lg transition-colors ${
                      active ? "text-primary" : "text-text hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute left-3.5 right-3.5 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-primary to-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a
                href={company.phoneTel}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-[0.88rem] font-semibold text-ink hover:bg-bg-alt transition-colors"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                {company.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="btn-shine group inline-flex items-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[0.88rem] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(10,15,28,0.6)] hover:shadow-[0_14px_36px_-12px_rgba(29,78,216,0.5)] hover:bg-primary transition-all"
              >
                Étude gratuite
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <button
              type="button"
              className="lg:hidden p-2 rounded-xl text-ink hover:bg-bg-alt"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-white z-40 overflow-y-auto animate-fade-in">
          <nav className="flex flex-col p-5 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/5 text-primary"
                    : "text-ink hover:bg-bg-alt"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-line my-4" />
            <a
              href={company.phoneTel}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl border border-line bg-bg-alt font-semibold text-ink"
            >
              <Phone className="w-4 h-4 text-accent" />
              {company.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-ink text-white font-semibold"
            >
              Demander une étude
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
