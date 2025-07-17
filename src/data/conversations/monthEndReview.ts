import { ChatMessage } from '../../types';

export const monthEndReviewConversation: ChatMessage[] = [
  {
    id: 'me-001',
    userId: '2',
    message: 'Can you help me with our month-end review?',
    response: 'Absolutely! I\'ll help you with the month-end review. Let me pull together the key metrics and areas that need attention. What specific areas would you like to focus on first?',
    timestamp: new Date('2024-01-31T16:00:00Z'),
    queryType: 'month_end',
    processingTime: 1.2,
    isSuccessful: true
  },
  {
    id: 'me-002',
    userId: '2',
    message: 'Show me our revenue performance vs budget for December',
    response: 'December revenue was $985,000 vs budget of $850,000 - that\'s a strong 16% over budget! YTD revenue is now $8.69M vs $7.63M budget (14% over). Key drivers: Enterprise Solutions Inc contract ($120K) and strong Q4 renewals. December was our strongest month this year.',
    timestamp: new Date('2024-01-31T16:01:00Z'),
    queryType: 'revenue_analysis',
    processingTime: 1.8,
    isSuccessful: true
  },
  {
    id: 'me-003',
    userId: '2',
    message: 'What about our outstanding receivables?',
    response: 'Current A/R balance is $496,000. Good news: 73% is current ($352K). Areas of concern: Global Tech Partners has €62K overdue (60+ days), and Legacy Manufacturing has $40K aging (90+ days). I recommend prioritizing collections on these two accounts. Total overdue amount: $119K (24% of total A/R).',
    timestamp: new Date('2024-01-31T16:02:00Z'),
    queryType: 'receivables',
    processingTime: 1.5,
    isSuccessful: true
  },
  {
    id: 'me-004',
    userId: '2',
    message: 'Are there any vendor bills I should be concerned about?',
    response: 'Yes, 2 vendor bills are overdue and need immediate attention: Global Marketing Services (€8,500, due Jan 10) and European Logistics (€18,000, due Jan 15). Both are EMEA subsidiary. Also, you have $54,500 in bills due within the next 5 days. I recommend prioritizing the overdue payments to maintain vendor relationships.',
    timestamp: new Date('2024-01-31T16:03:00Z'),
    queryType: 'vendor_bills',
    processingTime: 1.3,
    isSuccessful: true
  },
  {
    id: 'me-005',
    userId: '2',
    message: 'What\'s our cash flow situation?',
    response: 'Current cash position: $850K. December cash flow was positive at $265K (inflow $985K, outflow $720K). However, with upcoming payroll ($180K), vendor payments ($73K), and the overdue bills ($26.5K), you\'ll need $279.5K in the next week. Recommendation: Accelerate collections on Global Tech Partners and consider extending terms with European Logistics if possible.',
    timestamp: new Date('2024-01-31T16:04:00Z'),
    queryType: 'cash_flow',
    processingTime: 2.1,
    isSuccessful: true
  },
  {
    id: 'me-006',
    userId: '2',
    message: 'Can you generate a summary report for the executive team?',
    response: 'Here\'s your executive summary: 🎯 DECEMBER HIGHLIGHTS: Revenue exceeded budget by 16% ($985K vs $850K). YTD performance: 14% over budget. 📊 KEY METRICS: Gross margin 27%, Cash runway 3.0 months. ⚠️ ACTION ITEMS: 1) Collect $62K from Global Tech Partners, 2) Pay overdue vendor bills ($26.5K), 3) Monitor cash flow with $279.5K obligations next week. 📈 OUTLOOK: Strong finish to year, focus on collections and cash management in Q1.',
    timestamp: new Date('2024-01-31T16:05:00Z'),
    queryType: 'executive_summary',
    processingTime: 2.8,
    isSuccessful: true
  }
];

export const monthEndReviewMeta = {
  title: 'Month-End Review',
  description: 'Comprehensive monthly performance analysis with executive insights',
  duration: '5 min',
  tags: ['month-end', 'executive', 'performance'],
  difficulty: 'intermediate'
};