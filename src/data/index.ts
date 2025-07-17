// Centralized data exports for the demo application
export * from './vendorBills';
export * from './customerInvoices';
export * from './ageingReports';
export * from './financialStatements';
export * from './userActivity';

// Legacy exports for backward compatibility
export { vendorBillsData as mockVendorBills } from './vendorBills';
export { customerInvoicesData as mockCustomerInvoices } from './customerInvoices';
export { arAgeingData as mockAgeingReport } from './ageingReports';
export { incomeStatementData as mockIncomeStatement } from './financialStatements';
export { chatHistoryData as mockChatHistory } from './userActivity';

// Demo users data
export const mockUsers = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Admin User',
    role: 'admin' as const,
    isActive: true,
    lastLogin: new Date('2024-01-15T10:00:00Z')
  },
  {
    id: '2',
    email: 'jane.doe@company.com',
    name: 'Jane Doe',
    role: 'finance' as const,
    department: 'Finance Operations',
    subsidiary: 'US',
    isActive: true,
    lastLogin: new Date('2024-01-15T09:30:00Z')
  },
  {
    id: '3',
    email: 'john.smith@company.com',
    name: 'John Smith',
    role: 'executive' as const,
    department: 'Executive',
    subsidiary: 'Global',
    isActive: true,
    lastLogin: new Date('2024-01-15T08:45:00Z')
  },
  {
    id: '4',
    email: 'sarah.wilson@company.com',
    name: 'Sarah Wilson',
    role: 'collections' as const,
    department: 'Collections',
    subsidiary: 'US',
    isActive: true,
    lastLogin: new Date('2024-01-15T07:15:00Z')
  },
  {
    id: '5',
    email: 'mike.johnson@company.com',
    name: 'Mike Johnson',
    role: 'business_unit' as const,
    department: 'Sales',
    subsidiary: 'US',
    isActive: true,
    lastLogin: new Date('2024-01-15T06:45:00Z')
  }
];