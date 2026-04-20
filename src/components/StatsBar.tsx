"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numeric = value.match(/^(\d+)/);
    if (!numeric) {
      setDisplay(value);
      return;
    }

    const target = parseInt(numeric[1], 10);
    const rest = value.slice(numeric[1].length);
    let raf = 0;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${Math.floor(target * eased)}${rest}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export default function StatsBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-line rounded-2xl border border-line bg-white">
      {stats.map((s) => (
        <div key={s.label} className="p-7 sm:p-8">
          <div className="font-display text-4xl sm:text-5xl font-extrabold gradient-text leading-none tracking-tight">
            <AnimatedNumber value={s.value} />
          </div>
          <p className="mt-3 text-sm text-text-light leading-relaxed max-w-[20ch]">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
