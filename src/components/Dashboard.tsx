import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { 
  vendorBillsData, 
  customerInvoicesData, 
  arAgeingData, 
  incomeStatementData, 
  balanceSheetData,
  getTotalAROutstanding,
  getTotalAPOutstanding,
  getYTDRevenue,
  getNetIncome,
  getGrossMargin,
  getOverdueVendorBills
} from '../data';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  value, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0 
}) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(value * easeOutQuart);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  const formattedValue = decimals > 0 
    ? currentValue.toFixed(decimals)
    : Math.round(currentValue).toLocaleString();

  return <span>{prefix}{formattedValue}{suffix}</span>;
};

interface KPICardProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  trend,
  trendLabel,
  icon,
  color 
}) => {
  const TrendIcon = trend && trend > 0 ? TrendingUp : TrendingDown;
  const trendColor = trend && trend > 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              <AnimatedCounter 
                value={value} 
                prefix={prefix} 
                suffix={suffix} 
                decimals={decimals}
              />
            </p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trendColor}`}>
            <TrendIcon size={16} />
            <span className="text-sm font-medium">
              {Math.abs(trend)}% {trendLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('YTD');
  const [drilldownData, setDrilldownData] = useState<any>(null);

  // Calculate KPIs
  const totalRevenue = getYTDRevenue();
  const netIncome = getNetIncome();
  const grossMargin = getGrossMargin();
  const totalAR = getTotalAROutstanding();
  const totalAP = getTotalAPOutstanding();
  const overdueBills = getOverdueVendorBills();
  const cashPosition = balanceSheetData.assets.cash;

  // Revenue trend data
  const revenueData = incomeStatementData.revenue.map((item, index) => ({
    month: item.month,
    revenue: item.amount,
    expenses: incomeStatementData.expenses[index].amount,
    profit: item.amount - incomeStatementData.expenses[index].amount,
    budget: item.budget,
    variance: item.amount - item.budget
  }));

  // Cash flow data
  const cashFlowData = incomeStatementData.revenue.slice(-6).map((item, index) => ({
    month: item.month,
    inflow: item.amount,
    outflow: incomeStatementData.expenses[incomeStatementData.expenses.length - 6 + index].amount,
    net: item.amount - incomeStatementData.expenses[incomeStatementData.expenses.length - 6 + index].amount
  }));

  // Aging analysis data
  const agingData = [
    { name: 'Current', value: arAgeingData.reduce((sum, item) => sum + item.current, 0), color: '#000000' },
    { name: '30-60 Days', value: arAgeingData.reduce((sum, item) => sum + item.days30, 0), color: '#333333' },
    { name: '60-90 Days', value: arAgeingData.reduce((sum, item) => sum + item.days60, 0), color: '#666666' },
    { name: '90+ Days', value: arAgeingData.reduce((sum, item) => sum + item.over90, 0), color: '#999999' }
  ];

  // Department spending analysis
  const departmentData = vendorBillsData.reduce((acc, bill) => {
    acc[bill.department] = (acc[bill.department] || 0) + bill.amount;
    return acc;
  }, {} as Record<string, number>);

  const departmentChartData = Object.entries(departmentData).map(([dept, amount]) => ({
    department: dept,
    amount
  }));

  const handleChartClick = (data: any, chartType: string) => {
    setDrilldownData({ data, chartType });
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Executive Dashboard</h2>
        <div className="flex space-x-2">
          {['YTD', 'Q4', 'Q3', 'Monthly'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Executive Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value={totalRevenue}
          prefix="$"
          decimals={0}
          trend={12.5}
          trendLabel="vs last year"
          icon={<DollarSign size={20} className="text-white" />}
          color="bg-gray-900"
        />
        <KPICard
          title="Net Income"
          value={netIncome}
          prefix="$"
          decimals={0}
          trend={8.3}
          trendLabel="vs last year"
          icon={<TrendingUp size={20} className="text-white" />}
          color="bg-green-600"
        />
        <KPICard
          title="Gross Margin"
          value={grossMargin}
          suffix="%"
          decimals={1}
          trend={2.1}
          trendLabel="vs last year"
          icon={<CheckCircle size={20} className="text-white" />}
          color="bg-blue-600"
        />
        <KPICard
          title="Cash Position"
          value={cashPosition}
          prefix="$"
          decimals={0}
          trend={-5.2}
          trendLabel="vs last month"
          icon={<AlertCircle size={20} className="text-white" />}
          color="bg-yellow-600"
        />
      </div>

      {/* Revenue Trend Analysis */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Revenue vs Budget Trend</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
              <span>Actual Revenue</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span>Budget</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value, name) => [formatCurrency(value as number), name]}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stackId="1" 
              stroke="#000000" 
              fill="#000000" 
              fillOpacity={0.1}
              name="Actual Revenue"
            />
            <Line 
              type="monotone" 
              dataKey="budget" 
              stroke="#666666" 
              strokeDasharray="5 5"
              name="Budget"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Interactive Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Analysis (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value as number), name]}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="inflow" fill="#000000" name="Cash Inflow" />
              <Bar dataKey="outflow" fill="#666666" name="Cash Outflow" />
              <Bar dataKey="net" fill="#333333" name="Net Cash Flow" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* A/R Aging Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">A/R Aging Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={agingData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {agingData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Spending Analysis */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Spending Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={departmentChartData}
            onClick={(data) => handleChartClick(data, 'department')}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value) => formatCurrency(value as number)}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Bar 
              dataKey="amount" 
              fill="#000000" 
              name="Spending"
              className="hover:opacity-80 cursor-pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Receivables</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total A/R</span>
              <span className="font-semibold">{formatCurrency(totalAR)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current</span>
              <span className="font-semibold">{formatCurrency(agingData[0].value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue</span>
              <span className="font-semibold text-red-600">
                {formatCurrency(agingData[1].value + agingData[2].value + agingData[3].value)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Payables</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total A/P</span>
              <span className="font-semibold">{formatCurrency(totalAP)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overdue Bills</span>
              <span className="font-semibold text-red-600">{overdueBills.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next Due</span>
              <span className="font-semibold">Feb 15, 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Ratio</span>
              <span className="font-semibold">
                {(balanceSheetData.assets.currentAssets / balanceSheetData.liabilities.currentLiabilities).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Debt-to-Equity</span>
              <span className="font-semibold">
                {(balanceSheetData.liabilities.totalLiabilities / balanceSheetData.equity.totalEquity).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cash Runway</span>
              <span className="font-semibold">1.5 months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drilldown Modal */}
      {drilldownData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full m-4">
            <h3 className="text-lg font-semibold mb-4">Drill-down Details</h3>
            <p className="text-gray-600 mb-4">
              You clicked on {drilldownData.chartType} data. In a full implementation, 
              this would show detailed breakdowns and related transactions.
            </p>
            <button
              onClick={() => setDrilldownData(null)}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;