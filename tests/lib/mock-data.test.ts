import { listingMetrics, opportunities, supplierProducts } from "../../src/lib/mock-data";

test("mock data includes linked opportunity, supplier, and metrics records", () => {
  expect(opportunities[0].productId).toBeTruthy();
  expect(supplierProducts.some((supplier) => supplier.productId === opportunities[0].productId)).toBe(true);
  expect(listingMetrics.some((metric) => metric.productId === opportunities[0].productId)).toBe(true);
});
