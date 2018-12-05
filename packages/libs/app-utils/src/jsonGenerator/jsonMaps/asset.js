// @flow
import string from '../methods/string';
import number from '../methods/number';
import date from '../methods/date';
import list from '../methods/list';
import object from '../methods/object';

export const assetObject: Object = {
  name: () => string.lorem({ count: 1, type: 'word', }),
  id: () => string.id(),
  symbol: () => string.word({ upperCase: true, minLength: 4, maxLength: 8, }),
  type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
  subType: () => string.lorem({ count: number.int({ max: 5, min: 3, }), type: 'word', }),
  assetNumber: () => number.int({ max: 999999, min: 100000, }),
  assetSummary: () => string.lorem({ type: 'paragraph', }),
  value: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  USDValue: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  numeralValue: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  baseValue: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  openingValue: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  dailyHigh: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  dailyLow: () => number.float({ max: 10000, min: 0, fixed: 2, }),
  changePercentage: () => number.float({ max: 100, min: -100, fixed: 2, }),
  numeralChange: () => number.float({ max: 100, min: -100, fixed: 2, }),
  lastTradeTime: () => date.timestamp({}),
  tradeTime: () => date.timestamp({}),
  assetStateDate: () => date.timestamp({}),
  tradingStatus: () => string.enum([ 'רציף', 'נעולה', 'סגורה', 'טרום נעילה', 'טרום פתיחה', ]),
  volume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
  arbGap: () => number.float({ max: 100, min: -100, fixed: 2, }),
  openPositions: () => number.int({ max: 1000, min: 0, fixed: 2, }),
  putCallRatio: () => number.float({ max: 1, min: 0, fixed: 2, }),
  avgDuration: () => number.float({ max: 30, min: 0, fixed: 2, }),
  purchasePrice: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
  redemptionPrice: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
  redemptionYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  yieldToMaturity: () => number.float({ max: 100, min: 0, fixed: 2, }),
  dailyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  weeklyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  monthlyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  quarterlyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  yearlyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  threeYearsYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  fiveYearsYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  maxYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  dailyParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  weeklyParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  monthlyParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  quarterlyParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  yearlyParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  threeYearsParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  fiveYearsParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  maxParentYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  dailyAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  weeklyAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  monthlyAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  quarterlyAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  yearlyAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  threeYearsAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  fiveYearsAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  maxAvgMtfYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
  bondYieldSpread: () => number.float({ max: 100, min: 0, fixed: 2, }),
  averageMtfYieldInCategory: () => number.float({ max: 100, min: 0, fixed: 2, }),
  managementFee: () => number.float({ max: 10, min: 0, fixed: 2, }),
  monthlyinflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  quarterlyinflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  yearlyinflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  monthlyoutflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  quarterlyoutflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  yearlyoutflows: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  monthlymtfBeat: () => list(
    [
      {
        method: number.int,
        options: { max: 1000, },
      },
    ],
    2
  ),
  quarterlymtfBeat: () => list(
    [
      {
        method: number.int,
        options: { max: 1000, },
      },
    ],
    2
  ),
  yearlymtfBeat: () => list(
    [
      {
        method: number.int,
        options: { max: 1000, },
      },
    ],
    2
  ),
  assetsUnderManagement: () => number.float({ max: 10000000, min: -10000000, fixed: 2, }),
  managementFee: () => number.float({ max: 100, min: 0, fixed: 2, }),
  standardDeviation: () => number.float({ max: 30, min: 0, fixed: 2, }),
  peRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  pbRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  psRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  historicalPeRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  historicalProfit: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
  dailyAvgVolume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
  issuerName: () => string.word({}),
  marketCap: () => number.float({ max: 10000000, min: 0, fixed: 2, }),
  roe: () => number.float({ max: 100, min: -100, fixed: 2, }),
  netProfitMargin: () => number.float({}),
  capitalBalanceRatio: () => number.float({}),
  per: () => number.float({ max: 100, min: 0, fixed: 2, }),
  yieldFactor: () => number.float({ max: 100, min: -100, fixed: 2, }),
  daysToMaturity: () => number.int({ max: 3000, }),
  classification: () => string.word({}),
  issueDate: () => date.timestamp({}),
  redemptionDate: () => date.timestamp({}),
  periodicalInterest: () => number.float({ max: 100, min: 0, fixed: 2, }),
  periodicalInterestDate: () => date.timestamp({}),
  yearlyInterest: () => number.float({ max: 100, min: 0, fixed: 2, }),
  retailTax: () => number.float({ max: 30, min: 0, fixed: 2, }),
  linkageType: () => string.word({}),
  parentId: () => string.id(),
  parentName: () => string.word({ minLength: 3, capital: true, upperCase: true, }),
  paymentDate: () => date.timestamp({}),
  exDate: () => date.timestamp({}),
  redemptionRate: () => number.float({ max: 100, min: 0, fixed: 2, }),
  floatRate: () => number.float({ max: 10, min: 0, fixed: 4, }),
  fixedRate: () => number.float({ max: 10, min: 0, fixed: 4, }),
  holdingsRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  sharpIndex: () => number.float({ max: 10, min: 0, fixed: 2, }),
  inflowsPercentageChange: () => number.float({ max: 100, min: 0, fixed: 2, }),
  outflowsPercentageChange: () => number.float({ max: 100, min: 0, fixed: 2, }),
  manager: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  trustee: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  exposureProfile: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  foundingDate: () => date.timestamp({}),
  tradingHours: () => string.word({ capital: true, minLength: 3, maxLength: 5, count: 4, }),
  dividendClassification: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  trusteeFee: () => number.float({ max: 100, min: 0, fixed: 2, }),
  loadChargeRate: () => number.float({ max: 100, min: 0, fixed: 2, }),
  distributionCommission: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mainCurrency: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  mtfHoldingRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkForeignExchange: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkIndex: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkShekel: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkOptions: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkStocks: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfLinkFunds: () => number.float({ max: 100, min: 0, fixed: 2, }),
  mtfEtfPolicy: () => string.lorem({ type: 'paragraph', }),
  policyChangeDate: () => date.timestamp({}),
  primeClassification: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  mainClassification: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  secondaryClassification: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  taxClassification: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  stocksExposure: () => number.float({ max: 100, min: 0, fixed: 2, }),
  currencyExposure: () => number.float({ max: 100, min: 0, fixed: 2, }),
  currencyPeg: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  etfType: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  etfIssuer: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  conversionType: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  baseAsset: () => string.word({ capital: true, minLength: 4, maxLength: 8, }),
  conversionFee: () => number.float({ max: 100, min: 0, fixed: 2, }),
  dividendPolicy: () => string.lorem({ count: 10, }), // a longer sentence
  accumulatedDividend: () => number.float({ max: 100, min: 0, fixed: 2, }),
  accumulatedInterest: () => number.float({ max: 100, min: 0, fixed: 2, }),
  managementFeeFactor: () => number.float({ max: 100, min: 0, fixed: 2, }),
  unitsVolume: () => number.float({ max: 100, min: 0, fixed: 2, }),
  openPositionsChangeRate: () => number.float({ max: 100, min: 0, fixed: 2, }),
  contractSize: () => number.int({ max: 3000, }),
  expirationPrice: () => number.float({ max: 100, min: 0, fixed: 2, }),
  daysToExpiration: () => number.int({ max: 3000, }),
  expirationDate: () => date.timestamp({}),
  theoreticalValue: () => number.float({ max: 100, min: 0, fixed: 2, }),
  theoreticalValueGap: () => number.float({ max: 100, min: 0, fixed: 2, }),
  assetBaseHoldingRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
  expirationBenchmarkDates: () => list(
    [
      {
        method: string.lorem,
        options: { count: 1, type: 'word', },
      },
    ],
    number.int({ max: 7, min: 2, }),
  ),
  indexExposure: () => list(
    [
      {
        method: object,
        options: {
          name: () => string.lorem({ count: 1, type: 'word', }),
          id: () => string.id(),
          type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
          value: () => number.float({ max: 10000, min: 0, fixed: 2, }),
          assetBaseHoldingRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
        },
      },
    ],
    number.int({ max: 5, min: 1, }),
  ),
  assetComponents: () => list(
    [
      {
        method: object,
        options: {
          name: () => string.lorem({ count: 1, type: 'word', }),
          id: () => string.id(),
          type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
          mtfHoldingRatio: () => number.float({ max: 100, min: 0, fixed: 2, }),
          numeralValue: () => number.float({ max: 10000, min: 0, fixed: 2, }),
        },
      },
    ],
    number.int({ max: 10, min: 3, }),
  ),
  etfComponents: () => list(
    [
      {
        method: object,
        options: {
          name: () => string.lorem({ count: 1, type: 'word', }),
          id: () => string.id(),
          type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
          value: () => number.float({ max: 10000, min: 0, fixed: 2, }),
          changePercentage: () => number.float({ max: 100, min: -100, fixed: 2, }),
          volume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
          yearlyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
          managementFee: () => number.float({ max: 10, min: 0, fixed: 2, }),
          issuerName: () => string.word({}),
        },
      },
    ],
    number.int({ max: 10, min: 3, }),
  ),
  mtfComponents: () => list(
    [
      {
        method: object,
        options: {
          name: () => string.lorem({ count: 1, type: 'word', }),
          id: () => string.id(),
          type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
          value: () => number.float({ max: 10000, min: 0, fixed: 2, }),
          changePercentage: () => number.float({ max: 100, min: -100, fixed: 2, }),
          volume: () => number.float({ max: 1000000, min: 0, fixed: 2, }),
          yearlyYield: () => number.float({ max: 100, min: 0, fixed: 2, }),
          managementFee: () => number.float({ max: 10, min: 0, fixed: 2, }),
          issuerName: () => string.word({}),
        },
      },
    ],
    number.int({ max: 10, min: 3, }),
  ),
  relatedAssets: () => list(
    [
      {
        method: object,
        options: {
          type: () => string.enum([ 'crypto', 'bonds', 'stocks', 'options', 'mtf', 'etf', 'exchange', 'indices', ]),
          name: () => string.lorem({ count: 1, type: 'word', }),
          id: () => string.id(),
        },
      },
    ],
    number.int({ max: 5, min: 1, }),
  ),
  shareHolders: () => list(
    [
      {
        method: object,
        options: {
          shareHolderName: () => () => string.lorem({ count: 1, type: 'word', }),
          equityHolderPercentage: () => number.float({ max: 100, min: 0, fixed: 2, }),
          holdingMarketCap: () => number.float({ max: 50000, min: 0, fixed: 2, }),
        },
      },
    ],
    number.int({ max: 8, min: 3, }),
  ),
  eventsPrediction: () => list(
    [
      {
        method: object,
        options: {
          paymentDate: () => date.timestamp({}),
          exDate: () => date.timestamp({}),
          redemptionRate: () => number.float({ max: 100, min: 0, fixed: 2, }),
          retailTax: () => number.float({ max: 30, min: 0, fixed: 2, }),
          periodicalInterest: () => number.float({ max: 100, min: 0, fixed: 2, }),
        },
      },
    ],
    number.int({ max: 8, min: 3, }),
  ),
};

const assetMap: Object = new Map(Object.entries(assetObject));

export default assetMap;
