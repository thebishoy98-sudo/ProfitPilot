import type { RiskAssessment } from "@/lib/domain";

type RiskPanelProps = {
  risk: RiskAssessment;
};

export function RiskPanel({ risk }: RiskPanelProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Risk Assessment</h2>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-sm font-semibold text-slate-950">{risk.level} risk</p>
        <p className="text-sm text-slate-600">{risk.summary}</p>
        <div className="flex flex-wrap gap-2">
          {risk.flags.length === 0 ? (
            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">no flags</span>
          ) : (
            risk.flags.map((flag) => (
              <span className="rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900" key={flag}>
                {flag.replaceAll("_", " ")}
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
