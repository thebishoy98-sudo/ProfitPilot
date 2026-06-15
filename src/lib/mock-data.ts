import type {
  AutomationAction,
  ListingDraft,
  ListingMetric,
  Notification,
  Opportunity,
  Product,
  ProfitAnalysis,
  ProfitPilotRepository,
  RiskAssessment,
  SupplierProduct,
} from "./domain";

export const products: Product[] = [
  {
    id: "prod-001",
    title: "Compact USB-C Travel Dock",
    category: "Electronics",
    marketplace: "eBay",
    salePrice: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-002",
    title: "Adjustable Bamboo Laptop Stand",
    category: "Office",
    marketplace: "eBay",
    salePrice: 42.5,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-003",
    title: "Insulated Stainless Meal Prep Jar",
    category: "Kitchen",
    marketplace: "eBay",
    salePrice: 27.95,
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-004",
    title: "LED Clip Reading Light",
    category: "Home",
    marketplace: "eBay",
    salePrice: 18.49,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-005",
    title: "Herbal Sleep Supplement",
    category: "Supplements",
    marketplace: "eBay",
    salePrice: 21.99,
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "prod-006",
    title: "Waterproof Bike Saddle Bag",
    category: "Sporting Goods",
    marketplace: "eBay",
    salePrice: 24.75,
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
  },
];

export const supplierProducts: SupplierProduct[] = [
  { id: "sup-001", productId: "prod-001", supplierName: "Metro Wholesale", supplierUrl: "https://supplier.example/dock", cost: 9.25, shippingCost: 1.5, shippingDays: 4, inStock: true, priceIncreasePercent: 0 },
  { id: "sup-002", productId: "prod-002", supplierName: "DeskPro Direct", supplierUrl: "https://supplier.example/stand", cost: 16.4, shippingCost: 0, shippingDays: 5, inStock: true, priceIncreasePercent: 3 },
  { id: "sup-003", productId: "prod-003", supplierName: "Kitchen Source", supplierUrl: "https://supplier.example/jar", cost: 8.8, shippingCost: 2.1, shippingDays: 6, inStock: true, priceIncreasePercent: 0 },
  { id: "sup-004", productId: "prod-004", supplierName: "HomeGoods Hub", supplierUrl: "https://supplier.example/light", cost: 5.2, shippingCost: 1.25, shippingDays: 8, inStock: false, priceIncreasePercent: 0 },
  { id: "sup-005", productId: "prod-005", supplierName: "Wellness Drop", supplierUrl: "https://supplier.example/sleep", cost: 7.4, shippingCost: 2.5, shippingDays: 8, inStock: true, priceIncreasePercent: 0 },
  { id: "sup-006", productId: "prod-006", supplierName: "Cycle Yard", supplierUrl: "https://supplier.example/bag", cost: 7.95, shippingCost: 1.75, shippingDays: 4, inStock: true, priceIncreasePercent: 12 },
];

export const opportunities: Opportunity[] = [
  { id: "opp-001", productId: "prod-001", score: 94, expectedMonthlySales: 42, reason: "Strong margin with frequent completed sales" },
  { id: "opp-002", productId: "prod-002", score: 88, expectedMonthlySales: 24, reason: "Office category demand is steady" },
  { id: "opp-003", productId: "prod-003", score: 83, expectedMonthlySales: 31, reason: "Kitchen accessory velocity is rising" },
  { id: "opp-004", productId: "prod-004", score: 52, expectedMonthlySales: 8, reason: "Supplier is currently out of stock" },
  { id: "opp-005", productId: "prod-005", score: 30, expectedMonthlySales: 12, reason: "Restricted category review required" },
  { id: "opp-006", productId: "prod-006", score: 76, expectedMonthlySales: 19, reason: "Seasonal cycling demand with supplier alert" },
];

