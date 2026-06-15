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
