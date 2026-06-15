import type { DashboardSummary } from "@/lib/dashboard";

type MetricStripProps = {
  summary: DashboardSummary;
};

export function MetricStrip({ summary }: MetricStripProps) {
  const metrics = [
    { label: "Estimated Profit", value: `$${summary.estimatedProfit.toFixed(2)}` },
    { label: "Approved Products", value: summary.approvedCount.toString() },
    { label: "Live Listings", value: summary.activeListingCount.toString() },
    { label: "Risk Alerts", value: summary.riskAlerts.toString() },
  ];

  return (
    <section className="grid gap-px overflow-hidden rounded border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-4">
          <p className="text-xs font-semibold uppercase text-slate-500">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950">{metric.value}</p>
        </div>
      ))}
    </section>
  );
}
