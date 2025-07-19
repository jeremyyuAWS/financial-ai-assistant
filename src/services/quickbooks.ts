/**
 * QuickBooks Integration Service (Simulated)
 * This simulates QuickBooks Online API with realistic data flows
 */

export interface QuickBooksConnection {
  companyId: string;
  accessToken: string | null;
  refreshToken: string | null;
  isConnected: boolean;
  expiresAt: Date | null;
  lastSync: Date | null;
}

export interface QuickBooksEntity {
  id: string;
  type: 'bill' | 'invoice' | 'payment' | 'item';
  data: any;
  lastUpdated: Date;
  syncToken: string;
}

class QuickBooksService {
  private connection: QuickBooksConnection = {
    companyId: '',
    accessToken: null,
    refreshToken: null,
    isConnected: false,
    expiresAt: null,
    lastSync: null
  };

  /**
   * Initiate OAuth flow for QuickBooks
   */
  async initiateOAuth(): Promise<string> {
    console.log('🔐 QuickBooks: Initiating OAuth flow...');
    
    // Simulate OAuth URL generation
    const state = this.generateRandomString(32);
    const clientId = 'QB_DEMO_CLIENT_ID';
    const scope = 'com.intuit.quickbooks.accounting';
    const redirectUri = encodeURIComponent('https://yourapp.com/callback');
    
    const authUrl = `https://appcenter.intuit.com/connect/oauth2?` +
      `client_id=${clientId}&` +
      `scope=${scope}&` +
      `redirect_uri=${redirectUri}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `state=${state}`;
    
    console.log('🔗 QuickBooks: OAuth URL generated');
    return authUrl;
  }

  /**
   * Handle OAuth callback and exchange code for tokens
   */
  async handleOAuthCallback(code: string, realmId: string): Promise<boolean> {
    console.log('🔐 QuickBooks: Processing OAuth callback...');
    
    // Simulate token exchange
    await this.delay(1500);
    
    // Simulate occasional OAuth failures
    if (Math.random() < 0.15) {
      throw new Error('OAuth token exchange failed');
    }
    
    const now = new Date();
    this.connection = {
      companyId: realmId,
      accessToken: this.generateRandomString(64),
      refreshToken: this.generateRandomString(64),
      isConnected: true,
      expiresAt: new Date(now.getTime() + 3600000), // 1 hour
      lastSync: now
    };
    
    console.log('✅ QuickBooks: Connected successfully');
    return true;
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken(): Promise<boolean> {
    if (!this.connection.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    console.log('🔄 QuickBooks: Refreshing access token...');
    await this.delay(800);
    
    const now = new Date();
    this.connection.accessToken = this.generateRandomString(64);
    this.connection.expiresAt = new Date(now.getTime() + 3600000);
    
    console.log('✅ QuickBooks: Token refreshed');
    return true;
  }

  /**
   * Test QuickBooks API connection
   */
  async testConnection(): Promise<boolean> {
    await this.ensureValidToken();
    
    console.log('🔍 QuickBooks: Testing API connection...');
    await this.delay(600);
    
    // Simulate API health check
    if (Math.random() < 0.05) {
      throw new Error('QuickBooks API unavailable');
    }
    
    console.log('✅ QuickBooks: API connection healthy');
    return true;
  }

  /**
   * Fetch bills from QuickBooks
   */
  async getBills(filters?: {
    status?: string;
    vendorId?: string;
    minAmount?: number;
  }): Promise<QuickBooksEntity[]> {
    await this.ensureValidToken();
    
    console.log('📊 QuickBooks: Fetching bills...', filters);
    await this.delay(1000);
    
    const bills = this.generateBillsData();
    let filteredBills = bills;
    
    if (filters?.status) {
      filteredBills = filteredBills.filter(bill => 
        bill.data.status === filters.status
      );
    }
    
    if (filters?.minAmount) {
      filteredBills = filteredBills.filter(bill => 
        bill.data.totalAmount >= filters.minAmount!
      );
    }
    
    console.log(`✅ QuickBooks: Retrieved ${filteredBills.length} bills`);
    return filteredBills;
  }

  /**
   * Fetch invoices from QuickBooks
   */
  async getInvoices(filters?: {
    status?: string;
    customerId?: string;
    dateRange?: { start: Date; end: Date };
  }): Promise<QuickBooksEntity[]> {
    await this.ensureValidToken();
    
    console.log('📊 QuickBooks: Fetching invoices...', filters);
    await this.delay(1200);
    
    const invoices = this.generateInvoicesData();
    let filteredInvoices = invoices;
    
    if (filters?.status) {
      filteredInvoices = filteredInvoices.filter(inv => 
        inv.data.status === filters.status
      );
    }
    
    console.log(`✅ QuickBooks: Retrieved ${filteredInvoices.length} invoices`);
    return filteredInvoices;
  }

  /**
   * Generate Profit & Loss report
   */
  async getProfitLossReport(options: {
    startDate: Date;
    endDate: Date;
    summarizeColumnsBy?: 'Month' | 'Quarter' | 'Year';
  }): Promise<any> {
    await this.ensureValidToken();
    
    console.log('📊 QuickBooks: Generating P&L report...', options);
    await this.delay(2500);
    
    return this.generateProfitLossData(options);
  }

  /**
   * Generate Balance Sheet report
   */
  async getBalanceSheetReport(asOfDate: Date): Promise<any> {
    await this.ensureValidToken();
    
    console.log('📊 QuickBooks: Generating Balance Sheet...', asOfDate);
    await this.delay(2000);
    
    return this.generateBalanceSheetData(asOfDate);
  }

  /**
   * Sync all data from QuickBooks
   */
  async syncAllData(): Promise<{
    bills: number;
    invoices: number;
    customers: number;
    vendors: number;
    lastSync: Date;
  }> {
    await this.ensureValidToken();
    
    console.log('🔄 QuickBooks: Starting full data sync...');
    
    // Simulate comprehensive sync
    await this.delay(4000);
    
    this.connection.lastSync = new Date();
    
    const result = {
      bills: 23,
      invoices: 89,
      customers: 45,
      vendors: 32,
      lastSync: this.connection.lastSync
    };
    
    console.log('✅ QuickBooks: Sync completed', result);
    return result;
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): QuickBooksConnection {
    return { ...this.connection };
  }

  /**
   * Disconnect from QuickBooks
   */
  disconnect(): void {
    this.connection = {
      companyId: '',
      accessToken: null,
      refreshToken: null,
      isConnected: false,
      expiresAt: null,
      lastSync: null
    };
    console.log('🔌 QuickBooks: Disconnected');
  }

  // Private helper methods
  private async ensureValidToken(): Promise<void> {
    if (!this.connection.isConnected || !this.connection.accessToken) {
      throw new Error('QuickBooks connection required');
    }
    
    // Check if token needs refresh
    if (this.connection.expiresAt && this.connection.expiresAt <= new Date()) {
      await this.refreshAccessToken();
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  private generateBillsData(): QuickBooksEntity[] {
    return [
      {
        id: 'QB_BILL_001',
        type: 'bill',
        syncToken: '1',
        lastUpdated: new Date('2024-01-15T09:30:00Z'),
        data: {
          docNumber: 'BILL-001',
          vendor: 'Office Depot',
          totalAmount: 1250.00,
          status: 'open',
          dueDate: new Date('2024-02-15'),
          lines: [
            {
              description: 'Office Supplies',
              amount: 850.00,
              account: 'Office Expense'
            },
            {
              description: 'Printer Paper',
              amount: 400.00,
              account: 'Office Expense'
            }
          ]
        }
      },
      {
        id: 'QB_BILL_002',
        type: 'bill',
        syncToken: '2',
        lastUpdated: new Date('2024-01-14T14:20:00Z'),
        data: {
          docNumber: 'BILL-002',
          vendor: 'Utilities Co',
          totalAmount: 3200.00,
          status: 'paid',
          dueDate: new Date('2024-01-20'),
          lines: [
            {
              description: 'Monthly Utilities',
              amount: 3200.00,
              account: 'Utilities Expense'
            }
          ]
        }
      }
    ];
  }

  private generateInvoicesData(): QuickBooksEntity[] {
    return [
      {
        id: 'QB_INV_001',
        type: 'invoice',
        syncToken: '1',
        lastUpdated: new Date('2024-01-15T10:15:00Z'),
        data: {
          docNumber: 'INV-2024-001',
          customer: 'Tech Startup Inc',
          totalAmount: 15000.00,
          status: 'sent',
          dueDate: new Date('2024-02-15'),
          lines: [
            {
              description: 'Consulting Services',
              quantity: 100,
              rate: 150.00,
              amount: 15000.00
            }
          ]
        }
      }
    ];
  }

  private generateProfitLossData(options: any): any {
    return {
      reportName: 'Profit and Loss',
      period: options,
      currency: 'USD',
      data: {
        income: {
          total: 2450000,
          accounts: [
            { name: 'Service Revenue', amount: 1850000 },
            { name: 'Product Sales', amount: 600000 }
          ]
        },
        expenses: {
          total: 1800000,
          accounts: [
            { name: 'Salaries', amount: 900000 },
            { name: 'Rent', amount: 240000 },
            { name: 'Utilities', amount: 60000 },
            { name: 'Marketing', amount: 180000 },
            { name: 'Other Expenses', amount: 420000 }
          ]
        },
        netIncome: 650000
      }
    };
  }

  private generateBalanceSheetData(asOfDate: Date): any {
    return {
      reportName: 'Balance Sheet',
      asOfDate: asOfDate,
      currency: 'USD',
      data: {
        assets: {
          currentAssets: {
            cash: 425000,
            accountsReceivable: 280000,
            inventory: 95000,
            total: 800000
          },
          fixedAssets: {
            equipment: 450000,
            accumulatedDepreciation: -120000,
            total: 330000
          },
          totalAssets: 1130000
        },
        liabilities: {
          currentLiabilities: {
            accountsPayable: 150000,
            accruals: 80000,
            total: 230000
          },
          longTermLiabilities: {
            loans: 300000,
            total: 300000
          },
          totalLiabilities: 530000
        },
        equity: {
          ownerEquity: 400000,
          retainedEarnings: 200000,
          totalEquity: 600000
        }
      }
    };
  }
}

// Export singleton instance
export const quickbooksService = new QuickBooksService();