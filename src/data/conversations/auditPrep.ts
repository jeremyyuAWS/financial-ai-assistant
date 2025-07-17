import { ChatMessage } from '../../types';

export const auditPrepConversation: ChatMessage[] = [
  {
    id: 'audit-001',
    userId: '1',
    message: 'We have an audit coming up next week. Can you help me prepare?',
    response: 'Of course! I\'ll help you prepare for the audit. Let me gather the key financial documents and identify any areas that might need attention. What type of audit is this - internal, external, or compliance?',
    timestamp: new Date('2024-01-25T09:00:00Z'),
    queryType: 'audit_prep',
    processingTime: 1.1,
    isSuccessful: true
  },
  {
    id: 'audit-002',
    userId: '1',
    message: 'External audit by our accounting firm. They\'ll focus on revenue recognition and accounts receivable.',
    response: 'Perfect. For revenue recognition, I can confirm: YTD revenue of $8.69M is properly recorded across 12 months. All customer invoices have proper documentation. For A/R: $496K total outstanding, all properly aged. I\'ve identified potential concern areas: Global Tech Partners (€62K overdue) and Legacy Manufacturing ($40K, 90+ days) - both have supporting documentation.',
    timestamp: new Date('2024-01-25T09:01:00Z'),
    queryType: 'revenue_audit',
    processingTime: 2.3,
    isSuccessful: true
  },
  {
    id: 'audit-003',
    userId: '1',
    message: 'Show me all invoices over $50K that might need detailed review',
    response: 'I found 5 invoices over $50K: 1) Enterprise Solutions Inc - $85K (sent, due Feb 15), 2) Global Tech Partners - €62K (OVERDUE - needs explanation), 3) Healthcare Systems Ltd - $120K (draft status), 4) Financial Services Group - $95K (sent, due Feb 25), 5) Education Technology - $52K (sent, due Feb 18). The Global Tech Partners overdue amount will definitely be questioned.',
    timestamp: new Date('2024-01-25T09:02:00Z'),
    queryType: 'high_value_invoices',
    processingTime: 1.7,
    isSuccessful: true
  },
  {
    id: 'audit-004',
    userId: '1',
    message: 'What about our expense documentation? Any red flags?',
    response: 'I\'ve reviewed all vendor bills and expenses. Everything looks properly documented. Potential auditor questions: 1) European Logistics €18K overdue - ensure payment plan documentation is ready, 2) Tech Infrastructure Corp $25K - large IT expense, have supporting contracts, 3) Legal Advisory Group $7.5K - ensure proper legal expense classification. All expenses have proper approval workflows.',
    timestamp: new Date('2024-01-25T09:03:00Z'),
    queryType: 'expense_audit',
    processingTime: 2.0,
    isSuccessful: true
  },
  {
    id: 'audit-005',
    userId: '1',
    message: 'Can you generate a pre-audit checklist for our team?',
    response: '📋 PRE-AUDIT CHECKLIST: ✅ REVENUE: All invoices over $50K documented, contracts filed, Global Tech Partners collection plan ready. ✅ RECEIVABLES: Aging report current, overdue explanations prepared, collection efforts documented. ✅ EXPENSES: All vendor bills approved, large expenses ($25K+) have supporting contracts. ✅ CASH: Bank reconciliations complete, cash flow projections ready. ⚠️ FOCUS AREAS: Global Tech Partners overdue (€62K), Healthcare Systems draft invoice ($120K), overdue vendor payments explanation.',
    timestamp: new Date('2024-01-25T09:04:00Z'),
    queryType: 'audit_checklist',
    processingTime: 2.5,
    isSuccessful: true
  }
];

export const auditPrepMeta = {
  title: 'Audit Preparation',
  description: 'Comprehensive audit readiness check with detailed documentation review',
  duration: '4 min',
  tags: ['audit', 'compliance', 'documentation'],
  difficulty: 'advanced'
};