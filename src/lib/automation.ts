import type { AutomationActionType } from "./domain";

export type AutomationInput = {
  activeDays: number;
  views: number;
  watchers: number;
  salesLast7Days: number;
  totalSales: number;
  margin: number;
  returnRate: number;
  supplierInStock: boolean;
  supplierPriceIncreasePercent: number;
};

export type AutomationRecommendation = {
  type: AutomationActionType;
  priority: "LOW" | "MEDIUM" | "HIGH";
  message: string;
};

export function evaluateAutomation(input: AutomationInput): AutomationRecommendation[] {
  const actions: AutomationRecommendation[] = [];

  if (!input.supplierInStock) {
    actions.push({ type: "END_LISTING", priority: "HIGH", message: "End listing until supplier stock returns." });
  }

  if (input.supplierPriceIncreasePercent >= 20) {
    actions.push({ type: "RESTOCK_CHECK", priority: "HIGH", message: "Review supplier cost increase before more sales." });
  }

  if (input.activeDays >= 30 && input.views < 100 && input.totalSales === 0) {
    actions.push({ type: "END_LISTING", priority: "HIGH", message: "End stale listing with no watchers or sales." });
  }

  if (input.views >= 250 && input.watchers >= 5 && input.salesLast7Days === 0 && input.totalSales === 0) {
    actions.push({ type: "LOWER_PRICE", priority: "MEDIUM", message: "High interest without conversion suggests price testing." });
  }

  if (input.salesLast7Days >= 5 && input.margin >= 30 && input.returnRate < 0.05) {
    actions.push({ type: "RAISE_PRICE", priority: "MEDIUM", message: "Winner listing can support a controlled price increase." });
  }

  if (input.views >= 250 && input.margin >= 25 && input.salesLast7Days > 0) {
    actions.push({ type: "PROMOTE_LISTING", priority: "LOW", message: "Promote proven traffic to capture more demand." });
  }

  return actions;
}
