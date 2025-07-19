import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Clock, Users, Download, Eye } from 'lucide-react';
import { auditService, AuditEvent, SecurityEvent } from '../services/audit';
import { ssoService } from '../services/sso';
import { encryptionService } from '../services/encryption';

const SecurityDashboard: React.FC = () => {
  const [auditStats, setAuditStats] = useState<any>(null);
  const [recentSecurityEvents, setRecentSecurityEvents] = useState<SecurityEvent[]>([]);
  const [recentAuditEvents, setRecentAuditEvents] = useState<AuditEvent[]>([]);
  const [encryptionStatus, setEncryptionStatus] = useState<any>(null);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  useEffect(() => {
    loadSecurityData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadSecurityData = async () => {
    try {
      // Load audit statistics
      const stats = auditService.getAuditStatistics();
      setAuditStats(stats);

      // Load recent security events
      const securityEvents = auditService.getSecurityEvents({
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
      });
      setRecentSecurityEvents(securityEvents.slice(0, 5));

      // Load recent audit events
      const auditEvents = auditService.searchAuditEvents({
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000)
      });
      setRecentAuditEvents(auditEvents.slice(0, 10));

      // Load encryption status
      const encStatus = encryptionService.getEncryptionStatus();
      setEncryptionStatus(encStatus);

      // Load active sessions
      const sessions = ssoService.getActiveSessions();
      setActiveSessions(sessions.slice(0, 5));

    } catch (error) {
      console.error('Failed to load security data:', error);
    }
  };

  const forceSessionTimeouts = async () => {
    try {
      const timeouts = ssoService.forceSessionTimeout();
      await loadSecurityData(); // Refresh data
      console.log(`Forced timeout of ${timeouts} sessions`);
    } catch (error) {
      console.error('Failed to force session timeouts:', error);
    }
  };

  const exportAuditData = async () => {
    try {
      const exported = await auditService.exportAuditData('csv', {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
      });
      
      // Create download link
      const blob = new Blob([exported.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = exported.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Failed to export audit data:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (!auditStats) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Events</dt>
                <dd className="text-lg font-medium text-gray-900">{auditStats.totalEvents}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Events Today</dt>
                <dd className="text-lg font-medium text-gray-900">{auditStats.eventsToday}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Security Events</dt>
                <dd className="text-lg font-medium text-gray-900">{recentSecurityEvents.length}</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Sessions</dt>
                <dd className="text-lg font-medium text-gray-900">{activeSessions.length}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Events</h3>
          <div className="flex space-x-2">
            <button
              onClick={forceSessionTimeouts}
              className="px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
            >
              Force Timeouts
            </button>
            <button
              onClick={exportAuditData}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {recentSecurityEvents.length > 0 ? (
          <div className="space-y-3">
            {recentSecurityEvents.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                      <span className="text-sm font-medium text-gray-900">{event.type}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{event.timestamp.toLocaleString()}</span>
                      {event.affectedUser && <span>User: {event.affectedUser}</span>}
                      <span>IP: {event.ipAddress}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded ${
                    event.status === 'new' ? 'bg-red-100 text-red-800' :
                    event.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    event.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent security events</p>
        )}
      </div>

      {/* Audit Trail */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Events</h3>
        
        {recentAuditEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resource
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAuditEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {event.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.resource}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(event.severity)}`}>
                        {event.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No recent audit events</p>
        )}
      </div>

      {/* Encryption Status */}
      {encryptionStatus && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Encryption Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${encryptionStatus.isInitialized ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                Status: {encryptionStatus.isInitialized ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Eye className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Algorithm: {encryptionStatus.algorithm}</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Shield className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Keys: {encryptionStatus.keyCount}</span>
            </div>
          </div>
          
          {encryptionStatus.keyRotationNeeded && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Key rotation recommended. Some encryption keys are approaching their rotation date.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Active Sessions */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Sessions</h3>
        
        {activeSessions.length > 0 ? (
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <div key={session.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">User ID: {session.userId}</p>
                    <p className="text-xs text-gray-500">IP: {session.ipAddress}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Created: {session.createdAt.toLocaleTimeString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last activity: {session.lastActivity.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No active sessions</p>
        )}
      </div>
    </div>
  );
};

export default SecurityDashboard;