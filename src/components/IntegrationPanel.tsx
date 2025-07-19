import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Settings, Play, Pause } from 'lucide-react';
import { integrationManager, IntegrationStatus, SystemHealth } from '../services/integrationManager';

const IntegrationPanel: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadSystemHealth();
    
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(loadSystemHealth, 30000); // Refresh every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadSystemHealth = async () => {
    try {
      setIsLoading(true);
      const health = await integrationManager.getSystemHealth();
      setSystemHealth(health);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to load system health:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testAllConnections = async () => {
    try {
      setIsLoading(true);
      await integrationManager.testAllConnections();
      await loadSystemHealth();
    } catch (error) {
      console.error('Connection test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performFullSync = async () => {
    try {
      setIsLoading(true);
      await integrationManager.performFullSync();
      await loadSystemHealth();
    } catch (error) {
      console.error('Full sync failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: IntegrationStatus['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'configuring':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: IntegrationStatus['status']) => {
    switch (status) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-gray-600';
      case 'error':
        return 'text-red-600';
      case 'configuring':
        return 'text-blue-600';
      default:
        return 'text-gray-400';
    }
  };

  const getOverallHealthColor = (health: SystemHealth['overall']) => {
    switch (health) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!systemHealth) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall System Health */}
      <div className={`p-4 rounded-lg border ${getOverallHealthColor(systemHealth.overall)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">System Health: {systemHealth.overall.toUpperCase()}</h3>
            <p className="text-sm mt-1">
              Last checked: {systemHealth.lastHealthCheck.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-md ${autoRefresh ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700'}`}
              title={autoRefresh ? 'Disable auto-refresh' : 'Enable auto-refresh'}
            >
              {autoRefresh ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={loadSystemHealth}
              disabled={isLoading}
              className="p-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
              title="Refresh now"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Integration Services */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Integration Services</h3>
          <div className="flex space-x-2">
            <button
              onClick={testAllConnections}
              disabled={isLoading}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
            >
              Test Connections
            </button>
            <button
              onClick={performFullSync}
              disabled={isLoading}
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              Full Sync
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {systemHealth.services.map((service) => (
            <div key={service.service} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{service.service}</h4>
                    <p className={`text-sm ${getStatusColor(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </p>
                  </div>
                </div>
                
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <Settings size={16} />
                </button>
              </div>

              {service.lastSync && (
                <p className="text-xs text-gray-500 mt-2">
                  Last sync: {service.lastSync.toLocaleString()}
                </p>
              )}

              {service.errorMessage && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                  {service.errorMessage}
                </div>
              )}

              {service.metrics && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium text-gray-700">Metrics:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    {Object.entries(service.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-mono">
                          {typeof value === 'object' ? 
                            value?.toLocaleString?.() || 'N/A' : 
                            String(value)
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-blue-800 font-medium">Demo Mode Active</p>
            <p className="text-xs text-blue-700 mt-1">
              All integrations are simulated with realistic data flows. 
              In production, these would connect to actual NetSuite, QuickBooks, and AI services.
            </p>
          </div>
        </div>
      </div>

      {/* Auto-refresh Status */}
      <div className="text-center text-xs text-gray-500">
        Last refreshed: {lastRefresh.toLocaleTimeString()} • 
        Auto-refresh: {autoRefresh ? 'On' : 'Off'}
      </div>
    </div>
  );
};

export default IntegrationPanel;