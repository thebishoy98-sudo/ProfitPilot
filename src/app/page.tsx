import { AutomationInbox } from "@/components/AutomationInbox";
import { ListingPerformance } from "@/components/ListingPerformance";
import { MetricStrip } from "@/components/MetricStrip";
import { OpportunityQueue } from "@/components/OpportunityQueue";
import { SupplierAlerts } from "@/components/SupplierAlerts";
import { getDashboardSummary } from "@/lib/dashboard";
import { mockRepository } from "@/lib/mock-data";

export default function HomePage() {
  const summary = getDashboardSummary(mockRepository);

  return (
    <main className="min-h-screen bg-panel px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="flex flex-col gap-3 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase text-accent">Command Center</p>
          <h1 className="text-4xl font-semibold text-slate-950">ProfitPilot</h1>
          <p className="max-w-2xl text-base text-slate-600">
            Daily arbitrage operations, profit approvals, supplier risk, and listing automation in one workspace.
          </p>
        </section>

        <MetricStrip summary={summary} />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <OpportunityQueue opportunities={summary.topOpportunities} />
          <div className="grid gap-6">
            <SupplierAlerts alerts={summary.supplierAlerts} />
            <AutomationInbox actions={summary.recommendedActions} />
          </div>
        </div>

        <ListingPerformance listings={summary.activeListings} />
      </div>
    </main>
  );
}
