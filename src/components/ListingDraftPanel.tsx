import type { ListingDraft } from "@/lib/domain";

type ListingDraftPanelProps = {
  draft: ListingDraft;
};

export function ListingDraftPanel({ draft }: ListingDraftPanelProps) {
  return (
    <section className="rounded border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold text-slate-950">Listing Draft</h2>
      </div>
      <div className="space-y-3 p-4">
        <p className="font-medium text-slate-950">{draft.title}</p>
        <p className="text-sm text-slate-600">{draft.description}</p>
        <div>
          <h3 className="text-sm font-semibold text-slate-950">Bullet Points</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {draft.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-950">Item Specifics</h3>
            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              {Object.entries(draft.itemSpecifics).map(([key, value]) => (
                <div className="flex justify-between gap-4" key={key}>
                  <dt>{key}</dt>
                  <dd className="font-medium text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-950">Category Recommendation</h3>
              <p className="mt-1 text-sm text-slate-600">{draft.categoryRecommendation}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-950">Price Recommendation</h3>
              <p className="mt-1 text-sm font-semibold text-teal-700">${draft.priceRecommendation.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {draft.keywords.map((keyword) => (
            <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700" key={keyword}>
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
