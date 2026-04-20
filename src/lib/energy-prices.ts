import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

export interface EnergyPricesPayload {
  updatedAt: string;
  disclaimer: string;
  sources: string[];
  spotEurMwh: number[];
  labels: string[];
  variationPctVsWeek: number;
  trvProElectricityNote: string;
  arenhNote: string;
}

const DATA_PATH = join(process.cwd(), "data", "energy-prices.json");

const DEFAULT_PAYLOAD: EnergyPricesPayload = {
  updatedAt: new Date().toISOString(),
  disclaimer:
    "Indicateurs à titre informatif. Les prix du marché varient en temps réel.",
  sources: ["Données locales du site — configurez une mise à jour automatisée (CRE, RTE, ENTSO-E)."],
  spotEurMwh: [70, 71, 70, 72, 71, 70, 69],
  labels: ["J-6", "J-5", "J-4", "J-3", "J-2", "J-1", "J"],
  variationPctVsWeek: 0,
  trvProElectricityNote:
    "Les TRV pour les petits professionnels suivent les grilles publiées par la CRE.",
  arenhNote: "L’ARENH structure une partie du prix de l’électricité sur le marché de détail.",
};

export function readEnergyPrices(): EnergyPricesPayload {
  try {
    if (existsSync(DATA_PATH)) {
      const raw = readFileSync(DATA_PATH, "utf-8");
      return JSON.parse(raw) as EnergyPricesPayload;
    }
  } catch (e) {
    console.error("[energy-prices] read error", e);
  }
  return DEFAULT_PAYLOAD;
}

export function writeEnergyPrices(payload: EnergyPricesPayload): void {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2), "utf-8");
}
