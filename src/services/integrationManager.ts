/**
 * Integration Manager Service
 * This orchestrates all integrations and provides a unified interface
 */

import { netsuiteService, NetSuiteConnection } from './netsuite';
import { quickbooksService, QuickBooksConnection } from './quickbooks';
import { aiService } from './ai';
import { ssoService, SSOConfig } from './sso';
import { auditService } from './audit';
import { encryptionService } from './encryption';

export interface IntegrationStatus {
  service: string;
  status: 'connected' | 'disconnected' | 'error' | 'configuring';
  lastSync?: Date;
  errorMessage?: string;
  metrics?: Record<string, any>;
}

export interface SystemHealth {
  overall: 'healthy' | 'warning' | 'critical';
  services: IntegrationStatus[];
  uptime: number;
  lastHealthCheck: Date;
}

class IntegrationManager {
  private healthCheckInterval: NodeJS.Timeout | null = null;
  private isMonitoring = false;
  
  /**
   * Initialize all services
   */
  async initializeServices(config: {
    netsuite?: { accountId: string; token: string };
    quickbooks?: { enable: boolean };
    ai?: { apiKey: string };
    sso?: SSOConfig;
    encryption?: { masterKey: string };
  }): Promise<boolean> {
    console.log('🚀 Integration Manager: Initializing all services...');
    
    try {
      // Initialize encryption first (required for other services)
      if (config.encryption) {
        await encryptionService.initialize(config.encryption.masterKey);
      }
      
      // Initialize AI service
      if (config.ai) {
        await aiService.initialize(config.ai.apiKey);
      }
      
      // Initialize SSO
      if (config.sso) {
        await ssoService.configure(config.sso);
      }
      
      // Initialize NetSuite
      if (config.netsuite) {
        await netsuiteService.authenticate(config.netsuite.accountId, config.netsuite.token);
      }
      
      // Initialize QuickBooks (OAuth flow)
      if (config.quickbooks?.enable) {
        console.log('📋 QuickBooks: Ready for OAuth flow');
      }
      
      // Start health monitoring
      this.startHealthMonitoring();
      
      console.log('✅ Integration Manager: All services initialized');
      return true;
      
    } catch (error) {
      console.error('❌ Integration Manager: Initialization failed', error);
      throw error;
    }
  }

  /**
   * Get status of all integrations
   */
  async getIntegrationStatus(): Promise<IntegrationStatus[]> {
    const statuses: IntegrationStatus[] = [];
    
    // NetSuite status
    try {
      const nsConnection = netsuiteService.getConnectionStatus();
      statuses.push({
        service: 'NetSuite',
        status: nsConnection.isConnected ? 'connected' : 'disconnected',
        lastSync: nsConnection.lastSync || undefined,
        metrics: {
          accountId: nsConnection.accountId,
          baseUrl: nsConnection.baseUrl
        }
      });
    } catch (error) {
      statuses.push({
        service: 'NetSuite',
        status: 'error',
        errorMessage: (error as Error).message
      });
    }
    
    // QuickBooks status
    try {
      const qbConnection = quickbooksService.getConnectionStatus();
      statuses.push({
        service: 'QuickBooks',
        status: qbConnection.isConnected ? 'connected' : 'disconnected',
        lastSync: qbConnection.lastSync || undefined,
        metrics: {
          companyId: qbConnection.companyId,
          tokenExpiry: qbConnection.expiresAt
        }
      });
    } catch (error) {
      statuses.push({
        service: 'QuickBooks',
        status: 'error',
        errorMessage: (error as Error).message
      });
    }
    
    // AI Service status
    try {
      const aiStatus = aiService.getModelStatus();
      statuses.push({
        service: 'AI Service',
        status: aiStatus.isInitialized ? 'connected' : 'disconnected',
        metrics: {
          model: aiStatus.model,
          queriesProcessed: aiStatus.queriesProcessed,
          uptime: aiStatus.uptime
        }
      });
    } catch (error) {
      statuses.push({
        service: 'AI Service',
        status: 'error',
        errorMessage: (error as Error).message
      });
    }
    
    // Encryption service status
    try {
      const encStatus = encryptionService.getEncryptionStatus();
      statuses.push({
        service: 'Encryption',
        status: encStatus.isInitialized ? 'connected' : 'disconnected',
        metrics: {
          algorithm: encStatus.algorithm,
          keyCount: encStatus.keyCount,
          keyRotationNeeded: encStatus.keyRotationNeeded
        }
      });
    } catch (error) {
      statuses.push({
        service: 'Encryption',
        status: 'error',
        errorMessage: (error as Error).message
      });
    }
    
    return statuses;
  }

