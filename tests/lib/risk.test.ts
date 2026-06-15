import { assessRisk } from "../../src/lib/risk";

test("marks medical supplement products high risk", () => {
  const result = assessRisk({ title: "Herbal sleep supplement", category: "Supplements", shippingDays: 8 });

  expect(result.level).toBe("HIGH");
  expect(result.flags).toContain("restricted_category");
});
