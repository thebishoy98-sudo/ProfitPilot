import { ListingDraftPanel } from "@/components/ListingDraftPanel";
import { ProfitBreakdown } from "@/components/ProfitBreakdown";
import { RiskPanel } from "@/components/RiskPanel";
import type {
  AutomationAction,
  ListingDraft,
  Product,
  ProfitAnalysis,
  RiskAssessment,
  SupplierProduct,
} from "@/lib/domain";

type ProductPacketProps = {
  product: Product;
  supplier: SupplierProduct;
  profit: ProfitAnalysis;
  risk: RiskAssessment;
  draft: ListingDraft;
  actions: AutomationAction[];
};

export function ProductPacket({ product, supplier, profit, risk, draft, actions }: ProductPacketProps) {
  return (
    <main className="min-h-screen bg-panel px-4 py-6 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-4">
          <section className="overflow-hidden rounded border border-slate-200 bg-white">
            <img alt="" className="aspect-[4/3] w-full object-cover" src={product.imageUrl} />
            <div className="space-y-2 p-4">
              <p className="text-sm font-semibold uppercase text-accent">Product Packet</p>
              <h1 className="text-2xl font-semibold text-slate-950">{product.title}</h1>
              <p className="text-sm text-slate-600">{product.category} · {product.marketplace}</p>
            </div>
          </section>

          <section className="rounded border border-slate-200 bg-white p-4">
            <h2 className="text-base font-semibold text-slate-950">Supplier Context</h2>
            <p className="mt-2 text-sm text-slate-600">{supplier.supplierName}</p>
            <p className="text-sm text-slate-600">{supplier.shippingDays} day shipping</p>
            <p className="text-sm text-slate-600">{supplier.inStock ? "In stock" : "Out of stock"}</p>
          </section>
        </aside>

        <div className="grid gap-6">
          <ProfitBreakdown profit={profit} salePrice={product.salePrice} supplier={supplier} />
          <RiskPanel risk={risk} />
          <ListingDraftPanel draft={draft} />
          <section className="rounded border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-base font-semibold text-slate-950">Action History</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {actions.map((action) => (
                <div className="px-4 py-3" key={action.id}>
                  <p className="text-sm font-semibold text-slate-950">{action.type.replaceAll("_", " ")}</p>
                  <p className="text-sm text-slate-600">{action.message}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
