"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { company } from "@/lib/data";

export default function MobileStickyBar() {
  return (
    <div
      className="fixed left-3 right-3 z-40 lg:hidden"
      style={{ bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="glass flex gap-2 p-2 rounded-2xl">
        <a
          href={company.phoneTel}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-line text-ink font-semibold py-3 min-h-[46px] rounded-xl text-[0.88rem]"
          aria-label="Appeler Energie Access"
        >
          <Phone className="w-4 h-4 text-accent" /> Appeler
        </a>
        <Link
          href="/contact"
          className="flex-[1.3] flex items-center justify-center gap-2 bg-ink text-white font-semibold py-3 min-h-[46px] rounded-xl text-[0.88rem]"
        >
          Étude gratuite
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
