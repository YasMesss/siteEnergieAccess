/** Dates/heures affichées en heure de Paris (Europe/Paris). */
const TZ = "Europe/Paris";

export function formatParisDateTime(date: Date = new Date()): string {
  const d = date.toLocaleDateString("fr-FR", { timeZone: TZ });
  const t = date.toLocaleTimeString("fr-FR", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${d} à ${t}`;
}
