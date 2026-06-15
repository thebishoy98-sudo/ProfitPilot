import { assessRisk } from "../../src/lib/risk";

test("marks medical supplement products high risk", () => {
  const result = assessRisk({ title: "Herbal sleep supplement", category: "Supplements", shippingDays: 8 });

  expect(result.level).toBe("HIGH");
  expect(result.flags).toContain("restricted_category");
});

test("flags marketplace compliance and fulfillment risks", () => {
  const result = assessRisk({
    title: "Trademark compatible fragile lithium battery pack",
    category: "Accessories",
    shippingDays: 12,
  });

  expect(result.flags).toEqual(
    expect.arrayContaining(["trademark_risk", "fragile_item", "battery_item", "slow_shipping"]),
  );
});
