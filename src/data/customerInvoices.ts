import { CustomerInvoice } from '../types';

export const customerInvoicesData: CustomerInvoice[] = [
  {
    id: 'CI-2024-1001',
    customer: 'Enterprise Solutions Inc',
    invoiceNumber: 'INV-2024-1001',
    amount: 85000,
    currency: 'USD',
    status: 'sent',
    dueDate: new Date('2024-02-15'),
    terms: 'Net 30',
    subsidiary: 'US'
  },
  {
    id: 'CI-2024-1002',
    customer: 'Global Tech Partners',
    invoiceNumber: 'INV-2024-1002',
    amount: 62000,
    currency: 'EUR',
    status: 'overdue',
    dueDate: new Date('2024-01-05'),
    terms: 'Net 30',
    subsidiary: 'EMEA'
  },
  {
    id: 'CI-2024-1003',
    customer: 'Digital Innovation Corp',
    invoiceNumber: 'INV-2024-1003',
    amount: 45000,
    currency: 'USD',
    status: 'paid',
    dueDate: new Date('2024-01-20'),
    terms: 'Net 15',
    subsidiary: 'US'
  },
  {
    id: 'CI-2024-1004',
    customer: 'Healthcare Systems Ltd',
    invoiceNumber: 'INV-2024-1004',
    amount: 120000,
    currency: 'USD',
    status: 'draft',
    dueDate: new Date('2024-03-01'),
    terms: 'Net 30',
    subsidiary: 'US'
  },
  {
    id: 'CI-2024-1005',
    customer: 'Financial Services Group',
    invoiceNumber: 'INV-2024-1005',
    amount: 95000,
    currency: 'USD',
    status: 'sent',
    dueDate: new Date('2024-02-25'),
    terms: 'Net 30',
    subsidiary: 'US'
  },
  {
    id: 'CI-2024-1006',
    customer: 'Manufacturing Alliance',
    invoiceNumber: 'INV-2024-1006',
    amount: 78000,
    currency: 'EUR',
    status: 'paid',
    dueDate: new Date('2024-01-30'),
    terms: 'Net 30',
    subsidiary: 'EMEA'
  },
  {
    id: 'CI-2024-1007',
    customer: 'Retail Chain Solutions',
    invoiceNumber: 'INV-2024-1007',
    amount: 34000,
    currency: 'USD',
    status: 'overdue',
    dueDate: new Date('2024-01-12'),
    terms: 'Net 15',
    subsidiary: 'US'
  },
  {
    id: 'CI-2024-1008',
    customer: 'Education Technology',
    invoiceNumber: 'INV-2024-1008',
    amount: 52000,
    currency: 'USD',
    status: 'sent',
    dueDate: new Date('2024-02-18'),
    terms: 'Net 30',
    subsidiary: 'US'
  }
];

export const getCustomerInvoicesByStatus = (status: string) => 
  customerInvoicesData.filter(invoice => invoice.status === status);

export const getOverdueCustomerInvoices = () => 
  customerInvoicesData.filter(invoice => invoice.status === 'overdue' || invoice.dueDate < new Date());

export const getHighValueInvoices = (threshold: number = 50000) => 
  customerInvoicesData.filter(invoice => invoice.amount > threshold);