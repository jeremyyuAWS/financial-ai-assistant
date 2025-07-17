import { VendorBill } from '../types';

export const vendorBillsData: VendorBill[] = [
  {
    id: 'VB-2024-001',
    vendor: 'Acme Software Solutions',
    billNumber: 'INV-ASS-2024-001',
    amount: 15000,
    currency: 'USD',
    status: 'pending',
    dueDate: new Date('2024-02-15'),
    department: 'IT',
    subsidiary: 'US'
  },
  {
    id: 'VB-2024-002',
    vendor: 'Global Marketing Services',
    billNumber: 'INV-GMS-2024-002',
    amount: 8500,
    currency: 'EUR',
    status: 'overdue',
    dueDate: new Date('2024-01-10'),
    department: 'Marketing',
    subsidiary: 'EMEA'
  },
  {
    id: 'VB-2024-003',
    vendor: 'Tech Infrastructure Corp',
    billNumber: 'INV-TIC-2024-003',
    amount: 25000,
    currency: 'USD',
    status: 'approved',
    dueDate: new Date('2024-02-28'),
    department: 'Operations',
    subsidiary: 'US'
  },
  {
    id: 'VB-2024-004',
    vendor: 'Office Supplies Plus',
    billNumber: 'INV-OSP-2024-004',
    amount: 1200,
    currency: 'USD',
    status: 'paid',
    dueDate: new Date('2024-01-20'),
    department: 'Admin',
    subsidiary: 'US'
  },
  {
    id: 'VB-2024-005',
    vendor: 'Cloud Services Ltd',
    billNumber: 'INV-CSL-2024-005',
    amount: 12000,
    currency: 'USD',
    status: 'pending',
    dueDate: new Date('2024-02-10'),
    department: 'IT',
    subsidiary: 'US'
  },
  {
    id: 'VB-2024-006',
    vendor: 'Legal Advisory Group',
    billNumber: 'INV-LAG-2024-006',
    amount: 7500,
    currency: 'USD',
    status: 'approved',
    dueDate: new Date('2024-02-05'),
    department: 'Legal',
    subsidiary: 'US'
  },
  {
    id: 'VB-2024-007',
    vendor: 'European Logistics',
    billNumber: 'INV-EL-2024-007',
    amount: 18000,
    currency: 'EUR',
    status: 'overdue',
    dueDate: new Date('2024-01-15'),
    department: 'Operations',
    subsidiary: 'EMEA'
  },
  {
    id: 'VB-2024-008',
    vendor: 'Training & Development Co',
    billNumber: 'INV-TDC-2024-008',
    amount: 5000,
    currency: 'USD',
    status: 'pending',
    dueDate: new Date('2024-02-20'),
    department: 'HR',
    subsidiary: 'US'
  }
];

export const getVendorBillsByStatus = (status: string) => 
  vendorBillsData.filter(bill => bill.status === status);

export const getVendorBillsByDepartment = (department: string) => 
  vendorBillsData.filter(bill => bill.department === department);

export const getOverdueVendorBills = () => 
  vendorBillsData.filter(bill => bill.status === 'overdue' || bill.dueDate < new Date());