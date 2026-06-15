import type { ProfitAnalysis, SupplierProduct } from "@/lib/domain";

type ProfitBreakdownProps = {
  profit: ProfitAnalysis;
  supplier: SupplierProduct;
  salePrice: number;
};

export function ProfitBreakdown({ profit, supplier, salePrice }: ProfitBreakdownProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Profit Analysis</h2>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-slate-100 text-sm">
        <div className="bg-white p-4">
          <dt className="text-slate-500">Sale price</dt>
          <dd className="mt-1 font-semibold text-slate-950">${salePrice.toFixed(2)}</dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-slate-500">Supplier cost</dt>
          <dd className="mt-1 font-semibold text-slate-950">${(supplier.cost + supplier.shippingCost).toFixed(2)}</dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-slate-500">Estimated profit</dt>
          <dd className="mt-1 font-semibold text-teal-700">${profit.estimatedProfit.toFixed(2)}</dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-slate-500">Margin</dt>
          <dd className="mt-1 font-semibold text-slate-950">{profit.margin.toFixed(2)}%</dd>
        </div>
      </dl>
    </section>
  );
}
