import { readFileSync } from "node:fs";

test("render blueprint defines web, worker, postgres, and redis resources", () => {
  const blueprint = readFileSync("render.yaml", "utf8");

  expect(blueprint).toContain("profitpilot-web");
  expect(blueprint).toContain("profitpilot-worker");
  expect(blueprint).toContain("profitpilot-db");
  expect(blueprint).toContain("profitpilot-redis");
});
