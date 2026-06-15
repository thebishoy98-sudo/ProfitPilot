import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

test("renders the ProfitPilot command center", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: "ProfitPilot" })).toBeInTheDocument();
  expect(screen.getByText("Command Center")).toBeInTheDocument();
});

test("renders prioritized operations sections", () => {
  render(<HomePage />);

  expect(screen.getByText("Top Opportunities")).toBeInTheDocument();
  expect(screen.getByText("Supplier Alerts")).toBeInTheDocument();
  expect(screen.getByText("Recommended Actions")).toBeInTheDocument();
  expect(screen.getByText("Active Listings")).toBeInTheDocument();
});

test("renders opportunity score dimensions for operator review", () => {
  render(<HomePage />);

  expect(screen.getAllByText("Demand").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Competition").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Trend").length).toBeGreaterThan(0);
  expect(screen.getAllByText("Risk").length).toBeGreaterThan(0);
});
