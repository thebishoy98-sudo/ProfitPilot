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
