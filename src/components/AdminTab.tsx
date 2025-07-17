import React, { useState } from 'react';
import { Activity, TrendingUp, Clock, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { chatHistoryData } from '../data';

const AdminTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = {
    totalQueries: chatHistoryData.length,
    successRate: Math.round((chatHistoryData.filter(m => m.isSuccessful).length / chatHistoryData.length) * 100),
    avgResponseTime: chatHistoryData.reduce((sum, m) => sum + m.processingTime, 0) / chatHistoryData.length,
    activeUsers: 5
  };

  const systemStatus = [
    { name: 'Demo Data Service', status: 'operational', uptime: '100%' },
    { name: 'AI Query Processing', status: 'operational', uptime: '99.9%' },
    { name: 'User Authentication', status: 'operational', uptime: '100%' },
    { name: 'Report Generation', status: 'operational', uptime: '99.8%' }
  ];

  const securityEvents = [
    { time: '2024-01-15 09:45', event: 'Successful login', user: 'jane.doe@company.com', severity: 'info' },
    { time: '2024-01-15 09:30', event: 'Failed login attempt', user: 'unknown@test.com', severity: 'warning' },
    { time: '2024-01-15 08:15', event: 'Session timeout', user: 'john.smith@company.com', severity: 'info' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>
      </div>

      {/* Demo Status */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Demo Application Status</h3>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            🎯 This is a demo application using simulated financial data. All queries and reports use realistic but fictional data for demonstration purposes.
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Activity className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Queries</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.totalQueries}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Success Rate</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.successRate}%</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Avg Response Time</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.avgResponseTime.toFixed(1)}s</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-gray-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                <dd className="text-lg font-medium text-gray-900">{stats.activeUsers}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="space-y-4">
          {systemStatus.map((system) => (
            <div key={system.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-gray-900">{system.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Uptime: {system.uptime}</span>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                  {system.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Recent Security Events</h3>
        <div className="space-y-4">
          {securityEvents.map((event, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {event.severity === 'warning' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{event.event}</p>
                <p className="text-sm text-gray-500">{event.user}</p>
              </div>
              <div className="text-sm text-gray-500">{event.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTab;