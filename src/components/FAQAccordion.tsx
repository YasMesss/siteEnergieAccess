"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-2xl border bg-white transition-all duration-300 ${
              isOpen
                ? "border-primary/25 shadow-[0_24px_48px_-24px_rgba(29,78,216,0.25)]"
                : "border-line hover:border-line/80"
            }`}
          >
            <button
              type="button"
              className="w-full flex items-center justify-between gap-4 text-left p-5 lg:p-6 min-h-[60px]"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-header-${i}`}
            >
              <span className="flex items-center gap-4">
                <span className="hidden sm:inline-flex font-display font-bold text-text-muted text-sm tabular-nums">
                  0{i + 1}
                </span>
                <span className="font-display font-semibold text-ink text-[1.02rem] leading-snug">
                  {item.q}
                </span>
              </span>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all ${
                  isOpen
                    ? "bg-primary text-white border-primary rotate-45"
                    : "bg-bg-alt text-ink border-line"
                }`}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-header-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 lg:px-6 pb-6 sm:pl-[4.25rem]">
                  <div className="border-t border-line pt-5">
                    <p className="text-text-light text-[0.95rem] leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
