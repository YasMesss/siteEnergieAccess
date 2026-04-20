const rateMap = new Map<string, number[]>();

export function isRateLimited(
  ip: string,
  max: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  rateMap.set(ip, hits);
  if (rateMap.size > 10_000) {
    const oldest = now - windowMs;
    for (const [k, v] of rateMap) {
      if (v.every((t) => t < oldest)) rateMap.delete(k);
    }
  }
  return hits.length > max;
}

export function getClientIp(request: Request): string {
  const h = request.headers.get("x-forwarded-for");
  return h?.split(",")[0]?.trim() || "unknown";
}
