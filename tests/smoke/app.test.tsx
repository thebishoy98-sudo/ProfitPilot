import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

test("renders the ProfitPilot command center", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: "ProfitPilot" })).toBeInTheDocument();
  expect(screen.getByText("Command Center")).toBeInTheDocument();
});
