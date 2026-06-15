import { analyzeProfit } from "../../src/lib/profit";

test("approves products meeting minimum profit and margin", () => {
  const result = analyzeProfit({
    salePrice: 29.99,
    supplierCost: 8,
    supplierShipping: 0,
    ebayFee: 4.5,
    paymentFee: 0,
    promotedListingCost: 1.5,
    returnReserve: 1.5,
    shippingDelayBuffer: 2,
    supplierInStock: true,
  });

  expect(result.estimatedProfit).toBe(12.49);
  expect(result.margin).toBe(41.65);
  expect(result.recommendation).toBe("APPROVE");
});
