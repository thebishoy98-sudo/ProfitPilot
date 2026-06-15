import { render, screen } from "@testing-library/react";
import ProductPage from "../../src/app/products/[id]/page";

test("renders a product packet with profit, risk, and listing draft", async () => {
  const Page = await ProductPage({ params: Promise.resolve({ id: "prod-001" }) });
  render(Page);

  expect(screen.getByText("Product Packet")).toBeInTheDocument();
  expect(screen.getByText("Profit Analysis")).toBeInTheDocument();
  expect(screen.getByText("Risk Assessment")).toBeInTheDocument();
  expect(screen.getByText("Listing Draft")).toBeInTheDocument();
});
