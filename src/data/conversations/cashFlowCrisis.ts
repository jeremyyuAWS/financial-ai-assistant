import { ChatMessage } from '../../types';

export const cashFlowCrisisConversation: ChatMessage[] = [
  {
    id: 'cash-001',
    userId: '3',
    message: 'I\'m concerned about our cash flow this month. Can you give me the current situation?',
    response: 'I understand your concern. Let me analyze the current cash position immediately. Current cash: $850K. This month\'s commitments: Payroll ($180K), vendor bills due ($73K), overdue bills ($26.5K) = $279.5K total. This leaves $570.5K, but we need to consider upcoming expenses and collection timing.',
    timestamp: new Date('2024-01-20T14:30:00Z'),
    queryType: 'cash_analysis',
    processingTime: 1.9,
    isSuccessful: true
  },
  {
    id: 'cash-002',
    userId: '3',
    message: 'What\'s our cash runway if revenue stops today?',
    response: 'Based on current monthly burn rate of $580K (average monthly expenses), we have approximately 1.5 months of runway with current cash. However, we have $496K in outstanding receivables. If we collect just the current receivables ($352K), this extends to 2.1 months. Priority collections could significantly improve this position.',
    timestamp: new Date('2024-01-20T14:31:00Z'),
    queryType: 'cash_runway',
    processingTime: 2.2,
    isSuccessful: true
  },
  {
    id: 'cash-003',
    userId: '3',
    message: 'Which customers should we prioritize for collections?',
    response: 'IMMEDIATE PRIORITY: 1) Global Tech Partners - €62K (overdue 60+ days) - largest single collection opportunity, 2) Legacy Manufacturing - $40K (90+ days) - long overdue, high risk. SECONDARY: 3) Enterprise Solutions Inc - $85K (current, due Feb 15) - large amount, good relationship. Collecting these 3 accounts would add $187K to cash position.',
    timestamp: new Date('2024-01-20T14:32:00Z'),
    queryType: 'collections_priority',
    processingTime: 1.8,
    isSuccessful: true
  },
  {
    id: 'cash-004',
    userId: '3',
    message: 'Can we delay any payments without damaging relationships?',
    response: 'STRATEGIC PAYMENT DELAYS: 1) Tech Infrastructure Corp ($25K) - large IT vendor, likely has 30-day flexibility, 2) Training & Development Co ($5K) - non-critical, good relationship. AVOID DELAYING: Legal Advisory Group ($7.5K) - professional services, affects credit. MUST PAY: Overdue bills ($26.5K) - already late, vendor relationships at risk.',
    timestamp: new Date('2024-01-20T14:33:00Z'),
    queryType: 'payment_strategy',
    processingTime: 2.1,
    isSuccessful: true
  },
  {
    id: 'cash-005',
    userId: '3',
    message: 'What are our options to improve cash flow quickly?',
    response: '💡 IMMEDIATE ACTIONS (1-2 weeks): 1) Accelerate Global Tech Partners collection ($62K) - offer 2% discount for immediate payment, 2) Factor large receivables (Enterprise Solutions $85K) - could get $80K immediately. 📊 MEDIUM TERM (30 days): 3) Negotiate extended payment terms with Tech Infrastructure ($25K), 4) Implement faster invoicing process. 🎯 RESULT: Could improve position by $112K-$142K within 2 weeks.',
    timestamp: new Date('2024-01-20T14:34:00Z'),
    queryType: 'cash_improvement',
    processingTime: 2.7,
    isSuccessful: true
  },
  {
    id: 'cash-006',
    userId: '3',
    message: 'Create an action plan for the next 30 days',
    response: '📋 30-DAY CASH FLOW ACTION PLAN: 🚨 WEEK 1: Contact Global Tech Partners (€62K), implement payment plan Legacy Manufacturing ($40K), delay Tech Infrastructure payment ($25K). 💰 WEEK 2: Follow up collections, factor Enterprise Solutions if needed ($85K), negotiate vendor terms. 📈 WEEK 3: Execute payment deferrals, accelerate new invoicing, monitor daily cash position. 🎯 WEEK 4: Review results, adjust strategy, prepare for next month. TARGET: Improve cash position by $100K+ within 30 days.',
    timestamp: new Date('2024-01-20T14:35:00Z'),
    queryType: 'action_plan',
    processingTime: 3.1,
    isSuccessful: true
  }
];

export const cashFlowCrisisMeta = {
  title: 'Cash Flow Crisis',
  description: 'Urgent cash flow analysis with immediate action recommendations',
  duration: '6 min',
  tags: ['cash-flow', 'crisis', 'urgent'],
  difficulty: 'advanced'
};