import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, Building, Users, AlertCircle } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  lastUpdated: string;
  status: 'ready' | 'processing' | 'error';
  size: string;
}

export default function ReportsTab() {
  const [selectedReport, setSelectedReport] = useState<string>('');
  const [dateRange, setDateRange] = useState('30days');

  const reports: Report[] = [
    {
      id: 'vendor-bills',
      name: 'Vendor Bill Status',
      type: 'A/P Report',
      lastUpdated: '2024-01-15 09:30 AM',
      status: 'ready',
      size: '2.4 MB'
    },
    {
      id: 'customer-invoices',
      name: 'Customer Invoice Details',
      type: 'A/R Report',
      lastUpdated: '2024-01-15 09:15 AM',
      status: 'ready',
      size: '1.8 MB'
    },
    {
      id: 'ar-aging',
      name: 'A/R Aging Report',
      type: 'Collections Report',
      lastUpdated: '2024-01-15 08:45 AM',
      status: 'ready',
      size: '980 KB'
    },
    {
      id: 'ap-aging',
      name: 'A/P Aging Report',
      type: 'Vendor Report',
      lastUpdated: '2024-01-15 08:30 AM',
      status: 'ready',
      size: '1.2 MB'
    },
    {
      id: 'income-statement',
      name: 'Income Statement',
      type: 'Financial Statement',
      lastUpdated: '2024-01-15 07:00 AM',
      status: 'ready',
      size: '650 KB'
    },
    {
      id: 'balance-sheet',
      name: 'Balance Sheet',
      type: 'Financial Statement',
      lastUpdated: '2024-01-15 07:00 AM',
      status: 'ready',
      size: '580 KB'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case 'processing':
        return <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
    }
  };

  const handleDownload = (reportId: string) => {
    // Simulate download
    console.log(`Downloading report: ${reportId}`);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Financial Reports</h2>
        <p className="text-gray-600 mt-1">Generate and download comprehensive financial reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Ready</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.status === 'ready').length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Financial</p>
              <p className="text-xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Operations</p>
              <p className="text-xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="ytd">Year to Date</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select 
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Reports</option>
              <option value="financial">Financial Statements</option>
              <option value="ar">Accounts Receivable</option>
              <option value="ap">Accounts Payable</option>
              <option value="collections">Collections</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Available Reports</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.lastUpdated}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className="ml-2 text-sm text-gray-500 capitalize">{report.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{report.size}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDownload(report.id)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}