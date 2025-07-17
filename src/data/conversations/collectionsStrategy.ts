import { ChatMessage } from '../../types';

export const collectionsStrategyConversation: ChatMessage[] = [
  {
    id: 'collections-001',
    userId: '4',
    message: 'I need to develop a collections strategy for our overdue accounts. What\'s our current situation?',
    response: 'Let me analyze our collections portfolio. Total A/R: $496K. Current: $352K (73% - good). OVERDUE BREAKDOWN: 30-60 days: $34K, 60-90 days: $62K, 90+ days: $48K. Total overdue: $144K (29% of A/R). Priority accounts: Global Tech Partners (€62K, 60+ days), Legacy Manufacturing ($40K, 90+ days). These two represent 71% of overdue amounts.',
    timestamp: new Date('2024-01-18T11:00:00Z'),
    queryType: 'collections_analysis',
    processingTime: 1.8,
    isSuccessful: true
  },
  {
    id: 'collections-002',
    userId: '4',
    message: 'What\'s the best approach for Global Tech Partners?',
    response: 'GLOBAL TECH PARTNERS STRATEGY: Amount: €62K (60+ days overdue). RELATIONSHIP: Long-term client, historically good payer, likely cash flow issue. APPROACH: 1) Executive-level call (CFO to CFO), 2) Offer 2% early payment discount, 3) Propose payment plan (50% now, 50% in 30 days), 4) Leverage upcoming renewal discussion. TIMELINE: Contact within 48 hours, resolve within 2 weeks. SUCCESS PROBABILITY: 85%.',
    timestamp: new Date('2024-01-18T11:01:00Z'),
    queryType: 'client_strategy',
    processingTime: 2.1,
    isSuccessful: true
  },
  {
    id: 'collections-003',
    userId: '4',
    message: 'How should we handle Legacy Manufacturing?',
    response: 'LEGACY MANUFACTURING STRATEGY: Amount: $40K (90+ days - HIGH RISK). SITUATION: Longer-term client, pattern of slow payments, potential financial distress. APPROACH: 1) Immediate contact - firm but professional, 2) Demand immediate payment plan, 3) Consider collection agency if no response in 7 days, 4) Put on credit hold for future orders. LEGAL: Prepare for potential write-off, document all collection efforts. SUCCESS PROBABILITY: 60%.',
    timestamp: new Date('2024-01-18T11:02:00Z'),
    queryType: 'risk_management',
    processingTime: 2.0,
    isSuccessful: true
  },
  {
    id: 'collections-004',
    userId: '4',
    message: 'What about preventing future collection issues?',
    response: 'PREVENTION STRATEGY: 📋 CREDIT MANAGEMENT: 1) Credit checks for all new customers >$25K, 2) Credit limits based on payment history, 3) Require deposits for high-risk accounts. ⚡ PROCESS IMPROVEMENTS: 4) Invoice within 24 hours of delivery, 5) Automated payment reminders at 15, 30, 45 days, 6) Monthly aging review with sales team. 🎯 TARGETS: Reduce 90+ day aging to <5%, improve average collection period to 35 days.',
    timestamp: new Date('2024-01-18T11:03:00Z'),
    queryType: 'process_improvement',
    processingTime: 2.4,
    isSuccessful: true
  },
  {
    id: 'collections-005',
    userId: '4',
    message: 'Can you create a 30-day collections action plan?',
    response: '📋 30-DAY COLLECTIONS ACTION PLAN: 🚨 WEEK 1: Contact Global Tech Partners (executive call), Legacy Manufacturing (formal demand), Retail Chain Solutions ($34K, 30+ days). TARGET: $136K. 📞 WEEK 2: Follow up on all contacts, initiate payment plans, escalate Legacy Manufacturing to collections agency if needed. 📊 WEEK 3: Execute payment plans, monitor compliance, credit hold non-responsive accounts. 🎯 WEEK 4: Review results, adjust strategies, prepare month-end aging report. SUCCESS TARGET: Collect $100K+ (70% of overdue).',
    timestamp: new Date('2024-01-18T11:04:00Z'),
    queryType: 'action_plan',
    processingTime: 2.7,
    isSuccessful: true
  }
];

export const collectionsStrategyMeta = {
  title: 'Collections Strategy',
  description: 'Comprehensive collections planning with risk assessment',
  duration: '4 min',
  tags: ['collections', 'risk', 'strategy'],
  difficulty: 'intermediate'
};