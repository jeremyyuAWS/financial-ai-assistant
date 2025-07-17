export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'finance' | 'executive' | 'business_unit' | 'collections';
  subsidiary?: string;
  department?: string;
  lastLogin?: Date;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  message: string;
  response: string;
  timestamp: Date;
  queryType: string;
  processingTime: number;
  isSuccessful: boolean;
}

export interface FinancialReport {
  id: string;
  name: string;
  type: 'vendor_bills' | 'purchase_orders' | 'customer_invoices' | 'ar_aging' | 'ap_aging' | 'income_statement' | 'balance_sheet' | 'subscriptions';
  data: any[];
  generatedAt: Date;
  generatedBy: string;
  subsidiary?: string;
  department?: string;
}

export interface QueryStats {
  totalQueries: number;
  successfulQueries: number;
  averageResponseTime: number;
  topQueries: { query: string; count: number }[];
  userActivity: { userId: string; queryCount: number }[];
}

export interface VendorBill {
  id: string;
  vendor: string;
  billNumber: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'paid' | 'overdue';
  dueDate: Date;
  department: string;
  subsidiary: string;
}

export interface CustomerInvoice {
  id: string;
  customer: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  terms: string;
  subsidiary: string;
}

export interface AgeingReport {
  customer: string;
  current: number;
  days30: number;
  days60: number;
  days90: number;
  over90: number;
  total: number;
}