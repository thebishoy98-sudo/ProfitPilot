import type {
  AutomationAction,
  ListingMetric,
  Notification,
  Opportunity,
  Product,
  ProfitAnalysis,
  ProfitPilotRepository,
  RiskAssessment,
  SupplierProduct,
} from "./domain";

export type EnrichedOpportunity = Opportunity & {
  product: Product;
  supplier: SupplierProduct;
  profit: ProfitAnalysis;
  risk: RiskAssessment;
};

export type ActiveListing = ListingMetric & {
  product: Product;
  profit: ProfitAnalysis;
};

export type DashboardSummary = {
  estimatedProfit: number;
  approvedCount: number;
  activeListingCount: number;
  riskAlerts: number;
  topOpportunities: EnrichedOpportunity[];
  activeListings: ActiveListing[];
  winners: ActiveListing[];
  failedProducts: ActiveListing[];
  supplierAlerts: Notification[];
  recommendedActions: AutomationAction[];
};

const byProductId = <T extends { productId: string }>(records: T[]) =>
  new Map(records.map((record) => [record.productId, record]));

export function getDashboardSummary(repository: ProfitPilotRepository): DashboardSummary {
  const productsById = new Map(repository.products.map((product) => [product.id, product]));
  const suppliersByProduct = byProductId(repository.supplierProducts);
  const profitsByProduct = byProductId(repository.profitAnalyses);
  const risksByProduct = byProductId(repository.riskAssessments);

  const topOpportunities = repository.opportunities
    .map((opportunity) => {
      const product = productsById.get(opportunity.productId);
      const supplier = suppliersByProduct.get(opportunity.productId);
      const profit = profitsByProduct.get(opportunity.productId);
      const risk = risksByProduct.get(opportunity.productId);

      if (!product || !supplier || !profit || !risk) {
        return null;
      }

      return { ...opportunity, product, supplier, profit, risk };
    })
    .filter((opportunity): opportunity is EnrichedOpportunity => opportunity !== null)
    .sort((a, b) => b.score - a.score);

  const activeListings = repository.listingMetrics
    .map((metric) => {
      const product = productsById.get(metric.productId);
      const profit = profitsByProduct.get(metric.productId);
      return product && profit ? { ...metric, product, profit } : null;
    })
    .filter((listing): listing is ActiveListing => listing !== null);

  const winners = activeListings.filter((listing) => listing.salesLast7Days >= 3 && listing.profit.margin >= 30);
  const failedProducts = activeListings.filter((listing) => listing.activeDays >= 30 && listing.totalSales === 0);
  const estimatedProfit = repository.profitAnalyses.reduce((sum, analysis) => sum + analysis.estimatedProfit, 0);

  return {
    estimatedProfit: Math.round(estimatedProfit * 100) / 100,
    approvedCount: repository.profitAnalyses.filter((analysis) => analysis.recommendation === "APPROVE").length,
    activeListingCount: activeListings.length,
    riskAlerts: repository.riskAssessments.filter((risk) => risk.level !== "LOW").length,
    topOpportunities,
    activeListings,
    winners,
    failedProducts,
    supplierAlerts: repository.notifications.filter((note) => note.severity !== "INFO"),
    recommendedActions: repository.automationActions,
  };
}
