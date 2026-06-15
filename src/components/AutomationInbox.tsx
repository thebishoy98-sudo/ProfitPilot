import type { AutomationAction } from "@/lib/domain";

type AutomationInboxProps = {
  actions: AutomationAction[];
};

export function AutomationInbox({ actions }: AutomationInboxProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Recommended Actions</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {actions.map((action) => (
          <div className="px-4 py-3" key={action.id}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-950">{action.type.replaceAll("_", " ")}</p>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                {action.priority}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{action.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
