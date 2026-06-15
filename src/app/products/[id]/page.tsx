import { notFound } from "next/navigation";
import { ProductPacket } from "@/components/ProductPacket";
import { mockRepository } from "@/lib/mock-data";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = mockRepository.products.find((item) => item.id === id);
  const supplier = mockRepository.supplierProducts.find((item) => item.productId === id);
  const profit = mockRepository.profitAnalyses.find((item) => item.productId === id);
  const risk = mockRepository.riskAssessments.find((item) => item.productId === id);
  const draft = mockRepository.listingDrafts.find((item) => item.productId === id);
  const actions = mockRepository.automationActions.filter((item) => item.productId === id);

  if (!product || !supplier || !profit || !risk || !draft) {
    notFound();
  }

  return (
    <ProductPacket
      actions={actions}
      draft={draft}
      product={product}
      profit={profit}
      risk={risk}
      supplier={supplier}
    />
  );
}
