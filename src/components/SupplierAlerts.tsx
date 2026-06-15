import type { Notification } from "@/lib/domain";

type SupplierAlertsProps = {
  alerts: Notification[];
};

export function SupplierAlerts({ alerts }: SupplierAlertsProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Supplier Alerts</h2>
      </div>
      <div className="divide-y divide-slate-100">
        {alerts.map((alert) => (
          <div className="px-4 py-3" key={alert.id}>
            <p className="text-sm font-semibold text-slate-950">{alert.severity}</p>
            <p className="text-sm text-slate-600">{alert.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
