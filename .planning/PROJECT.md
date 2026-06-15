# Project: ProfitPilot

## Core Value

ProfitPilot helps an eBay arbitrage seller operate like they have an AI employee: finding opportunities, checking supplier conditions, calculating profit, drafting listings, monitoring performance, and recommending actions.

## Current Scope

The first executable milestone is a deployable MVP demo app. It should use mocked marketplace and supplier data, deterministic business engines, and a polished operator dashboard. Real eBay, supplier extraction, and AI-provider calls are deferred behind interfaces.

## Key Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-06-15 | Use architecture/spec first | The product scope is broad and needs a durable foundation before code. |
| 2026-06-15 | Build a Next.js MVP first | A single deployable app is the fastest path to a usable Render-hosted foundation. |
| 2026-06-15 | Keep AI behind audited services | Profit math, risk gates, and publishing decisions must be deterministic and reviewable. |

## Constraints

- Do not commit secrets, credentials, API keys, `.env`, or marketplace tokens.
- Keep files under 500 lines.
- Validate inputs at API boundaries.
- Use TDD for production behavior.
- Default to user approval for marketplace publishing and destructive actions.

## Source Documents

- `docs/plans/2026-06-15-profitpilot-design.md`
- `docs/plans/2026-06-15-profitpilot-mvp-implementation.md`
