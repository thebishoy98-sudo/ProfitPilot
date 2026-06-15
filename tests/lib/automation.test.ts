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
