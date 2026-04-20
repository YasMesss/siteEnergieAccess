import { NextResponse } from "next/server";
import { readEnergyPrices } from "@/lib/energy-prices";

export async function GET() {
  const data = readEnergyPrices();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
