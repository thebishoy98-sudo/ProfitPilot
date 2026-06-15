# ProfitPilot Architecture And Product Spec

## Product Vision

ProfitPilot is an AI-powered eCommerce arbitrage platform that acts like a virtual store operator. It discovers product opportunities, evaluates supplier and marketplace fit, calculates profit, drafts optimized eBay listings, monitors active listings, recommends actions, and helps scale an eBay business with less manual work.

The platform should prioritize recommendations and operational actions over raw data. AI agents assist with discovery, analysis, listing generation, image review, monitoring, and analytics, while deterministic business rules handle math, approval gates, and marketplace safety.

## Product Architecture

ProfitPilot should start as a modular SaaS-style platform with one web app, one API backend, one worker system, and an agent orchestration layer.

Core modules:

- Dashboard: prioritized operator view showing opportunities, active listings, supplier alerts, profit, revenue, and recommended actions.
- Opportunity Pipeline: discovers or accepts products, scores them, and moves approved opportunities through analysis.
- Supplier Intelligence: stores supplier URLs, extracted product data, stock, shipping time, price, images, and change history.
- Profit Engine: deterministic calculator for profit, margin, fees, buffers, and approval or rejection decisions.
- Risk Engine: rule-based first, AI-assisted later, for trademark, counterfeit, restricted category, shipping, return, and compliance risk.
- Listing Studio: AI-generated eBay listing drafts with title, description, item specifics, category, keywords, price recommendation, and image review.
- Marketplace Integrations: eBay first, with clean interfaces for Amazon, Walmart, Etsy, Shopify, and Facebook Marketplace later.
- Automation Rules: loser, winner, high-interest, and supplier-change rules run on schedules and generate recommended actions.
- Analytics Layer: aggregates performance by product, category, supplier, listing status, margin, revenue, and profit.

Recommended first technical shape:

- Frontend: Next.js and React dashboard.
- Backend: Node.js API, using NestJS or a lightweight Express/Fastify service.
- Database: PostgreSQL.
- Queue and Workers: Redis-backed jobs for scraping, scoring, monitoring, listing generation, and automation rules.
- AI Layer: provider-abstracted service so OpenAI or another model provider can be swapped.
- Deployment: Render web service, worker service, managed PostgreSQL, and managed Redis.

The system should treat AI as an assistant, not the source of truth. Profit math, thresholds, business rules, and publishing permissions must be deterministic and auditable.

## AI Agent Architecture

ProfitPilot should use specialized agents coordinated by an Automation Manager. Agents write structured outputs to the database instead of directly acting on the store.

Agents:

- Opportunity Hunter: finds or evaluates product ideas from Amazon signals, eBay sold listings, Google Trends, and manual submissions. Outputs demand, competition, trend, risk, and opportunity scores.
- Supplier Agent: ingests supplier URLs such as Temu and Shein, extracts price, shipping, stock, variants, images, and monitors changes over time.
- Profit Analyst: calculates net profit and margin using fixed business rules. This should be deterministic code with optional AI explanation.
- Risk Engine: assigns LOW, MEDIUM, or HIGH risk using rules first, then AI review for ambiguous cases.
- AI Listing Agent: generates original eBay-ready listing drafts without copying supplier or Amazon descriptions, naming suppliers, or making unsafe claims.
- Image Agent: reviews supplier images, flags branding and watermarks, and recommends clean listing image options.
- Store Manager Agent: monitors live listings, classifies winners, losers, and review-needed products, and tracks performance.
- Analytics Agent: summarizes business trends and produces recommendations.
- Automation Manager: evaluates scheduled rules and creates proposed actions like pause listing, lower price, increase price, end listing, or notify user.

Important control rule: agents should not publish high-risk products or execute destructive marketplace actions without approval. In v1, agents create recommendations and drafts; the user approves publication and major changes.

## Business Workflow

1. Product idea enters the system.
2. Opportunity Hunter scores it.
3. Supplier Agent attaches supplier data.
4. Profit Analyst approves or rejects it financially.
5. Risk Engine assigns risk.
6. Listing Agent drafts listing content.
7. Image Agent flags image concerns.
8. User approves.
9. eBay integration creates a draft or publishes.
10. Store Manager and Automation Manager monitor performance.

This keeps the product operator-like while preserving auditability and control.

## Database Design

The database should center on the product opportunity lifecycle: idea, supplier match, profitability review, risk review, listing draft, marketplace listing, performance history.

Primary tables:

- users: account, auth identity, role, and settings.
- stores: marketplace stores, connection status, and eBay account metadata.
- products: canonical product record with normalized title, category, brand, identifiers, description summary, and lifecycle status.
- opportunities: discovery and scoring record linked to a product, including source, demand score, competition score, trend score, risk score, opportunity score, rank, and status.
- suppliers: supplier marketplace metadata such as Temu, Shein, manual supplier, and future wholesale sources.
- supplier_products: supplier URL and extracted product data, including title, cost, shipping cost, delivery estimate, stock status, quantity, variants, images, and last checked timestamp.
- supplier_snapshots: historical supplier observations for price, stock, shipping, and delivery changes.
- profit_analyses: sale price, supplier cost, fees, promoted listing cost, return reserve, delay buffer, estimated profit, margin, recommendation, and rejection reasons.
- risk_assessments: risk level, risk flags, restricted category indicators, trademark or counterfeit concerns, explanation, and reviewer.
- listing_drafts: generated eBay listing content, title, subtitle, bullets, description, item specifics, category recommendation, SEO keywords, price recommendation, and draft status.
- listing_images: supplier image URLs, processed image URLs, watermark or branding flags, and approval status.
- marketplace_listings: eBay listing IDs, SKU, inventory item ID, offer ID, listing status, published price, quantity, and linked draft.
- listing_metrics: time-series metrics such as views, watchers, clicks, sales, revenue, estimated profit, return count, and conversion rate.
- automation_rules: configurable rule definitions for loser, winner, high-interest, and supplier alerts.
- automation_actions: proposed or executed actions, approval state, and execution log.
- agent_runs: audit log for each agent invocation, inputs, outputs, status, model, token and cost metadata, and errors.
- notifications: user-facing alerts for supplier changes, listing issues, risk changes, and recommended actions.

