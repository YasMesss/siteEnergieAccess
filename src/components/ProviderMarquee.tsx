const providers = [
  "EDF",
  "Engie",
  "TotalEnergies",
  "Eni",
  "Alpiq",
  "Ekwateur",
  "Wekiwi",
  "Vattenfall",
  "Iberdrola",
  "Mint Énergie",
  "Plüm",
  "Ohm Énergie",
];

export default function ProviderMarquee() {
  const loop = [...providers, ...providers];
  return (
    <div className="relative overflow-hidden py-6 border-y border-line bg-white">
      <div className="sm:hidden flex justify-center mb-4 px-4">
        <span className="inline-flex chip bg-bg-alt text-text-light border border-line">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Partenaires fournisseurs
        </span>
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />
        <div className="flex items-center">
          <span className="hidden sm:inline-flex shrink-0 mx-6 chip bg-bg-alt text-text-light border border-line">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Partenaires fournisseurs
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-10 marquee-track whitespace-nowrap">
              {loop.map((p, i) => (
                <span
                  key={`${p}-${i}`}
                  className="font-display text-lg sm:text-2xl font-semibold text-ink/55 hover:text-ink transition-colors tracking-tight"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
