import { getDashboardSummary } from "../../src/lib/dashboard";
import { mockRepository } from "../../src/lib/mock-data";

test("summarizes command center metrics and recommended actions", () => {
  const summary = getDashboardSummary(mockRepository);

  expect(summary.topOpportunities.length).toBeGreaterThan(0);
  expect(summary.recommendedActions.length).toBeGreaterThan(0);
  expect(summary.estimatedProfit).toBeGreaterThan(0);
});
