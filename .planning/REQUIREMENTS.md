# Requirements: ProfitPilot

**Defined:** 2026-06-15
**Core Value:** AI-assisted eBay arbitrage operations console.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: User can open a ProfitPilot web dashboard.
- [x] **FOUND-02**: The app has typed domain records for products, opportunities, suppliers, listings, metrics, actions, and notifications.
- [x] **FOUND-03**: The app includes realistic mock data linked across the opportunity lifecycle.

### Profit And Risk

- [x] **PROFIT-01**: The app calculates estimated net profit from sale price, supplier cost, fees, reserves, and buffers.
- [x] **PROFIT-02**: The app calculates margin percentage.
- [x] **PROFIT-03**: The app rejects products below `$8` profit or `25%` margin.
- [x] **PROFIT-04**: The app rejects out-of-stock supplier products.
- [x] **RISK-01**: The app assigns LOW, MEDIUM, or HIGH risk.
- [x] **RISK-02**: The app flags restricted, medical, counterfeit, fragile, battery, trademark, and long-shipping risk signals.

### Automation

- [x] **AUTO-01**: The app recommends ending loser listings after 30 active days, 0 sales, and under 100 views.
- [x] **AUTO-02**: The app recommends reducing price by 5% for high-interest listings with 250+ views, 5+ watchers, and 0 sales.
- [x] **AUTO-03**: The app recommends increasing price by 3% for winner listings with 5+ sales in 7 days, 30%+ margin, and under 5% return rate.
- [x] **AUTO-04**: The app recommends pausing listings when a supplier is out of stock or supplier price increases by more than 20%.

### Operator UX

- [x] **UX-01**: The dashboard shows revenue, estimated profit, active listings, top opportunities, supplier alerts, and recommended actions.
- [x] **UX-02**: The opportunity queue shows demand, competition, trend, risk, opportunity score, and estimated profit.
- [x] **UX-03**: The product packet shows supplier data, profit analysis, risk assessment, listing draft, images, and action history.
- [x] **UX-04**: The listing studio panel shows generated title, description, bullets, item specifics, category, keywords, and price recommendation.

### Deployment

- [x] **DEPLOY-01**: The app has a PostgreSQL-ready Prisma schema matching the approved architecture.
- [x] **DEPLOY-02**: The app has a Render Blueprint for web, worker, PostgreSQL, and Redis resources.
- [x] **DEPLOY-03**: The repo includes `.env.example` placeholders but no real secrets.

## v2 Requirements

### Integrations

- **EBAY-01**: User can connect an eBay account with OAuth.
- **EBAY-02**: User can create eBay draft listings from approved listing drafts.
- **SUPPLIER-01**: User can ingest Temu and Shein supplier URLs.
- **SUPPLIER-02**: The system monitors supplier price, stock, shipping, and delivery changes over time.
- **AI-01**: The system generates listing drafts through a real AI provider with prompt/version audit logs.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real eBay publishing | Requires OAuth credentials, account policy handling, and marketplace validation after MVP. |
| Real supplier scraping | Temu/Shein extraction can be brittle and should follow the mocked MVP foundation. |
| Automatic high-risk publishing | Explicitly unsafe for marketplace compliance. |
| Real payment or subscription billing | Monetization comes after product workflow validation. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| PROFIT-01 | Phase 1 | Complete |
| PROFIT-02 | Phase 1 | Complete |
| PROFIT-03 | Phase 1 | Complete |
| PROFIT-04 | Phase 1 | Complete |
| RISK-01 | Phase 1 | Complete |
| RISK-02 | Phase 1 | Complete |
| AUTO-01 | Phase 1 | Complete |
| AUTO-02 | Phase 1 | Complete |
| AUTO-03 | Phase 1 | Complete |
| AUTO-04 | Phase 1 | Complete |
| UX-01 | Phase 1 | Complete |
| UX-02 | Phase 1 | Complete |
| UX-03 | Phase 1 | Complete |
| UX-04 | Phase 1 | Complete |
| DEPLOY-01 | Phase 1 | Complete |
| DEPLOY-02 | Phase 1 | Complete |
| DEPLOY-03 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0

---
*Requirements defined: 2026-06-15*
*Last updated: 2026-06-15 after approved architecture/spec*
