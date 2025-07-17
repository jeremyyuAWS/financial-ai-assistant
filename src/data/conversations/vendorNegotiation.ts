import { ChatMessage } from '../../types';

export const vendorNegotiationConversation: ChatMessage[] = [
  {
    id: 'vendor-001',
    userId: '2',
    message: 'Our vendor costs are getting high. Can you help me analyze our largest expenses and find negotiation opportunities?',
    response: 'Absolutely! Let me analyze our vendor spending. Top expenses: Tech Infrastructure Corp ($25K), European Logistics ($18K), Cloud Services Ltd ($12K), Legal Advisory Group ($7.5K). Total: $86K across all vendors. I see several negotiation opportunities - let\'s start with the largest ones. What\'s your target for cost reduction?',
    timestamp: new Date('2024-01-22T13:00:00Z'),
    queryType: 'vendor_analysis',
    processingTime: 1.6,
    isSuccessful: true
  },
  {
    id: 'vendor-002',
    userId: '2',
    message: 'I\'d like to reduce costs by 15% if possible. What\'s our best approach with Tech Infrastructure Corp?',
    response: 'TECH INFRASTRUCTURE CORP STRATEGY: Current: $25K (largest expense). LEVERAGE POINTS: 1) Long-term relationship (3+ years), 2) Consistent payment history, 3) Multiple services bundled. NEGOTIATION APPROACH: Request 10-15% discount for annual prepayment, explore eliminating underused services, benchmark against competitors. POTENTIAL SAVINGS: $3K-$4K annually. TIMING: Their fiscal year-end is March - perfect timing for negotiation.',
    timestamp: new Date('2024-01-22T13:01:00Z'),
    queryType: 'vendor_strategy',
    processingTime: 2.0,
    isSuccessful: true
  },
  {
    id: 'vendor-003',
    userId: '2',
    message: 'What about our logistics costs with European Logistics?',
    response: 'EUROPEAN LOGISTICS NEGOTIATION: Current: €18K (overdue - use as leverage). OPPORTUNITIES: 1) Volume discounts for Q1 commitments, 2) Renegotiate delivery schedules to reduce expedited shipping, 3) Consolidate shipments for better rates. LEVERAGE: Payment timing (they want immediate payment). STRATEGY: Offer immediate payment of overdue amount + 10% discount on future services. POTENTIAL SAVINGS: €2K-€3K annually.',
    timestamp: new Date('2024-01-22T13:02:00Z'),
    queryType: 'logistics_negotiation',
    processingTime: 1.9,
    isSuccessful: true
  },
  {
    id: 'vendor-004',
    userId: '2',
    message: 'Are there any smaller vendors we should consolidate or eliminate?',
    response: 'CONSOLIDATION OPPORTUNITIES: 🔄 COMBINE: Office Supplies Plus ($1.2K) + Training & Development Co ($5K) - look for single vendor for both. ❌ ELIMINATE: Redundant services - we have 3 different cloud storage providers. 📊 SMALL OPTIMIZATIONS: Global Marketing Services (€8.5K) - good candidate for performance-based pricing. 🎯 TOTAL SAVINGS POTENTIAL: $8K-$12K annually through consolidation and elimination.',
    timestamp: new Date('2024-01-22T13:03:00Z'),
    queryType: 'consolidation_analysis',
    processingTime: 2.2,
    isSuccessful: true
  },
  {
    id: 'vendor-005',
    userId: '2',
    message: 'Can you create a vendor negotiation roadmap for the next quarter?',
    response: '📋 Q1 VENDOR NEGOTIATION ROADMAP: 🎯 FEBRUARY: Tech Infrastructure Corp (target $4K savings), European Logistics (target €3K savings), Cloud Services consolidation. 🔄 MARCH: Legal Advisory Group (explore flat fee vs hourly), Office supplies consolidation, Marketing services renegotiation. 📊 APRIL: Review results, implement new contracts, monitor savings. 🎯 TARGET SAVINGS: $13K-$18K annually (15-20% reduction). SUCCESS METRICS: Cost reduction, improved payment terms, service level maintenance.',
    timestamp: new Date('2024-01-22T13:04:00Z'),
    queryType: 'negotiation_roadmap',
    processingTime: 2.6,
    isSuccessful: true
  }
];

export const vendorNegotiationMeta = {
  title: 'Vendor Negotiation',
  description: 'Strategic vendor cost reduction and contract optimization',
  duration: '4 min',
  tags: ['vendor', 'negotiation', 'cost-reduction'],
  difficulty: 'intermediate'
};