import { NextResponse } from "next/server";
import { getDashboardSummary } from "@/lib/dashboard";
import { mockRepository } from "@/lib/mock-data";

export function GET() {
  return NextResponse.json(getDashboardSummary(mockRepository));
}
