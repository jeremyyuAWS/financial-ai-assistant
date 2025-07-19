import React, { useState, useEffect } from 'react';
import { Settings, Users, Shield, Database, Activity, AlertTriangle, RefreshCw, CheckCircle, XCircle, Play } from 'lucide-react';
import IntegrationPanel from './IntegrationPanel';
import SecurityDashboard from './SecurityDashboard';
import { integrationManager } from '../services/integrationManager';

const AdminTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [systemStats, setSystemStats] = useState({
    totalUsers: 247,
    activeIntegrations: 0,
    systemHealth: 'loading',
    lastSync: null as Date | null
  });
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    loadSystemStats();
  }, []);

  const loadSystemStats = async () => {
    try {
      const integrationStatus = await integrationManager.getIntegrationStatus();
      const activeCount = integrationStatus.filter(s => s.status === 'connected').length;
      
      setSystemStats({
        totalUsers: 247,
        activeIntegrations: activeCount,
        systemHealth: activeCount >= 2 ? 'healthy' : activeCount >= 1 ? 'warning' : 'critical',
        lastSync: new Date()
      });
    } catch (error) {
      console.error('Failed to load system stats:', error);
    }
  };

  const initializeIntegrations = async () => {
    setIsInitializing(true);
    try {
      // Initialize with demo configuration
      await integrationManager.initializeServices({
        netsuite: {
          accountId: 'DEMO_ACCOUNT_12345',
          token: 'demo-token-netsuite-2024'
        },
        quickbooks: {
          enable: true
        },
        ai: {
          apiKey: 'demo-ai-key-openai-financial'
        },
        sso: {
          provider: 'okta',
          domain: 'demo-company.okta.com',
          clientId: 'demo-client-id',
          issuer: 'https://demo-company.okta.com',
          redirectUri: 'https://app.company.com/callback',
          scopes: ['openid', 'profile', 'email', 'groups']
        },
        encryption: {
          masterKey: 'demo-master-key-financial-ai-2024-secure'
        }
      });
      
      await loadSystemStats();
    } catch (error) {
      console.error('Failed to initialize integrations:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const performSystemSync = async () => {
    try {
      await integrationManager.performFullSync();
      await loadSystemStats();
    } catch (error) {
      console.error('System sync failed:', error);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      case 'critical':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Activity className="h-8 w-8 text-gray-600" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            {getHealthIcon(systemStats.systemHealth)}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className={`text-2xl font-bold capitalize ${getHealthColor(systemStats.systemHealth)}`}>
                {systemStats.systemHealth}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Integrations</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.activeIntegrations}/4</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <RefreshCw className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Sync</p>
              <p className="text-sm font-bold text-gray-900">
                {systemStats.lastSync ? systemStats.lastSync.toLocaleTimeString() : 'Never'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={initializeIntegrations}
              disabled={isInitializing}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Play size={16} />
              <span>{isInitializing ? 'Initializing...' : 'Initialize Integrations'}</span>
            </button>
            
            <button
              onClick={performSystemSync}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <RefreshCw size={16} />
              <span>Full System Sync</span>
            </button>
            
            <button
              onClick={() => setActiveSection('integrations')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <Database size={16} />
              <span>Manage Integrations</span>
            </button>
            
            <button
              onClick={() => setActiveSection('security')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <Shield size={16} />
              <span>Security Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Configuration</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">NetSuite Integration</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Account ID</span>
                  <span className="text-sm font-medium text-gray-900">DEMO_12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">RESTlets</span>
                  <span className="text-sm font-medium text-green-600">Configured</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Data Sync</span>
                  <span className="text-sm font-medium text-blue-600">Real-time</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">QuickBooks Integration</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">OAuth 2.0</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Company ID</span>
                  <span className="text-sm font-medium text-gray-900">QB_DEMO_789</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">API Access</span>
                  <span className="text-sm font-medium text-green-600">Full</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Security & Compliance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">SSO (Okta)</span>
                  <span className="text-sm font-medium text-green-600">Enabled</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Encryption</span>
                  <span className="text-sm font-medium text-green-600">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Audit Logging</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Demo Mode Active</p>
            <p className="text-xs text-blue-700 mt-1">
              All integrations are simulated with realistic enterprise-grade functionality. 
              In production, these connect to actual NetSuite, QuickBooks, and AI services with real data flows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600 mt-1">Manage integrations, monitor system health, and configure security settings</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'System Overview', icon: Activity },
            { key: 'integrations', label: 'Integrations', icon: Database },
            { key: 'security', label: 'Security', icon: Shield },
            { key: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSection === tab.key
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'integrations' && <IntegrationPanel />}
      {activeSection === 'security' && <SecurityDashboard />}
      {activeSection === 'settings' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
          <p className="text-gray-600">Advanced configuration options will be available here.</p>
        </div>
      )}
    </div>
  );
};

export default AdminTab;