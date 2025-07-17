import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Clock, CheckCircle, AlertCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChatMessage } from '../types';
import { demoConversations, getConversationById } from '../data/conversations';
import { 
  chatHistoryData, 
  vendorBillsData, 
  customerInvoicesData,
  arAgeingData,
  incomeStatementData,
  balanceSheetData,
  getTotalAROutstanding,
  getOverdueVendorBills,
  getHighValueInvoices,
  getYTDRevenue,
  getNetIncome,
  getGrossMargin
} from '../data';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(chatHistoryData);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoplayActive, setAutoplayActive] = useState(false);
  const [currentDemo, setCurrentDemo] = useState<string | null>(null);
  const [demoProgress, setDemoProgress] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const stopAutoplay = () => {
    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }
    setAutoplayActive(false);
    setCurrentDemo(null);
    setDemoProgress(0);
    setIsTyping(false);
  };

  const startAutoplayDemo = (demoId: string) => {
    // Stop any existing autoplay
    stopAutoplay();
    
    // Clear current messages
    setMessages([]);
    
    // Get the demo conversation
    const conversation = getConversationById(demoId);
    if (!conversation || conversation.length === 0) return;
    
    setCurrentDemo(demoId);
    setAutoplayActive(true);
    setDemoProgress(0);
    
    // Play the conversation
    playConversation(conversation);
  };

  const playConversation = (conversation: ChatMessage[]) => {
    let currentIndex = 0;
    
    const playNext = () => {
      if (currentIndex >= conversation.length) {
        setAutoplayActive(false);
        setCurrentDemo(null);
        setDemoProgress(0);
        return;
      }
      
      const message = conversation[currentIndex];
      setDemoProgress(((currentIndex + 1) / conversation.length) * 100);
      
      // Add user message
      const userMessage: ChatMessage = {
        ...message,
        id: `demo-${Date.now()}-${currentIndex}`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, { ...userMessage, response: '' }]);
      
      // Simulate typing
      setIsTyping(true);
      
      // Add bot response after delay
      autoplayTimeoutRef.current = setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, response: message.response } : msg
        ));
        setIsTyping(false);
        
        // Move to next message
        currentIndex++;
        
        // Continue with next message after a brief pause
        if (currentIndex < conversation.length) {
          autoplayTimeoutRef.current = setTimeout(playNext, 1500);
        } else {
          setAutoplayActive(false);
          setCurrentDemo(null);
          setDemoProgress(0);
        }
      }, 1500 + Math.random() * 1000);
    };
    
    playNext();
  };

  const simulateQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Enhanced AI responses with real simulated data
    if (lowerQuery.includes('overdue') && lowerQuery.includes('vendor')) {
      const overdueBills = getOverdueVendorBills();
      const totalOverdue = overdueBills.reduce((sum, bill) => sum + bill.amount, 0);
      return `I found ${overdueBills.length} overdue vendor bills totaling $${totalOverdue.toLocaleString()}: ${overdueBills.map(bill => `${bill.vendor} ($${bill.amount.toLocaleString()})`).join(', ')}. These require immediate attention for cash flow management.`;
    }
    
    if (lowerQuery.includes('invoice') && (lowerQuery.includes('50k') || lowerQuery.includes('50000'))) {
      const highValueInvoices = getHighValueInvoices(50000);
      const totalValue = highValueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
      return `I found ${highValueInvoices.length} customer invoices over $50k: ${highValueInvoices.map(inv => `${inv.customer} ($${inv.amount.toLocaleString()})`).join(', ')}. Total value: $${totalValue.toLocaleString()}.`;
    }
    
    if (lowerQuery.includes('balance sheet') || lowerQuery.includes('assets')) {
      const { assets, liabilities, equity } = balanceSheetData;
      return `Current balance sheet summary: Total Assets: $${(assets.totalAssets/1000000).toFixed(1)}M, Total Liabilities: $${(liabilities.totalLiabilities/1000000).toFixed(1)}M, Total Equity: $${(equity.totalEquity/1000000).toFixed(1)}M. Cash position: $${(assets.cash/1000).toFixed(0)}K. Current ratio: ${(assets.currentAssets/liabilities.currentLiabilities).toFixed(2)}.`;
    }
    
    if (lowerQuery.includes('income') || lowerQuery.includes('revenue')) {
      const ytdRevenue = getYTDRevenue();
      const netIncome = getNetIncome();
      const grossMargin = getGrossMargin();
      return `Year-to-date revenue: $${(ytdRevenue/1000000).toFixed(2)}M. Net income: $${(netIncome/1000000).toFixed(2)}M. Gross margin: ${grossMargin}%. December was strongest at $${(incomeStatementData.revenue[11].amount/1000).toFixed(0)}K.`;
    }
    
    if (lowerQuery.includes('aging') || lowerQuery.includes('receivables')) {
      const totalAR = getTotalAROutstanding();
      const currentAR = arAgeingData.reduce((sum, item) => sum + item.current, 0);
      const overdueAR = arAgeingData.reduce((sum, item) => sum + item.days30 + item.days60 + item.days90 + item.over90, 0);
      return `A/R Aging Summary: Current: $${(currentAR/1000).toFixed(0)}K (${Math.round(currentAR/totalAR*100)}%), Overdue: $${(overdueAR/1000).toFixed(0)}K (${Math.round(overdueAR/totalAR*100)}%). Total outstanding: $${(totalAR/1000).toFixed(0)}K. Priority collections needed for accounts over 60 days.`;
    }
    
    if (lowerQuery.includes('cash flow') || lowerQuery.includes('cash position')) {
      const cashPosition = balanceSheetData.assets.cash;
      const monthlyExpenses = incomeStatementData.expenses[incomeStatementData.expenses.length - 1].amount;
      const runway = cashPosition / monthlyExpenses;
      return `Current cash position: $${(cashPosition/1000).toFixed(0)}K. Monthly burn rate: $${(monthlyExpenses/1000).toFixed(0)}K. Cash runway: ${runway.toFixed(1)} months. Accounts receivable: $${(balanceSheetData.assets.accountsReceivable/1000).toFixed(0)}K available for collection.`;
    }

    if (lowerQuery.includes('department') || lowerQuery.includes('cost center')) {
      const itSpending = vendorBillsData.filter(bill => bill.department === 'IT').reduce((sum, bill) => sum + bill.amount, 0);
      const marketingSpending = vendorBillsData.filter(bill => bill.department === 'Marketing').reduce((sum, bill) => sum + bill.amount, 0);
      const totalSpending = vendorBillsData.reduce((sum, bill) => sum + bill.amount, 0);
      return `Department spending analysis: IT: $${(itSpending/1000).toFixed(0)}K (${Math.round(itSpending/totalSpending*100)}%), Marketing: $${(marketingSpending/1000).toFixed(0)}K (${Math.round(marketingSpending/totalSpending*100)}%), Operations and other departments make up the remainder. Total vendor bills: $${(totalSpending/1000).toFixed(0)}K.`;
    }

    return 'I understand you\'re asking about financial data. I can help with vendor bills, customer invoices, aging reports, income statements, balance sheets, and more. Could you please be more specific about what information you need?';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;
    
    // Stop autoplay if user starts typing
    if (autoplayActive) {
      stopAutoplay();
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      message: input,
      response: '',
      timestamp: new Date(),
      queryType: 'general',
      processingTime: 0,
      isSuccessful: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const startTime = Date.now();
      const response = simulateQuery(input);
      const processingTime = (Date.now() - startTime) / 1000;

      const botResponse: ChatMessage = {
        ...userMessage,
        response,
        processingTime,
        isSuccessful: true
      };

      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? botResponse : msg
      ));
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="space-y-6">
      {/* Demo Conversation Tags */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Demo Scenarios</h3>
          {autoplayActive && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${demoProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{Math.round(demoProgress)}%</span>
              </div>
              <button
                onClick={stopAutoplay}
                className="flex items-center space-x-2 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                <Pause size={14} />
                <span>Stop Demo</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoConversations.map((demo) => (
            <div key={demo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{demo.icon}</span>
                  <h4 className="font-medium text-gray-900">{demo.title}</h4>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${demo.color}`}>
                  {demo.difficulty}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{demo.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <span>{demo.duration}</span>
                  <span>•</span>
                  <span>{demo.category}</span>
                </div>
                
                <button
                  onClick={() => startAutoplayDemo(demo.id)}
                  disabled={autoplayActive}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm"
                >
                  <Play size={14} />
                  <span>Play</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {!autoplayActive && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              💡 Click any demo scenario above to see a realistic conversation between a finance professional and the AI assistant
            </p>
          </div>
        )}
      </div>

      {/* Chat Interface */}
      <div className="h-[600px] flex flex-col bg-white border border-gray-200 rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !autoplayActive && (
          <div className="text-center text-gray-500 mt-8">
            <Bot size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">Financial AI Assistant</p>
            <p className="text-sm mt-2">Start by selecting a demo scenario above or ask me a question about your financial data</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            {/* User Message */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-900">{message.message}</p>
                </div>
                <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                  <Clock size={12} />
                  <span>{message.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Bot Response */}
            {message.response && (
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-900 text-white rounded-lg p-3 max-w-md">
                    <p className="text-sm">{message.response}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                    {message.isSuccessful ? (
                      <CheckCircle size={12} className="text-green-500" />
                    ) : (
                      <AlertCircle size={12} className="text-red-500" />
                    )}
                    <span>Processed in {message.processingTime.toFixed(1)}s</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-gray-900 text-white rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={autoplayActive ? "Demo in progress..." : "Ask me about vendor bills, invoices, aging reports, financial statements..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            disabled={isTyping || autoplayActive}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim() || autoplayActive}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ChatInterface;