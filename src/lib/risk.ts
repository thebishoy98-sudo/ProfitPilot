import type { RiskLevel } from "./domain";

export type RiskInput = {
  title: string;
  category: string;
  shippingDays: number;
  supplierInStock?: boolean;
  returnRate?: number;
};

export type RiskResult = {
  level: RiskLevel;
  flags: string[];
  summary: string;
};

const restrictedCategories = new Set(["supplements", "medical", "health"]);
const restrictedKeywords = ["supplement", "herbal", "medical", "prescription", "sleep aid"];
const keywordFlags = [
  { flag: "counterfeit_risk", keywords: ["replica", "counterfeit", "knockoff"] },
  { flag: "fragile_item", keywords: ["fragile", "glass", "ceramic"] },
  { flag: "battery_item", keywords: ["battery", "lithium"] },
  { flag: "trademark_risk", keywords: ["trademark", "branded", "compatible"] },
];

export function assessRisk(input: RiskInput): RiskResult {
  const flags: string[] = [];
  const title = input.title.toLowerCase();
  const category = input.category.toLowerCase();

  if (restrictedCategories.has(category) || restrictedKeywords.some((keyword) => title.includes(keyword))) {
    flags.push("restricted_category");
  }

  for (const rule of keywordFlags) {
    if (rule.keywords.some((keyword) => title.includes(keyword))) {
      flags.push(rule.flag);
    }
  }

  if (input.shippingDays > 7) {
    flags.push("slow_shipping");
  }

  if (input.supplierInStock === false) {
    flags.push("supplier_out_of_stock");
  }

  if ((input.returnRate ?? 0) >= 0.08) {
    flags.push("high_return_rate");
  }

  const level: RiskLevel = flags.includes("restricted_category")
    ? "HIGH"
    : flags.length > 0
      ? "MEDIUM"
      : "LOW";

  return {
    level,
    flags,
    summary: flags.length === 0 ? "No material risk flags found." : `Review ${flags.join(", ")} before listing.`,
  };
}
