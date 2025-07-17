import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface IntegrationStatusProps {
  onConnectionChange?: (connected: boolean) => void;
}

const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ onConnectionChange }) => {
  const [netsuiteStatus, setNetsuiteStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [quickbooksStatus, setQuickbooksStatus] = useState<'connected' | 'disconnected' | 'testing'>('disconnected');
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const testNetSuiteConnection = async () => {
    setNetsuiteStatus('testing');
    
    try {
      // Simulate NetSuite connection test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.3;
      
      if (success) {
        setNetsuiteStatus('connected');
        setLastSync(new Date());
        onConnectionChange?.(true);
      } else {
        setNetsuiteStatus('disconnected');
        onConnectionChange?.(false);
      }
    } catch (error) {
      setNetsuiteStatus('disconnected');
      onConnectionChange?.(false);
    }
  };

  const testQuickBooksConnection = async () => {
    setQuickbooksStatus('testing');
    
    try {
      // Simulate QuickBooks connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, randomly succeed or fail
      const success = Math.random() > 0.4;
      
      if (success) {
        setQuickbooksStatus('connected');
        setLastSync(new Date());
      } else {
        setQuickbooksStatus('disconnected');
      }
    } catch (error) {
      setQuickbooksStatus('disconnected');
    }
  };

  useEffect(() => {
    // Auto-test connections on mount
    testNetSuiteConnection();
    testQuickBooksConnection();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'testing':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'testing':
        return 'Testing...';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Integration Status</h3>
        <div className="text-sm text-gray-500">
          {lastSync && `Last sync: ${lastSync.toLocaleTimeString()}`}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(netsuiteStatus)}
            <div>
              <p className="font-medium text-gray-900">NetSuite</p>
              <p className="text-sm text-gray-500">{getStatusText(netsuiteStatus)}</p>
            </div>
          </div>
          <button
            onClick={testNetSuiteConnection}
            disabled={netsuiteStatus === 'testing'}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            Test
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {getStatusIcon(quickbooksStatus)}
            <div>
              <p className="font-medium text-gray-900">QuickBooks</p>
              <p className="text-sm text-gray-500">{getStatusText(quickbooksStatus)}</p>
            </div>
          </div>
          <button
            onClick={testQuickBooksConnection}
            disabled={quickbooksStatus === 'testing'}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            Test
          </button>
        </div>
      </div>

      {netsuiteStatus === 'connected' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✅ Live data mode enabled. All financial queries will use real NetSuite data.
          </p>
        </div>
      )}

      {netsuiteStatus === 'disconnected' && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ Using mock data mode. Connect to NetSuite for live financial data.
          </p>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatus;