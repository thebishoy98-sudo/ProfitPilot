# ProfitPilot MVP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a deployable ProfitPilot MVP dashboard with mocked marketplace data, deterministic profit/risk/automation engines, listing draft generation stubs, and a Render-ready deployment setup.

**Architecture:** Use a single Next.js application for the first build so the UI and API can ship quickly from one Render web service. Keep business logic in framework-independent modules under `src/lib` with tests first, so future worker services and real marketplace integrations can reuse the same code.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, PostgreSQL-ready Prisma schema, and Render Blueprint configuration.

---

### Task 1: Initialize Application Skeleton

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `vitest.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/globals.css`
- Create: `tests/smoke/app.test.tsx`

**Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

test("renders the ProfitPilot command center", () => {
  render(<HomePage />);

  expect(screen.getByRole("heading", { name: "ProfitPilot" })).toBeInTheDocument();
  expect(screen.getByText("Command Center")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/smoke/app.test.tsx`

Expected: FAIL because the app and dependencies do not exist yet.

**Step 3: Write minimal implementation**

Create the Next.js files, install dependencies, and render a basic `ProfitPilot` command center shell.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/smoke/app.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add package.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts vitest.config.ts src tests
git commit -m "feat: initialize ProfitPilot app"
```

### Task 2: Add Domain Types And Mock Data

**Files:**
- Create: `src/lib/domain.ts`
- Create: `src/lib/mock-data.ts`
- Create: `tests/lib/mock-data.test.ts`

**Step 1: Write the failing test**

```ts
import { opportunities, supplierProducts, listingMetrics } from "../../src/lib/mock-data";

test("mock data includes linked opportunity, supplier, and metrics records", () => {
  expect(opportunities[0].productId).toBeTruthy();
  expect(supplierProducts.some((supplier) => supplier.productId === opportunities[0].productId)).toBe(true);
  expect(listingMetrics.some((metric) => metric.productId === opportunities[0].productId)).toBe(true);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/lib/mock-data.test.ts`

Expected: FAIL because the domain and mock data modules do not exist.

**Step 3: Write minimal implementation**

Define typed records for products, opportunities, supplier products, profit analyses, risk assessments, listing drafts, listing metrics, automation actions, and notifications. Add realistic sample records for 6 to 8 products.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/lib/mock-data.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/domain.ts src/lib/mock-data.ts tests/lib/mock-data.test.ts
git commit -m "feat: add ProfitPilot domain model"
```

### Task 3: Build Profit Calculation Engine

**Files:**
- Create: `src/lib/profit.ts`
- Create: `tests/lib/profit.test.ts`

**Step 1: Write the failing test**

```ts
import { analyzeProfit } from "../../src/lib/profit";

test("approves products meeting minimum profit and margin", () => {
  const result = analyzeProfit({
    salePrice: 29.99,
    supplierCost: 8,
    supplierShipping: 0,
    ebayFee: 4.5,
    paymentFee: 0,
    promotedListingCost: 1.5,
    returnReserve: 1.5,
    shippingDelayBuffer: 2,
    supplierInStock: true,
  });

  expect(result.estimatedProfit).toBe(12.49);
  expect(result.margin).toBe(41.65);
  expect(result.recommendation).toBe("APPROVE");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/lib/profit.test.ts`

Expected: FAIL because `analyzeProfit` does not exist.

**Step 3: Write minimal implementation**

Implement deterministic profit and margin calculation with defaults of `$8` minimum profit and `25%` minimum margin. Reject out-of-stock products.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/lib/profit.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/profit.ts tests/lib/profit.test.ts
git commit -m "feat: add profit analysis engine"
```

### Task 4: Build Risk And Automation Engines

**Files:**
- Create: `src/lib/risk.ts`
- Create: `src/lib/automation.ts`
- Create: `tests/lib/risk.test.ts`
- Create: `tests/lib/automation.test.ts`

**Step 1: Write the failing tests**

```ts
import { assessRisk } from "../../src/lib/risk";

test("marks medical supplement products high risk", () => {
  const result = assessRisk({ title: "Herbal sleep supplement", category: "Supplements", shippingDays: 8 });

  expect(result.level).toBe("HIGH");
  expect(result.flags).toContain("restricted_category");
});
```

```ts
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
```

**Step 2: Run tests to verify they fail**

Run: `npm test -- tests/lib/risk.test.ts tests/lib/automation.test.ts`

Expected: FAIL because the modules do not exist.

**Step 3: Write minimal implementation**

Implement keyword/category-based risk flags and the loser, high-interest, winner, out-of-stock, and supplier price increase rules.

**Step 4: Run tests to verify they pass**

Run: `npm test -- tests/lib/risk.test.ts tests/lib/automation.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/risk.ts src/lib/automation.ts tests/lib/risk.test.ts tests/lib/automation.test.ts
git commit -m "feat: add risk and automation engines"
```

### Task 5: Create Dashboard Data API

**Files:**
- Create: `src/lib/dashboard.ts`
- Create: `src/app/api/analytics/dashboard/route.ts`
- Create: `tests/lib/dashboard.test.ts`

**Step 1: Write the failing test**

```ts
import { getDashboardSummary } from "../../src/lib/dashboard";
import { mockRepository } from "../../src/lib/mock-data";

test("summarizes command center metrics and recommended actions", () => {
  const summary = getDashboardSummary(mockRepository);

  expect(summary.topOpportunities.length).toBeGreaterThan(0);
  expect(summary.recommendedActions.length).toBeGreaterThan(0);
  expect(summary.estimatedProfit).toBeGreaterThan(0);
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/lib/dashboard.test.ts`

Expected: FAIL because the dashboard module does not exist.

**Step 3: Write minimal implementation**

Aggregate mock data into command center KPIs, top opportunities, active listings, winners, failed products, supplier alerts, and recommended actions. Expose the same data from `GET /api/analytics/dashboard`.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/lib/dashboard.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/lib/dashboard.ts src/app/api/analytics/dashboard/route.ts tests/lib/dashboard.test.ts
git commit -m "feat: add dashboard summary API"
```

### Task 6: Build Command Center UI

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/MetricStrip.tsx`
- Create: `src/components/OpportunityQueue.tsx`
- Create: `src/components/AutomationInbox.tsx`
- Create: `src/components/SupplierAlerts.tsx`
- Create: `src/components/ListingPerformance.tsx`
- Create: `tests/smoke/app.test.tsx`

**Step 1: Extend the failing test**

```tsx
test("renders prioritized operations sections", () => {
  render(<HomePage />);

  expect(screen.getByText("Top Opportunities")).toBeInTheDocument();
  expect(screen.getByText("Supplier Alerts")).toBeInTheDocument();
  expect(screen.getByText("Recommended Actions")).toBeInTheDocument();
  expect(screen.getByText("Active Listings")).toBeInTheDocument();
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/smoke/app.test.tsx`

Expected: FAIL because these sections do not exist yet.

**Step 3: Write minimal implementation**

Build a polished operations-console dashboard using the dashboard summary. Use dense, scannable sections, restrained colors, and clear status indicators.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/smoke/app.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/page.tsx src/components tests/smoke/app.test.tsx
git commit -m "feat: build command center dashboard"
```

### Task 7: Add Product Packet And Listing Studio Views

**Files:**
- Create: `src/app/products/[id]/page.tsx`
- Create: `src/components/ProductPacket.tsx`
- Create: `src/components/ProfitBreakdown.tsx`
- Create: `src/components/RiskPanel.tsx`
- Create: `src/components/ListingDraftPanel.tsx`
- Create: `tests/smoke/product-packet.test.tsx`

**Step 1: Write the failing test**

```tsx
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
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/smoke/product-packet.test.tsx`

Expected: FAIL because the product route does not exist.

**Step 3: Write minimal implementation**

Create a product packet route that displays supplier details, profit math, risk flags, draft listing copy, images, and action history for a selected mock product.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/smoke/product-packet.test.tsx`

Expected: PASS.

**Step 5: Commit**

```bash
git add src/app/products src/components/ProductPacket.tsx src/components/ProfitBreakdown.tsx src/components/RiskPanel.tsx src/components/ListingDraftPanel.tsx tests/smoke/product-packet.test.tsx
git commit -m "feat: add product packet workspace"
```

### Task 8: Add Database Schema And Render Deployment

**Files:**
- Create: `prisma/schema.prisma`
- Create: `render.yaml`
- Create: `.env.example`
- Modify: `package.json`
- Create: `tests/config/render-config.test.ts`

**Step 1: Write the failing test**

```ts
import { readFileSync } from "node:fs";

test("render blueprint defines web, worker, postgres, and redis resources", () => {
  const blueprint = readFileSync("render.yaml", "utf8");

  expect(blueprint).toContain("profitpilot-web");
  expect(blueprint).toContain("profitpilot-worker");
  expect(blueprint).toContain("profitpilot-db");
  expect(blueprint).toContain("profitpilot-redis");
});
```

**Step 2: Run test to verify it fails**

Run: `npm test -- tests/config/render-config.test.ts`

Expected: FAIL because deployment files do not exist.

**Step 3: Write minimal implementation**

Add a Prisma schema matching the approved database design. Add `render.yaml` with a web service, worker service placeholder command, managed PostgreSQL, and managed Redis. Add `.env.example` without real secrets.

**Step 4: Run test to verify it passes**

Run: `npm test -- tests/config/render-config.test.ts`

Expected: PASS.

**Step 5: Commit**

```bash
git add prisma/schema.prisma render.yaml .env.example package.json tests/config/render-config.test.ts
git commit -m "chore: add database schema and Render blueprint"
```

### Task 9: Verify Build, Tests, And Local App

**Files:**
- Modify only if verification exposes defects.

**Step 1: Run full test suite**

Run: `npm test`

Expected: PASS with no warnings requiring action.

**Step 2: Run build**

Run: `npm run build`

Expected: PASS.

**Step 3: Start local server**

Run: `npm run dev`

Expected: app available locally and dashboard renders.

**Step 4: Commit fixes if needed**

```bash
git add <fixed-files>
git commit -m "fix: resolve MVP verification issues"
```

### Task 10: Deploy To Render

**Files:**
- Modify only if Render deployment exposes defects.

**Step 1: Validate secrets handling**

Confirm the Render API key is only used as an environment variable or CLI credential and is never written to source files, logs, `.env`, or committed files.

**Step 2: Create Render services**

Use the Render Blueprint in `render.yaml` or Render API to create the web service, worker service, PostgreSQL database, and Redis instance.

**Step 3: Configure environment variables**

Set production values in Render Dashboard or via API:

- `DATABASE_URL`
- `REDIS_URL`
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`
- `EBAY_CLIENT_ID`
- `EBAY_CLIENT_SECRET`
- `EBAY_REDIRECT_URI`

Use placeholders for unavailable third-party keys in the first deployment.

**Step 4: Verify production app**

Open the deployed Render URL and confirm the Command Center loads, product packet links work, and API route returns dashboard data.

**Step 5: Commit deployment fixes if needed**

```bash
git add <fixed-files>
git commit -m "fix: prepare ProfitPilot for Render deployment"
```
