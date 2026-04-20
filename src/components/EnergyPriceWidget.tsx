import { readEnergyPrices } from "@/lib/energy-prices";
import { Zap, TrendingDown, TrendingUp } from "lucide-react";

interface EnergyPriceWidgetProps {
  compact?: boolean;
}

export default function EnergyPriceWidget({ compact = false }: EnergyPriceWidgetProps) {
  const data = readEnergyPrices();
  const { spotEurMwh, labels, variationPctVsWeek, disclaimer, updatedAt, trvProElectricityNote, arenhNote } =
    data;

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

  const up = variationPctVsWeek >= 0;

  if (compact) {
    return (
      <div className="card-elevated p-5">
        <div className="flex items-center justify-between">
          <span className="chip bg-bg-alt text-text-light border border-line">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Marché spot
          </span>
          <Zap className="w-4 h-4 text-accent" />
        </div>
        <p className="mt-3 font-display font-extrabold text-ink text-3xl tabular-nums">
          {spotEurMwh[spotEurMwh.length - 1]?.toFixed(1)}
          <span className="text-base font-semibold text-text-light ml-1">€/MWh</span>
        </p>
        <p className="text-xs text-text-light mt-1.5">
          Variation 7 j :{" "}
          <span className={`font-semibold ${up ? "text-red-600" : "text-emerald-600"}`}>
            {up ? "+" : ""}
            {variationPctVsWeek.toFixed(1)} %
          </span>
        </p>
        <a
          href="/prix-energie"
          className="inline-block mt-3 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          Voir le détail →
        </a>
      </div>
    );
  }

  return (
    <div className="card-elevated p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <span className="chip bg-bg-alt text-text-light border border-line">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-accent/50 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            Day-ahead — indicatif
          </span>
          <h2 className="mt-3 font-display font-extrabold text-ink text-2xl lg:text-3xl tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-accent" />
            Prix spot marché gros
          </h2>
          <p className="text-sm text-text-light mt-2">
            Dernière mise à jour :{" "}
            {new Date(updatedAt).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${
            up ? "bg-red-50 text-red-700 border border-red-100" : "bg-emerald-50 text-emerald-700 border border-emerald-100"
          }`}
        >
          {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {up ? "+" : ""}
          {variationPctVsWeek.toFixed(1)} % / sem.
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-display font-extrabold text-ink text-4xl sm:text-5xl lg:text-6xl tabular-nums tracking-tight">
          {spotEurMwh[spotEurMwh.length - 1]?.toFixed(1)}
        </span>
        <span className="text-lg font-semibold text-text-light">€/MWh</span>
      </div>

      <div className="relative h-52 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="eaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="eaLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <polygon fill="url(#eaFill)" points={`0,100 ${points} 100,100`} />
          <polyline
            fill="none"
            stroke="url(#eaLine)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-text-muted px-1 pt-2">
          {labels.map((l) => (
            <span key={l} className="truncate max-w-[3.5rem] text-center">
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-bg-alt border border-line p-5">
          <p className="chip bg-white text-text-light border border-line mb-3">TRV pros</p>
          <p className="text-sm text-text-light leading-relaxed">{trvProElectricityNote}</p>
        </div>
        <div className="rounded-xl bg-bg-alt border border-line p-5">
          <p className="chip bg-white text-text-light border border-line mb-3">ARENH</p>
          <p className="text-sm text-text-light leading-relaxed">{arenhNote}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-text-muted border-t border-line pt-4">{disclaimer}</p>
    </div>
  );
}
