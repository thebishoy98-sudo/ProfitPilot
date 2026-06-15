export type ProfitRecommendation = "APPROVE" | "WATCH" | "REJECT";
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type AutomationActionType =
  | "END_LISTING"
  | "PROMOTE_LISTING"
  | "RESTOCK_CHECK"
  | "RAISE_PRICE"
  | "LOWER_PRICE";

export type Product = {
  id: string;
  title: string;
  category: string;
  marketplace: "eBay";
  salePrice: number;
  imageUrl: string;
};

export type SupplierProduct = {
  id: string;
  productId: string;
  supplierName: string;
  supplierUrl: string;
  cost: number;
  shippingCost: number;
  shippingDays: number;
  inStock: boolean;
  priceIncreasePercent: number;
};

export type Opportunity = {
  id: string;
  productId: string;
  score: number;
  expectedMonthlySales: number;
  reason: string;
};

export type ProfitAnalysis = {
  productId: string;
  estimatedProfit: number;
  margin: number;
  recommendation: ProfitRecommendation;
};

export type RiskAssessment = {
  productId: string;
  level: RiskLevel;
  flags: string[];
  summary: string;
};

export type ListingDraft = {
  productId: string;
  title: string;
  description: string;
  keywords: string[];
};

export type ListingMetric = {
  productId: string;
  activeDays: number;
  views: number;
  watchers: number;
  salesLast7Days: number;
  totalSales: number;
  returnRate: number;
};

export type AutomationAction = {
  id: string;
  productId: string;
  type: AutomationActionType;
  priority: "LOW" | "MEDIUM" | "HIGH";
  message: string;
};

export type Notification = {
  id: string;
  productId: string;
  severity: "INFO" | "WARNING" | "CRITICAL";
  message: string;
};

export type ProfitPilotRepository = {
  products: Product[];
  supplierProducts: SupplierProduct[];
  opportunities: Opportunity[];
  profitAnalyses: ProfitAnalysis[];
  riskAssessments: RiskAssessment[];
  listingDrafts: ListingDraft[];
  listingMetrics: ListingMetric[];
  automationActions: AutomationAction[];
  notifications: Notification[];
};
