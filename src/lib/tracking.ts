const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
] as const;

const STORAGE_KEY = "ea_utm";

export type TrackingParams = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  landing_page?: string;
  referrer?: string;
};

export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;

  const url = new URL(window.location.href);
  const params: TrackingParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const val = url.searchParams.get(key);
    if (val) {
      params[key] = val;
      hasAny = true;
    }
  }

  if (hasAny) {
    params.landing_page = window.location.pathname;
    params.referrer = document.referrer || undefined;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
    } catch {
      /* quota */
    }
  }
}

export function getTrackingParams(): TrackingParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingParams) : {};
  } catch {
    return {};
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (w.gtag) {
    w.gtag("event", eventName, params);
  }
}