  /**
   * Perform comprehensive data sync
   */
  async performFullSync(): Promise<{
    netsuite?: any;
    quickbooks?: any;
    duration: number;
    timestamp: Date;
  }> {
    console.log('🔄 Integration Manager: Starting full data sync...');
    
    const startTime = Date.now();
    const results: any = {};
    
    // Log sync initiation
    await auditService.logUserAction(
      'SYSTEM',
      'system@company.com',
      'data_sync_initiated',
      'all_integrations',
      { syncType: 'full' },
      'SYSTEM_SESSION',
      '127.0.0.1'
    );
    
    try {
      // Sync NetSuite data
      const nsConnection = netsuiteService.getConnectionStatus();
      if (nsConnection.isConnected) {
        results.netsuite = await netsuiteService.syncData();
      }
      
      // Sync QuickBooks data
      const qbConnection = quickbooksService.getConnectionStatus();
      if (qbConnection.isConnected) {
        results.quickbooks = await quickbooksService.syncAllData();
      }
      
      const duration = Date.now() - startTime;
      const timestamp = new Date();
      
      // Log successful sync
      await auditService.logUserAction(
        'SYSTEM',
        'system@company.com',
        'data_sync_completed',
        'all_integrations',
        { duration, results },
        'SYSTEM_SESSION',
        '127.0.0.1'
      );
      
      console.log('✅ Integration Manager: Full sync completed', { duration, results });
      
      return { ...results, duration, timestamp };
      
    } catch (error) {
      // Log sync failure
      await auditService.logSecurityEvent(
        'suspicious_activity',
        'Data sync failed',
        'medium',
        { error: (error as Error).message }
      );
      
      throw error;
    }
  }

  /**
   * Test all connections
   */
  async testAllConnections(): Promise<Record<string, boolean>> {
    console.log('🔍 Integration Manager: Testing all connections...');
    
    const results: Record<string, boolean> = {};
    
    // Test NetSuite
    try {
      results.netsuite = await netsuiteService.testConnection();
    } catch (error) {
      results.netsuite = false;
      console.log('❌ NetSuite connection test failed:', (error as Error).message);
    }
    
    // Test QuickBooks
    try {
      results.quickbooks = await quickbooksService.testConnection();
    } catch (error) {
      results.quickbooks = false;
      console.log('❌ QuickBooks connection test failed:', (error as Error).message);
    }
    
    // Test SSO provider
    try {
      const ssoHealth = await ssoService.getProviderHealth();
      results.sso = ssoHealth.isHealthy;
    } catch (error) {
      results.sso = false;
      console.log('❌ SSO connection test failed:', (error as Error).message);
    }
    
    console.log('✅ Integration Manager: Connection tests completed', results);
    return results;
  }

  /**
   * Get comprehensive system health
   */
  async getSystemHealth(): Promise<SystemHealth> {
    const statuses = await this.getIntegrationStatus();
    
    // Determine overall health
    const hasError = statuses.some(s => s.status === 'error');
    const hasDisconnected = statuses.some(s => s.status === 'disconnected');
    
    let overall: 'healthy' | 'warning' | 'critical';
    if (hasError) {
      overall = 'critical';
    } else if (hasDisconnected) {
      overall = 'warning';
    } else {
      overall = 'healthy';
    }
    
    return {
      overall,
      services: statuses,
      uptime: this.getSystemUptime(),
      lastHealthCheck: new Date()
    };
  }

