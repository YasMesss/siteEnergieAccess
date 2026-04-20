import { FileText, FileSignature, LineChart, Scale, PenLine, LifeBuoy } from "lucide-react";
import { processSteps } from "@/lib/data";

const icons = [FileText, FileSignature, LineChart, Scale, PenLine, LifeBuoy];

export default function ProcessTimeline() {
  return (
    <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-y-10 lg:gap-y-0 gap-x-4">
      {processSteps.map((s, i) => {
        const Icon = icons[i] ?? FileText;
        const isLast = i === processSteps.length - 1;
        return (
          <li key={s.title} className="relative flex flex-col">
            {/* Connecting line (lg only, hidden on last) */}
            {!isLast && (
              <span
                className="hidden lg:block absolute top-7 left-[56px] right-0 h-px bg-gradient-to-r from-white/20 via-white/15 to-white/10"
                aria-hidden
              />
            )}

            <div className="flex items-center gap-4">
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 border border-white/15 ring-4 ring-ink">
                <Icon className="w-5 h-5 text-accent" />
              </span>
              <span className="font-display font-extrabold text-4xl text-white/15 leading-none tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-5 pr-4">
              <h3 className="font-display font-bold text-white text-[1.05rem] leading-snug">
                {s.title.replace(/^\d+\.\s*/, "")}
              </h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
