import { evaluateAutomation } from "../../src/lib/automation";

test("recommends ending losing listings after 30 days", () => {
  const actions = evaluateAutomation({
    activeDays: 30,
    views: 80,
    watchers: 0,
    salesLast7Days: 0,
    totalSales: 0,
    margin: 28,
    returnRate: 0,
    supplierInStock: true,
    supplierPriceIncreasePercent: 0,
  });

  expect(actions[0].type).toBe("END_LISTING");
});

test("uses exact automation thresholds for pricing and supplier actions", () => {
  const highInterest = evaluateAutomation({
    activeDays: 12,
    views: 250,
    watchers: 5,
    salesLast7Days: 0,
    totalSales: 0,
    margin: 28,
    returnRate: 0,
    supplierInStock: true,
    supplierPriceIncreasePercent: 0,
  });
  const supplierIncrease = evaluateAutomation({
    activeDays: 5,
    views: 40,
    watchers: 1,
    salesLast7Days: 0,
    totalSales: 0,
    margin: 28,
    returnRate: 0,
    supplierInStock: true,
    supplierPriceIncreasePercent: 20,
  });

  expect(highInterest[0].type).toBe("LOWER_PRICE");
  expect(supplierIncrease[0].type).toBe("RESTOCK_CHECK");
});
