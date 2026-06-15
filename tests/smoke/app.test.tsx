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
