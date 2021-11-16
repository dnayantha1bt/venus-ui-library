export const CURRENT_ASSET_ALLOCATION_TYPE = 'currentAssetAT';
export const ASSET_ALLOCATION_TOTAL = 'assetAllocationTotal';

const SIMPLE_EQUITIES = 'simpleEquities';
const SIMPLE_CORPORATE_BONDS = 'simpleCorporateBonds';
const SIMPLE_PROPERTY = 'simpleProperty';
const SIMPLE_GOVERNMENT_BONDS = 'simpleGovernmentBonds';
const SIMPLE_ALTERNATIVES = 'simpleAlternatives';
const SIMPLE_CASH = 'simpleCash';
const SIMPLE_DIVERSIFIED_GROWTH = 'simpleDiversifiedGrowth';

const DETAIL_UK_EQUITY = 'detailEquity';
const DETAIL_DIVERSIFIED_GROWTH = 'detailDiversifiedGrowth';
const DETAIL_GLOBAL_EQUITY = 'detailGlobalEquity';
const DETAIL_CORPORATE_BONDS = 'detailCorporateBonds';
const DETAIL_EMERGING_MARKET_EQUITY = 'detailEmergingMarketEquity';
const DETAIL_OVERSEAS_SOVEREIGN_BONDS = 'detailOverseasSovereignBonds';
const DETAIL_HIGH_YIELD_BONDS = 'detailHighYieldBonds';
const DETAIL_NOMINAL_GILTS = 'detailNominalGilts';
const DETAIL_EMERGING_MARKET_DEBT = 'detailEmergingMarketDebt';
const DETAIL_INDEX_LINKED_GILTS = 'detailIndexLinkedGilts';
const DETAIL_PROPERTY = 'detailProperty';
const DETAIL_LDI = 'detailLDI';
const DETAIL_INFRASTRUCTURE = 'detailInfrastructure';
const DETAIL_CASH = 'detailCash';

export const simpleAssetAllocationFields = [
    { label: 'Equities', field: SIMPLE_EQUITIES },
    { label: 'Corporate Bonds', field: SIMPLE_CORPORATE_BONDS },
    { label: 'Property', field: SIMPLE_PROPERTY },
    { label: 'Government Bonds', field: SIMPLE_GOVERNMENT_BONDS },
    { label: 'Alternatives', field: SIMPLE_ALTERNATIVES },
    { label: 'Cash', field: SIMPLE_CASH },
    { label: 'Diversified Growth', field: SIMPLE_DIVERSIFIED_GROWTH }
];

export const detailAssetAllocationFields = [
    { label: 'UK Equity', field: DETAIL_UK_EQUITY },
    { label: 'Diversified Growth', field: DETAIL_DIVERSIFIED_GROWTH },
    { label: 'Global Equity', field: DETAIL_GLOBAL_EQUITY },
    { label: 'Corporate Bonds', field: DETAIL_CORPORATE_BONDS },
    { label: 'Emerging Market Equity', field: DETAIL_EMERGING_MARKET_EQUITY },
    { label: 'Overseas Sovereign Bonds', field: DETAIL_OVERSEAS_SOVEREIGN_BONDS },
    { label: 'High Yield Bonds', field: DETAIL_HIGH_YIELD_BONDS },
    { label: 'Nominal Gilts', field: DETAIL_NOMINAL_GILTS },
    { label: 'Emerging Market Debt', field: DETAIL_EMERGING_MARKET_DEBT },
    { label: 'Index-linked Gilts', field: DETAIL_INDEX_LINKED_GILTS },
    { label: 'Property', field: DETAIL_PROPERTY },
    { label: 'LDI', field: DETAIL_LDI },
    { label: 'Infrastructure', field: DETAIL_INFRASTRUCTURE },
    { label: 'Cash', field: DETAIL_CASH }
];
