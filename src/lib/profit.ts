import type { ProfitRecommendation } from "./domain";

export type ProfitInput = {
  salePrice: number;
  supplierCost: number;
  supplierShipping: number;
  ebayFee: number;
  paymentFee: number;
  promotedListingCost: number;
  returnReserve: number;
  shippingDelayBuffer: number;
  supplierInStock: boolean;
};

export type ProfitResult = {
  estimatedProfit: number;
  margin: number;
  recommendation: ProfitRecommendation;
};

const DEFAULT_MIN_PROFIT = 8;
const DEFAULT_MIN_MARGIN = 25;

const roundCurrency = (value: number) => Math.round(value * 100) / 100;

export function analyzeProfit(
  input: ProfitInput,
  minimums = { profit: DEFAULT_MIN_PROFIT, margin: DEFAULT_MIN_MARGIN },
): ProfitResult {
  const totalCost =
    input.supplierCost +
    input.supplierShipping +
    input.ebayFee +
    input.paymentFee +
    input.promotedListingCost +
    input.returnReserve +
    input.shippingDelayBuffer;
  const estimatedProfit = roundCurrency(input.salePrice - totalCost);
  const margin = roundCurrency((estimatedProfit / input.salePrice) * 100);

  if (!input.supplierInStock || estimatedProfit < minimums.profit || margin < minimums.margin) {
    return { estimatedProfit, margin, recommendation: "REJECT" };
  }

  return { estimatedProfit, margin, recommendation: "APPROVE" };
}
