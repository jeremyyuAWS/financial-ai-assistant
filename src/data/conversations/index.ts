// Centralized conversation exports
export * from './monthEndReview';
export * from './auditPrep';
export * from './cashFlowCrisis';
export * from './budgetPlanning';
export * from './collectionsStrategy';
export * from './vendorNegotiation';

// Import conversation variables for local use
import { monthEndReviewConversation } from './monthEndReview';
import { auditPrepConversation } from './auditPrep';
import { cashFlowCrisisConversation } from './cashFlowCrisis';
import { budgetPlanningConversation } from './budgetPlanning';
import { collectionsStrategyConversation } from './collectionsStrategy';
import { vendorNegotiationConversation } from './vendorNegotiation';

// Demo conversation registry
export const demoConversations = [
  {
    id: 'month-end-review',
    title: 'Month-End Review',
    description: 'Monthly performance analysis with executive insights',
    icon: '📊',
    color: 'bg-blue-100 text-blue-800',
    difficulty: 'Intermediate',
    duration: '5 min',
    category: 'Monthly Operations'
  },
  {
    id: 'audit-prep',
    title: 'Audit Preparation',
    description: 'Comprehensive audit readiness check',
    icon: '🔍',
    color: 'bg-purple-100 text-purple-800',
    difficulty: 'Advanced',
    duration: '4 min',
    category: 'Compliance'
  },
  {
    id: 'cash-flow-crisis',
    title: 'Cash Flow Crisis',
    description: 'Urgent cash flow analysis with action plans',
    icon: '🚨',
    color: 'bg-red-100 text-red-800',
    difficulty: 'Advanced',
    duration: '6 min',
    category: 'Crisis Management'
  },
  {
    id: 'budget-planning',
    title: 'Budget Planning',
    description: 'Strategic quarterly budget development',
    icon: '📋',
    color: 'bg-green-100 text-green-800',
    difficulty: 'Intermediate',
    duration: '4 min',
    category: 'Planning'
  },
  {
    id: 'collections-strategy',
    title: 'Collections Strategy',
    description: 'Comprehensive collections planning',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-800',
    difficulty: 'Intermediate',
    duration: '4 min',
    category: 'Collections'
  },
  {
    id: 'vendor-negotiation',
    title: 'Vendor Negotiation',
    description: 'Strategic vendor cost reduction',
    icon: '🤝',
    color: 'bg-indigo-100 text-indigo-800',
    difficulty: 'Intermediate',
    duration: '4 min',
    category: 'Procurement'
  }
];

// Get conversation by ID
export const getConversationById = (id: string) => {
  switch (id) {
    case 'month-end-review':
      return monthEndReviewConversation;
    case 'audit-prep':
      return auditPrepConversation;
    case 'cash-flow-crisis':
      return cashFlowCrisisConversation;
    case 'budget-planning':
      return budgetPlanningConversation;
    case 'collections-strategy':
      return collectionsStrategyConversation;
    case 'vendor-negotiation':
      return vendorNegotiationConversation;
    default:
      return [];
  }
};