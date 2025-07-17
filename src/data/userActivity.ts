import { ChatMessage } from '../types';

export const chatHistoryData: ChatMessage[] = [
  {
    id: 'msg-001',
    userId: '2',
    message: 'Show me all overdue vendor bills',
    response: 'I found 2 overdue vendor bills totaling €26,500: Global Marketing Services (€8,500) due Jan 10, 2024, and European Logistics (€18,000) due Jan 15, 2024. Both are in the EMEA subsidiary.',
    timestamp: new Date('2024-01-15T09:15:00Z'),
    queryType: 'vendor_bills',
    processingTime: 1.2,
    isSuccessful: true
  },
  {
    id: 'msg-002',
    userId: '2',
    message: 'What are the customer invoices over $50k?',
    response: 'I found 5 customer invoices over $50k: Enterprise Solutions Inc ($85,000), Global Tech Partners (€62,000), Healthcare Systems Ltd ($120,000), Financial Services Group ($95,000), and Education Technology ($52,000). Total value: $414,000.',
    timestamp: new Date('2024-01-15T09:20:00Z'),
    queryType: 'customer_invoices',
    processingTime: 0.8,
    isSuccessful: true
  },
  {
    id: 'msg-003',
    userId: '3',
    message: 'What is our current cash position?',
    response: 'Current cash position: $850,000. Total current assets: $1,431,000. Cash represents 59% of current assets. Monthly burn rate: approximately $580,000. Cash runway: 1.5 months based on current spending.',
    timestamp: new Date('2024-01-15T08:45:00Z'),
    queryType: 'balance_sheet',
    processingTime: 1.5,
    isSuccessful: true
  },
  {
    id: 'msg-004',
    userId: '2',
    message: 'Show me A/R aging report',
    response: 'A/R Aging Summary: Current: $352,000 (73%), 30-60 days: $96,000 (20%), 60-90 days: $25,000 (5%), Over 90 days: $23,000 (5%). Total outstanding: $496,000. Priority collections: Global Tech Partners and Legacy Manufacturing Co.',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    queryType: 'ar_aging',
    processingTime: 1.1,
    isSuccessful: true
  },
  {
    id: 'msg-005',
    userId: '1',
    message: 'Revenue trend analysis Q4 vs Q3',
    response: 'Q4 Revenue: $2,770,000 vs Q3: $2,125,000 (+30% growth). Monthly average Q4: $923,333 vs Q3: $708,333. December was strongest at $985,000. All months exceeded budget by average 12%.',
    timestamp: new Date('2024-01-15T11:00:00Z'),
    queryType: 'income_statement',
    processingTime: 2.1,
    isSuccessful: true
  }
];

export const getRecentQueries = (limit: number = 10) => 
  chatHistoryData.slice(-limit).reverse();

export const getQueriesByUser = (userId: string) => 
  chatHistoryData.filter(query => query.userId === userId);

export const getSuccessfulQueries = () => 
  chatHistoryData.filter(query => query.isSuccessful);

export const getAverageResponseTime = () => 
  chatHistoryData.reduce((sum, query) => sum + query.processingTime, 0) / chatHistoryData.length;