import { ChatMessage } from '../../types';

export const budgetPlanningConversation: ChatMessage[] = [
  {
    id: 'budget-001',
    userId: '2',
    message: 'I need to prepare our Q1 2024 budget. Where should I start?',
    response: 'Great! Let me help you build a comprehensive Q1 budget. I\'ll analyze our historical performance and identify key planning areas. Based on Q4 results, we\'re finishing strong with 14% over budget. Let\'s start with revenue projections - what\'s your growth target for Q1?',
    timestamp: new Date('2024-01-10T10:00:00Z'),
    queryType: 'budget_planning',
    processingTime: 1.4,
    isSuccessful: true
  },
  {
    id: 'budget-002',
    userId: '2',
    message: 'We\'re targeting 15% growth for Q1. What should our revenue target be?',
    response: 'With 15% growth target: Q4 2023 revenue was $2.77M, so Q1 2024 should target $3.19M. Monthly breakdown: Jan $1.05M, Feb $1.06M, Mar $1.08M (accounting for seasonal patterns). This is aggressive but achievable given our current pipeline. Key assumption: Enterprise Solutions renewal ($240K) and 2 new major deals.',
    timestamp: new Date('2024-01-10T10:01:00Z'),
    queryType: 'revenue_projection',
    processingTime: 2.0,
    isSuccessful: true
  },
  {
    id: 'budget-003',
    userId: '2',
    message: 'What about our expense budget? Where should we focus?',
    response: 'Q4 expenses averaged $580K/month. For Q1 growth target, I recommend: 📊 FIXED COSTS: Payroll $540K (+8% for new hires), Office/Admin $45K, Legal/Compliance $22K. 💡 VARIABLE COSTS: Sales/Marketing $180K (+20% for growth), IT Infrastructure $36K, Professional Services $30K. 🎯 TOTAL Q1 BUDGET: $2.49M expenses vs $3.19M revenue = $700K profit (22% margin).',
    timestamp: new Date('2024-01-10T10:02:00Z'),
    queryType: 'expense_budget',
    processingTime: 2.3,
    isSuccessful: true
  },
  {
    id: 'budget-004',
    userId: '2',
    message: 'What are the biggest budget risks I should watch for?',
    response: '🚨 TOP BUDGET RISKS: 1) REVENUE RISK: Enterprise Solutions renewal ($240K) - 75% confidence, have backup plan. 2) EXPENSE RISK: New hire costs could exceed $540K if we hire faster than planned. 3) CASH FLOW RISK: Q1 has heavy A/R collections needed ($496K outstanding). 4) MARKET RISK: Economic uncertainty could delay new deals. 📋 MITIGATION: Monthly budget reviews, 90-day cash flow monitoring, contingency plans for each risk.',
    timestamp: new Date('2024-01-10T10:03:00Z'),
    queryType: 'budget_risks',
    processingTime: 2.5,
    isSuccessful: true
  },
  {
    id: 'budget-005',
    userId: '2',
    message: 'Can you create a budget summary for executive approval?',
    response: '📋 Q1 2024 BUDGET SUMMARY: 🎯 REVENUE: $3.19M target (15% growth vs Q4). Growth drivers: Enterprise renewal, 2 new major deals, existing customer expansion. 💰 EXPENSES: $2.49M total. Key investments: New hires ($40K increase), Marketing ($30K increase), IT infrastructure ($6K increase). 📊 PROFIT: $700K (22% margin). 🔍 RISKS: Enterprise renewal, hiring pace, collections timing. ✅ RECOMMENDATION: Approve with monthly reviews and contingency planning.',
    timestamp: new Date('2024-01-10T10:04:00Z'),
    queryType: 'budget_summary',
    processingTime: 2.8,
    isSuccessful: true
  }
];

export const budgetPlanningMeta = {
  title: 'Budget Planning',
  description: 'Strategic quarterly budget development with risk analysis',
  duration: '4 min',
  tags: ['budget', 'planning', 'strategy'],
  difficulty: 'intermediate'
};