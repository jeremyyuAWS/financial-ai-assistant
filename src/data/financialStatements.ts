export const incomeStatementData = {
  revenue: [
    { month: 'Jan', amount: 485000, budget: 450000 },
    { month: 'Feb', amount: 520000, budget: 480000 },
    { month: 'Mar', amount: 580000, budget: 520000 },
    { month: 'Apr', amount: 610000, budget: 550000 },
    { month: 'May', amount: 645000, budget: 580000 },
    { month: 'Jun', amount: 720000, budget: 650000 },
    { month: 'Jul', amount: 755000, budget: 680000 },
    { month: 'Aug', amount: 780000, budget: 700000 },
    { month: 'Sep', amount: 825000, budget: 720000 },
    { month: 'Oct', amount: 865000, budget: 750000 },
    { month: 'Nov', amount: 920000, budget: 800000 },
    { month: 'Dec', amount: 985000, budget: 850000 }
  ],
  expenses: [
    { month: 'Jan', amount: 320000, budget: 300000 },
    { month: 'Feb', amount: 380000, budget: 350000 },
    { month: 'Mar', amount: 420000, budget: 380000 },
    { month: 'Apr', amount: 450000, budget: 400000 },
    { month: 'May', amount: 480000, budget: 420000 },
    { month: 'Jun', amount: 520000, budget: 450000 },
    { month: 'Jul', amount: 550000, budget: 480000 },
    { month: 'Aug', amount: 580000, budget: 500000 },
    { month: 'Sep', amount: 610000, budget: 520000 },
    { month: 'Oct', amount: 640000, budget: 550000 },
    { month: 'Nov', amount: 680000, budget: 580000 },
    { month: 'Dec', amount: 720000, budget: 600000 }
  ]
};

export const balanceSheetData = {
  assets: {
    cash: 850000,
    accountsReceivable: 456000,
    inventory: 125000,
    currentAssets: 1431000,
    fixedAssets: 2500000,
    totalAssets: 3931000
  },
  liabilities: {
    accountsPayable: 234000,
    accruals: 156000,
    currentLiabilities: 390000,
    longTermDebt: 1200000,
    totalLiabilities: 1590000
  },
  equity: {
    paidInCapital: 1000000,
    retainedEarnings: 1341000,
    totalEquity: 2341000
  }
};

export const cashFlowData = [
  { month: 'Jan', inflow: 485000, outflow: 320000, net: 165000 },
  { month: 'Feb', inflow: 520000, outflow: 380000, net: 140000 },
  { month: 'Mar', inflow: 580000, outflow: 420000, net: 160000 },
  { month: 'Apr', inflow: 610000, outflow: 450000, net: 160000 },
  { month: 'May', inflow: 645000, outflow: 480000, net: 165000 },
  { month: 'Jun', inflow: 720000, outflow: 520000, net: 200000 }
];

export const getYTDRevenue = () => 
  incomeStatementData.revenue.reduce((total, month) => total + month.amount, 0);

export const getYTDExpenses = () => 
  incomeStatementData.expenses.reduce((total, month) => total + month.amount, 0);

export const getNetIncome = () => getYTDRevenue() - getYTDExpenses();

export const getGrossMargin = () => 
  Math.round((getNetIncome() / getYTDRevenue()) * 100);