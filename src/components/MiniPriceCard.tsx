import Link from "next/link";
import { TrendingDown, TrendingUp, ArrowUpRight } from "lucide-react";
import { readEnergyPrices } from "@/lib/energy-prices";

export default function MiniPriceCard({ dark = false }: { dark?: boolean }) {
  const data = readEnergyPrices();
  const { spotEurMwh, variationPctVsWeek, updatedAt } = data;
  const last = spotEurMwh[spotEurMwh.length - 1] ?? 0;
  const up = variationPctVsWeek >= 0;

  const max = Math.max(...spotEurMwh, 1);
  const min = Math.min(...spotEurMwh);
  const range = max - min || 1;
  const points = spotEurMwh
    .map((v, i) => {
      const x = (i / (spotEurMwh.length - 1 || 1)) * 100;
      const y = 100 - ((v - min) / range) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 ${
        dark
          ? "bg-white/[0.04] border border-white/10 text-white"
          : "card-elevated text-ink"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`chip ${
            dark ? "bg-white/10 text-white/80 border border-white/10" : "bg-bg-alt text-text-light border border-line"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          Marché spot · live
        </span>
        <span className={`text-[0.7rem] ${dark ? "text-white/50" : "text-text-muted"}`}>
          {new Date(updatedAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className={`font-display font-extrabold text-3xl tabular-nums ${dark ? "text-white" : "text-ink"}`}>
              {last.toFixed(1)}
            </span>
            <span className={`text-sm font-semibold ${dark ? "text-white/60" : "text-text-light"}`}>€/MWh</span>
          </div>
          <div
            className={`inline-flex items-center gap-1 mt-1.5 text-[0.78rem] font-semibold ${
              up
                ? dark
                  ? "text-red-300"
                  : "text-red-600"
                : dark
                  ? "text-emerald-300"
                  : "text-emerald-600"
            }`}
          >
            {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {up ? "+" : ""}
            {variationPctVsWeek.toFixed(1)} % / 7j
          </div>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-14 w-28 shrink-0">
          <defs>
            <linearGradient id="mpcFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={dark ? "#6ee7b7" : "#10b981"} stopOpacity="0.35" />
              <stop offset="100%" stopColor={dark ? "#6ee7b7" : "#10b981"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon fill="url(#mpcFill)" points={`0,100 ${points} 100,100`} />
          <polyline
            fill="none"
            stroke={dark ? "#6ee7b7" : "#10b981"}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            points={points}
          />
        </svg>
      </div>

      <Link
        href="/prix-energie"
        className={`mt-4 inline-flex items-center gap-1 text-[0.82rem] font-semibold transition-colors ${
          dark ? "text-accent hover:text-white" : "text-primary hover:text-accent"
        }`}
      >
        Voir tendances & TRV
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