export const profitAnalyses: ProfitAnalysis[] = [
  { productId: "prod-001", estimatedProfit: 16.49, margin: 47.13, recommendation: "APPROVE" },
  { productId: "prod-002", estimatedProfit: 14.35, margin: 33.76, recommendation: "APPROVE" },
  { productId: "prod-003", estimatedProfit: 9.37, margin: 33.52, recommendation: "APPROVE" },
  { productId: "prod-004", estimatedProfit: 5.19, margin: 28.07, recommendation: "REJECT" },
  { productId: "prod-005", estimatedProfit: 6.12, margin: 27.83, recommendation: "REJECT" },
  { productId: "prod-006", estimatedProfit: 8.58, margin: 34.67, recommendation: "WATCH" },
];

export const riskAssessments: RiskAssessment[] = [
  { productId: "prod-001", level: "LOW", flags: [], summary: "Commodity electronics with standard shipping risk." },
  { productId: "prod-002", level: "LOW", flags: [], summary: "Durable office item with low compliance risk." },
  { productId: "prod-003", level: "MEDIUM", flags: ["breakable_packaging"], summary: "Monitor packaging quality and return reasons." },
  { productId: "prod-004", level: "MEDIUM", flags: ["supplier_out_of_stock"], summary: "Pause listing until supplier stock returns." },
  { productId: "prod-005", level: "HIGH", flags: ["restricted_category", "claims_review"], summary: "Supplements require policy review before listing." },
  { productId: "prod-006", level: "MEDIUM", flags: ["supplier_price_increase"], summary: "Supplier cost changed enough to review price." },
];

export const listingDrafts: ListingDraft[] = products.map((product) => ({
  productId: product.id,
  title: product.title,
  description: `${product.title} sourced for fast marketplace fulfillment with verified supplier context.`,
  keywords: [product.category.toLowerCase(), "dropship", "fast shipping"],
}));

export const listingMetrics: ListingMetric[] = [
  { productId: "prod-001", activeDays: 14, views: 420, watchers: 18, salesLast7Days: 7, totalSales: 15, returnRate: 0.02 },
  { productId: "prod-002", activeDays: 22, views: 260, watchers: 9, salesLast7Days: 3, totalSales: 8, returnRate: 0.01 },
  { productId: "prod-003", activeDays: 18, views: 310, watchers: 12, salesLast7Days: 4, totalSales: 10, returnRate: 0.04 },
  { productId: "prod-004", activeDays: 35, views: 90, watchers: 0, salesLast7Days: 0, totalSales: 0, returnRate: 0 },
  { productId: "prod-005", activeDays: 3, views: 32, watchers: 1, salesLast7Days: 0, totalSales: 0, returnRate: 0 },
  { productId: "prod-006", activeDays: 30, views: 180, watchers: 5, salesLast7Days: 1, totalSales: 4, returnRate: 0.03 },
];

export const automationActions: AutomationAction[] = [
  { id: "act-001", productId: "prod-001", type: "RAISE_PRICE", priority: "MEDIUM", message: "Winner listing can absorb a small price increase." },
  { id: "act-002", productId: "prod-004", type: "END_LISTING", priority: "HIGH", message: "End stale listing with no watchers and no sales." },
  { id: "act-003", productId: "prod-006", type: "RESTOCK_CHECK", priority: "HIGH", message: "Supplier price increase requires margin review." },
];

export const notifications: Notification[] = [
  { id: "note-001", productId: "prod-004", severity: "CRITICAL", message: "Supplier out of stock." },
  { id: "note-002", productId: "prod-005", severity: "WARNING", message: "Restricted category review needed." },
  { id: "note-003", productId: "prod-006", severity: "WARNING", message: "Supplier cost increased 12%." },
];

export const mockRepository: ProfitPilotRepository = {
  products,
  supplierProducts,
  opportunities,
  profitAnalyses,
  riskAssessments,
  listingDrafts,
  listingMetrics,
  automationActions,
  notifications,
};
