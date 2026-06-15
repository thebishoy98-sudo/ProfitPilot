# Roadmap: ProfitPilot

## Overview

ProfitPilot starts with an architecture-backed MVP demo that proves the operator workflow using mocked data and deterministic engines. Later phases replace mocks with supplier ingestion, eBay integration, real AI agents, and scale-oriented marketplace automation.

## Phases

- [x] **Phase 1: MVP Demo Foundation** - Build the deployable dashboard, domain model, business engines, product packet, schema, and Render blueprint.
- [ ] **Phase 2: Supplier Ingestion** - Add real supplier URL capture, extraction, snapshots, and supplier alerts.
- [ ] **Phase 3: eBay Integration** - Add OAuth, draft listing creation, inventory sync, and metrics import.
- [ ] **Phase 4: Agent Automation** - Add real AI agent orchestration, audit logs, scheduled workers, and approval workflows.

## Phase Details

### Phase 1: MVP Demo Foundation

**Goal**: User can open a deployed ProfitPilot operations console showing mock opportunities, profit/risk analysis, listing drafts, automation actions, and Render-ready infrastructure.
**Depends on**: Nothing (first phase)
**Requirements**: [FOUND-01, FOUND-02, FOUND-03, PROFIT-01, PROFIT-02, PROFIT-03, PROFIT-04, RISK-01, RISK-02, AUTO-01, AUTO-02, AUTO-03, AUTO-04, UX-01, UX-02, UX-03, UX-04, DEPLOY-01, DEPLOY-02, DEPLOY-03]
**Success Criteria** (what must be TRUE):
  1. User can view a ProfitPilot Command Center dashboard.
  2. User can inspect top opportunities, supplier alerts, recommended actions, and active listing performance.
  3. User can open a product packet with supplier, profit, risk, and listing draft sections.
  4. Profit, risk, and automation behavior is covered by failing-first tests.
  5. The project builds and includes Render deployment configuration.
**Plans**: 1 plan

Plans:
- [x] 01-01: Build ProfitPilot MVP demo foundation

### Phase 2: Supplier Ingestion

**Goal**: User can add supplier URLs and monitor supplier changes over time.
**Depends on**: Phase 1
**Requirements**: [SUPPLIER-01, SUPPLIER-02]
**Success Criteria** (what must be TRUE):
  1. User can add a supplier URL to a product.
  2. The system records supplier snapshots.
  3. The system alerts on price, stock, shipping, and delivery changes.
**Plans**: TBD

Plans:
- [ ] TBD (run `$gsd-plan-phase 2`)

### Phase 3: eBay Integration

**Goal**: User can connect eBay and create draft listings from approved ProfitPilot drafts.
**Depends on**: Phase 2
**Requirements**: [EBAY-01, EBAY-02]
**Success Criteria** (what must be TRUE):
  1. User can connect an eBay account with OAuth.
  2. User can create an eBay draft from an approved listing draft.
  3. Marketplace action errors are visible and auditable.
**Plans**: TBD

Plans:
- [ ] TBD (run `$gsd-plan-phase 3`)

### Phase 4: Agent Automation

**Goal**: Real AI and automation workers generate recommendations, listing drafts, and analytics with audit logs and approval gates.
**Depends on**: Phase 3
**Requirements**: [AI-01]
**Success Criteria** (what must be TRUE):
  1. Agent runs are stored with input/output audit records.
  2. Listing drafts are generated through a provider abstraction.
  3. Automation actions require approval before destructive marketplace changes.
**Plans**: TBD

Plans:
- [ ] TBD (run `$gsd-plan-phase 4`)

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. MVP Demo Foundation | 1/1 | Complete | 2026-06-15 |
| 2. Supplier Ingestion | 0/TBD | Not started | - |
| 3. eBay Integration | 0/TBD | Not started | - |
| 4. Agent Automation | 0/TBD | Not started | - |
