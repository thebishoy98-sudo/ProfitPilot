import Link from "next/link";
import type { EnrichedOpportunity } from "@/lib/dashboard";

type OpportunityQueueProps = {
  opportunities: EnrichedOpportunity[];
};

export function OpportunityQueue({ opportunities }: OpportunityQueueProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Top Opportunities</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {opportunities.slice(0, 4).map((opportunity) => (
          <Link
            className="grid gap-3 px-4 py-3 hover:bg-slate-50 sm:grid-cols-[1fr_auto]"
            href={`/products/${opportunity.productId}`}
            key={opportunity.id}
          >
            <div>
              <p className="font-medium text-slate-950">{opportunity.product.title}</p>
              <p className="text-sm text-slate-600">{opportunity.reason}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 sm:grid-cols-4">
                <span>
                  <span className="font-semibold text-slate-800">Demand</span> {opportunity.demandScore}
                </span>
                <span>
                  <span className="font-semibold text-slate-800">Competition</span> {opportunity.competitionScore}
                </span>
                <span>
                  <span className="font-semibold text-slate-800">Trend</span> {opportunity.trendScore}
                </span>
                <span>
                  <span className="font-semibold text-slate-800">Risk</span> {opportunity.risk.level}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="font-semibold text-teal-700">${opportunity.profit.estimatedProfit.toFixed(2)}</p>
              <p className="text-xs text-slate-500">{opportunity.score} score</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
