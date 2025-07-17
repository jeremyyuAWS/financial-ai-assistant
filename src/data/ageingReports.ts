import { AgeingReport } from '../types';

export const arAgeingData: AgeingReport[] = [
  {
    customer: 'Enterprise Solutions Inc',
    current: 85000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 85000
  },
  {
    customer: 'Global Tech Partners',
    current: 0,
    days30: 0,
    days60: 62000,
    days90: 0,
    over90: 0,
    total: 62000
  },
  {
    customer: 'Healthcare Systems Ltd',
    current: 120000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 120000
  },
  {
    customer: 'Financial Services Group',
    current: 95000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 95000
  },
  {
    customer: 'Retail Chain Solutions',
    current: 0,
    days30: 34000,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 34000
  },
  {
    customer: 'Education Technology',
    current: 52000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 52000
  },
  {
    customer: 'Legacy Manufacturing Co',
    current: 0,
    days30: 0,
    days60: 0,
    days90: 25000,
    over90: 15000,
    total: 40000
  },
  {
    customer: 'Old School Enterprises',
    current: 0,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 8000,
    total: 8000
  }
];

export const apAgeingData: AgeingReport[] = [
  {
    customer: 'Acme Software Solutions',
    current: 15000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 15000
  },
  {
    customer: 'Global Marketing Services',
    current: 0,
    days30: 0,
    days60: 8500,
    days90: 0,
    over90: 0,
    total: 8500
  },
  {
    customer: 'Tech Infrastructure Corp',
    current: 25000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 25000
  },
  {
    customer: 'Cloud Services Ltd',
    current: 12000,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 12000
  },
  {
    customer: 'Legal Advisory Group',
    current: 7500,
    days30: 0,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 7500
  },
  {
    customer: 'European Logistics',
    current: 0,
    days30: 18000,
    days60: 0,
    days90: 0,
    over90: 0,
    total: 18000
  }
];

export const getTotalAROutstanding = () => 
  arAgeingData.reduce((total, item) => total + item.total, 0);

export const getTotalAPOutstanding = () => 
  apAgeingData.reduce((total, item) => total + item.total, 0);

export const getOverdueAR = () => 
  arAgeingData.reduce((total, item) => total + item.days30 + item.days60 + item.days90 + item.over90, 0);