import type { ActiveListing } from "@/lib/dashboard";

type ListingPerformanceProps = {
  listings: ActiveListing[];
};

export function ListingPerformance({ listings }: ListingPerformanceProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Active Listings</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Watchers</th>
              <th className="px-4 py-3">7d Sales</th>
              <th className="px-4 py-3">Margin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {listings.slice(0, 6).map((listing) => (
              <tr key={listing.productId}>
                <td className="px-4 py-3 font-medium text-slate-950">{listing.product.title}</td>
                <td className="px-4 py-3 text-slate-700">{listing.views}</td>
                <td className="px-4 py-3 text-slate-700">{listing.watchers}</td>
                <td className="px-4 py-3 text-slate-700">{listing.salesLast7Days}</td>
                <td className="px-4 py-3 text-slate-700">{listing.profit.margin.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
