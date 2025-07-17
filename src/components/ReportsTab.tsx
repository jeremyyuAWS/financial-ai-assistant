import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { RefreshCw, Filter, Database } from 'lucide-react';
import ExportButtons from './ExportButtons';
import { 
  vendorBillsData, 
  customerInvoicesData, 
  arAgeingData, 
  incomeStatementData 
} from '../data';

const ReportsTab: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('income');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const refreshData = async () => {
    setIsLoading(true);
    try {
      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const renderIncomeStatement = () => {
    const combinedData = incomeStatementData.revenue.map((item, index) => ({
      month: item.month,
      revenue: item.amount,
      expenses: incomeStatementData.expenses[index].amount,
      profit: item.amount - incomeStatementData.expenses[index].amount
    }));

    return (
      <div className="space-y-6" id="income-statement-report">
        <div className="bg-white p-6 rounded-lg border border-gray-200" id="income-chart">
          <h3 className="text-lg font-semibold mb-4">Income Statement - YTD</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value as number), name]}
                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="revenue" fill="#000000" name="Revenue" />
              <Bar dataKey="expenses" fill="#666666" name="Expenses" />
              <Bar dataKey="profit" fill="#999999" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200" id="trend-chart">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value as number), name]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#000000" 
                strokeWidth={3}
                name="Revenue"
                dot={{ fill: '#000000', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#666666" 
                strokeWidth={2}
                name="Profit"
                dot={{ fill: '#666666', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderVendorBills = () => {
    const statusData = vendorBillsData.reduce((acc, bill) => {
      acc[bill.status] = (acc[bill.status] || 0) + bill.amount;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(statusData).map(([status, amount]) => ({
      name: status,
      value: amount
    }));

    const COLORS = ['#000000', '#333333', '#666666', '#999999'];

    return (
      <div className="space-y-6" id="vendor-bills-report">
        <div className="bg-white p-6 rounded-lg border border-gray-200" id="vendor-pie-chart">
          <h3 className="text-lg font-semibold mb-4">Vendor Bills by Status</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200" id="vendor-table">
          <h3 className="text-lg font-semibold mb-4">Recent Vendor Bills</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bill Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vendorBillsData.slice(0, 5).map((bill) => (
                  <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {bill.vendor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bill.billNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(bill.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                        bill.status === 'overdue' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {bill.dueDate.toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAgeingReport = () => {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200" id="aging-report">
        <h3 className="text-lg font-semibold mb-4">Accounts Receivable Aging</h3>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Current</p>
            <p className="text-xl font-bold text-gray-900">
              {formatCurrency(arAgeingData.reduce((sum, item) => sum + item.current, 0))}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">30-60 Days</p>
            <p className="text-xl font-bold text-yellow-800">
              {formatCurrency(arAgeingData.reduce((sum, item) => sum + item.days30, 0))}
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">60-90 Days</p>
            <p className="text-xl font-bold text-orange-800">
              {formatCurrency(arAgeingData.reduce((sum, item) => sum + item.days60, 0))}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Over 90 Days</p>
            <p className="text-xl font-bold text-red-800">
              {formatCurrency(arAgeingData.reduce((sum, item) => sum + item.over90, 0))}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  30-60 Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  60-90 Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Over 90 Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {arAgeingData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(item.current)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">
                    {formatCurrency(item.days30)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600">
                    {formatCurrency(item.days60)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    {formatCurrency(item.over90)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Database size={16} />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <ExportButtons
            data={selectedReport === 'income' ? incomeStatementData.revenue : 
                  selectedReport === 'vendors' ? vendorBillsData : 
                  arAgeingData}
            filename={`${selectedReport}-report-${new Date().toISOString().split('T')[0]}`}
            reportType={selectedReport}
            elementId={selectedReport === 'income' ? 'income-statement-report' : 
                      selectedReport === 'vendors' ? 'vendor-bills-report' : 
                      'aging-report'}
          />
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'income', label: 'Income Statement' },
            { key: 'vendors', label: 'Vendor Bills' },
            { key: 'aging', label: 'A/R Aging' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedReport(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedReport === tab.key
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {selectedReport === 'income' && renderIncomeStatement()}
      {selectedReport === 'vendors' && renderVendorBills()}
      {selectedReport === 'aging' && renderAgeingReport()}
    </div>
  );
};

export default ReportsTab;