Key design choice: store every score, decision, and generated listing as a versioned and auditable record. This matters because eCommerce automation needs traceability when products fail, suppliers change, or marketplace rules reject a listing.

## API Design

The API should be organized by business workflow, not internal agent names.

Core endpoints:

- `POST /opportunities/manual`: submit a product or supplier URL manually.
- `GET /opportunities`: list ranked opportunities with filters for status, score, category, source, and risk.
- `POST /opportunities/:id/analyze`: run supplier lookup, profit analysis, risk assessment, and listing draft generation.
- `GET /products/:id`: show the full product packet.
- `POST /supplier-products`: add a supplier URL.
- `POST /supplier-products/:id/refresh`: re-check supplier price, stock, delivery time, and images.
- `POST /listing-drafts/:id/regenerate`: regenerate listing content with constraints.
- `POST /listing-drafts/:id/approve`: mark a draft approved by the user.
- `POST /marketplace/ebay/connect`: begin eBay OAuth.
- `POST /marketplace/ebay/drafts`: create an eBay draft from an approved listing draft.
- `POST /marketplace/ebay/publish`: publish only if profit, risk, and business rules allow it.
- `GET /automation/actions`: show pending recommended actions.
- `POST /automation/actions/:id/approve`: approve a proposed action.
- `GET /analytics/dashboard`: return dashboard KPIs, top opportunities, alerts, winners, losers, and recommendations.

Worker jobs:

- `discover.opportunities`
- `supplier.extract`
- `supplier.monitor`
- `profit.analyze`
- `risk.assess`
- `listing.generate`
- `image.review`
- `ebay.syncMetrics`
- `automation.evaluateRules`
- `analytics.refresh`

## Deployment Architecture

Render deployment strategy:

- Web Service: Next.js app and API, or separate frontend and backend if needed.
- Worker Service: background jobs for supplier monitoring, AI generation, marketplace sync, and automation rules.
- PostgreSQL: primary relational database.
- Redis: queue backend and short-lived job state.
- Environment variables: eBay credentials, AI API keys, session secret, database URL, Redis URL, and Render service URLs.
- Cron Jobs: scheduled supplier monitoring, marketplace metric sync, analytics refresh, and automation evaluation.

Security posture:

- Never store supplier, marketplace, AI, or Render credentials in source.
- Encrypt marketplace OAuth tokens at rest.
- Log agent decisions and API calls without leaking secrets.
- Validate all supplier URLs and marketplace actions at the API boundary.
- Require explicit user approval for high-risk or destructive actions.

## User Experience

The UX should feel like an operations console for an employee managing the store.

Primary screens:

- Command Center: revenue, estimated profit, active listings, top opportunities, supplier alerts, winners, failed products, and recommended actions.
- Opportunity Queue: ranked products with demand, competition, trend, risk, opportunity score, estimated profit, and decision status.
- Product Packet: full review workspace for one product, including supplier data, profit math, risk assessment, generated listing, images, metrics, and action history.
- Listing Studio: review and edit generated eBay title, description, bullets, item specifics, category, pricing, and image approvals.
- Supplier Monitor: supplier URLs, stock status, price changes, delivery changes, out-of-stock alerts, and affected listings.
- Automation Inbox: pending actions requiring approval, such as pause, end, reduce price, increase price, publish draft, or investigate risk.
- Analytics: profit by category, supplier, product, listing status, trend direction, winners, losers, and marketplace performance.

## Business Rules

Default rules:

- Minimum profit: `$8`.
- Minimum margin: `25%`.
- Reject if supplier is out of stock.
- Reject if high risk unless manually overridden.
- Pause if supplier is out of stock.
- Pause if supplier price increases over `20%`.
- End loser if active 30 days, 0 sales, and under 100 views.
- Reduce price 5% if 250 or more views, 5 or more watchers, and 0 sales.
- Increase price 3% if 5 or more sales in 7 days, 30% or higher margin, and under 5% return rate.

## Roadmap

- Phase 1: Architecture/spec. Product architecture, schema, API, workflows, and deployment plan.
- Phase 2: MVP demo. Dashboard, opportunity queue, product packet, profit calculator, risk flags, generated listing drafts, and mocked supplier/eBay data.
- Phase 3: Supplier ingestion. Temu and Shein URL capture, structured extraction, supplier snapshots, and stock/price alerts.
- Phase 4: eBay integration. OAuth, draft listings, inventory items, listing sync, and metrics import.
- Phase 5: Automation manager. Rule engine, automation inbox, approval flow, and scheduled evaluations.
- Phase 6: AI agents. Real agent orchestration, prompt and version audit logs, listing generation, risk explanation, and analytics recommendations.
- Phase 7: Scale. Multi-store support, marketplace abstraction, queue scaling, cost controls, and monetization plans.

## Monetization

- Starter monthly subscription for small sellers.
- Usage-based AI and listing generation credits.
- Higher tiers for more monitored listings.
- Premium tier for performance dashboards and automation.
- Future managed-service tier for sellers who want a more hands-off operation.