  /**
   * Process AI query across all relevant data sources
   */
  async processQuery(userId: string, query: string): Promise<{
    response: string;
    sources: string[];
    confidence: number;
    processingTime: number;
  }> {
    console.log('🤖 Integration Manager: Processing AI query...', { userId, query });
    
    const startTime = Date.now();
    
    // Log query
    await auditService.logUserAction(
      userId,
      'user@company.com', // In real app, get from user context
      'ai_query_submitted',
      'financial_data',
      { query, queryLength: query.length },
      'USER_SESSION',
      '127.0.0.1'
    );
    
    try {
      // Process with AI service
      const aiResponse = await aiService.processQuery(userId, query);
      
      const processingTime = Date.now() - startTime;
      
      // Log successful response
      await auditService.logUserAction(
        userId,
        'user@company.com',
        'ai_query_responded',
        'financial_data',
        { 
          queryId: aiResponse.id,
          confidence: aiResponse.confidence,
          processingTime: processingTime / 1000
        },
        'USER_SESSION',
        '127.0.0.1'
      );
      
      return {
        response: aiResponse.response,
        sources: aiResponse.sources,
        confidence: aiResponse.confidence,
        processingTime: processingTime / 1000
      };
      
    } catch (error) {
      await auditService.logSecurityEvent(
        'suspicious_activity',
        'AI query processing failed',
        'low',
        { error: (error as Error).message, query },
        userId
      );
      
      throw error;
    }
  }

  /**
   * Handle user authentication through SSO
   */
  async authenticateUser(authCode: string, state: string): Promise<any> {
    console.log('🔐 Integration Manager: Authenticating user...');
    
    try {
      const user = await ssoService.handleCallback(authCode, state);
      
      // Log successful authentication
      await auditService.logUserAction(
        user.id,
        user.email,
        'user_authenticated',
        'sso_system',
        { provider: 'sso', roles: user.roles },
        user.sessionId,
        '127.0.0.1'
      );
      
      return user;
      
    } catch (error) {
      await auditService.logSecurityEvent(
        'login_failure',
        'SSO authentication failed',
        'medium',
        { error: (error as Error).message, authCode: 'REDACTED' }
      );
      
      throw error;
    }
  }

  /**
   * Start continuous health monitoring
   */
  private startHealthMonitoring(): void {
    if (this.isMonitoring) return;
    
    console.log('📊 Integration Manager: Starting health monitoring...');
    
    this.isMonitoring = true;
    
    // Check health every 5 minutes
    this.healthCheckInterval = setInterval(async () => {
      try {
        const health = await this.getSystemHealth();
        
        if (health.overall === 'critical') {
          await auditService.logSecurityEvent(
            'suspicious_activity',
            'System health critical',
            'high',
            { health }
          );
        }
        
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Stop health monitoring
   */
  stopHealthMonitoring(): void {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
      this.healthCheckInterval = null;
    }
    this.isMonitoring = false;
    console.log('📊 Integration Manager: Health monitoring stopped');
  }

  /**
   * Get system uptime in milliseconds
   */
  private getSystemUptime(): number {
    // In a real implementation, this would track actual system startup time
    return Date.now() - (Date.now() % (24 * 60 * 60 * 1000)); // Simulate daily uptime
  }

  /**
   * Shutdown all services gracefully
   */
  async shutdown(): Promise<void> {
    console.log('🛑 Integration Manager: Shutting down all services...');
    
    this.stopHealthMonitoring();
    
    // Disconnect from all services
    netsuiteService.disconnect();
    quickbooksService.disconnect();
    await encryptionService.secureWipe();
    
    console.log('✅ Integration Manager: Shutdown completed');
  }
}

// Export singleton instance
export const integrationManager = new IntegrationManager();