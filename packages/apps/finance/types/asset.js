// @flow
export type Asset = {
  name: string,
  id: string,
  symbol: string,
  type: 'crypto' | 'bonds' | 'stocks' | 'options' | 'mtf' | 'etf' | 'exchange' | 'indices',
  subType: string,
  assetNumber: number,
  assetSummary: string,
  assetComponents: Array<Asset>,
  etfComponents: Array<Asset>,
  mtfComponents: Array<Asset>,
  relatedAssets: Array<Asset>,
  shareHolders: Array<{
    shareHolderName: string,
    equityHolderPercentage: number,
    holdingMarketCap: number,
  }>,
  eventsPrediction: Array<{
    paymentDate: number,
    exDate: number,
    redemptionRate: number,
    retailTax: number,
    periodicalInterest: number,
  }>,
  value: number,
  USDValue: number,
  baseValue: number,
  openingValue: number,
  dailyHigh: number,
  dailyLow: number,
  changePercentage: number,
  numeralChange: number,
  lastTradeTime: number,
  tradeTime: number,
  assetStateDate: number,
  tradingStatus: string,
  volume: number,
  arbGap: number,
  openPositions: number,
  putCallRatio: number,
  avgDuration: number,
  purchasePrice: number,
  redemptionPrice: number,
  redemptionYield: number,
  yieldToMaturity: number,
  dailyYield: number,
  weeklyYield: number,
  monthlyYield: number,
  quarterlyYield: number,
  yearlyYield: number,
  threeYearsYield: number,
  fiveYearsYield: number,
  maxYield: number,
  dailyParentYield: number,
  weeklyParentYield: number,
  monthlyParentYield: number,
  quarterlyParentYield: number,
  yearlyParentYield: number,
  threeYearsParentYield: number,
  fiveYearsParentYield: number,
  maxParentYield: number,
  dailyAvgMtfYield: number,
  weeklyAvgMtfYield: number,
  monthlyAvgMtfYield: number,
  quarterlyAvgMtfYield: number,
  yearlyAvgMtfYield: number,
  threeYearsAvgMtfYield: number,
  fiveYearsAvgMtfYield: number,
  maxAvgMtfYield: number,
  bondYieldSpread: number,
  averageMtfYieldInCategory: number,
  managementFee: number,
  inflows: number,
  outflows: number,
  mtfBeat: Array<number>,
  standardDeviation: number,
  peRatio: number,
  pbRatio: number,
  psRatio: number,
  historicalPeRatio: number,
  historicalProfit: number,
  dailyAvgVolume: number,
  issuerName: string,
  marketCap: number,
  roe: number,
  netProfitMargin: number,
  capitalBalanceRatio: number,
  per: number,
  yieldFactor: number,
  daysToMaturity: number,
  classification: string,
  issueDate: number,
  redemptionDate: number,
  periodicalInterest: number,
  periodicalInterestDate: number,
  yearlyInterest: number,
  retailTax: number,
  linkageType: string,
  parentId: string,
  parentName: string,
  paymentDate: number,
  exDate: number,
  redemptionRate: number,
  floatRate: number,
  fixedRate: number,
  holdingsRatio: number,
  sharpIndex: number,
  inflowsPercentageChange: number,
  outflowsPercentageChange: number,
  manager: string,
  trustee: string,
  exposureProfile: string,
  indexExposure: Array<Asset>,
  assetBaseHoldingRatio: number,
  foundingDate: number,
  tradingHours: string,
  dividendClassification: string,
  trusteeFee: number,
  loadChargeRate: number,
  distributionCommission: number,
  mainCurrency: string,
  mtfEtfPolicy: string,
  policyChangeDate: number,
  primeClassification: string,
  mainClassification: string,
  secondaryClassification: string,
  taxClassification: string,
  stocksExposure: number,
  currencyExposure: number,
  currencyPeg: string,
  etfType: string,
  etfIssuer: string,
  conversionType: string,
  baseAsset: string,
  conversionFee: number,
  dividendPolicy: string,
  accumulatedDividend: number,
  accumulatedInterest: number,
  managementFeeFactor: number,
  unitsVolume: number,
  openPositionsChangeRate: number,
  contractSize: number,
  expirationPrice: number,
  daysToExpiration: number,
  expirationDate: number,
  expirationBenchmarkDates: Array<string>,
  theoreticalValue: number,
  theoreticalValueGap: number,
};
