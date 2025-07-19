import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI Financial Assistant. I can help you analyze financial data, generate reports, and answer questions about your business metrics. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('revenue') || lowerMessage.includes('sales')) {
      return 'Based on your latest data, total revenue for this quarter is $2.4M, representing a 15% increase from last quarter. The top performing product line contributed $890K to this total.';
    }
    
    if (lowerMessage.includes('expense') || lowerMessage.includes('cost')) {
      return 'Current monthly expenses are tracking at $145K, which is 3% under budget. The largest expense categories are payroll (65%), office operations (20%), and marketing (15%).';
    }
    
    if (lowerMessage.includes('cash flow') || lowerMessage.includes('liquidity')) {
      return 'Your current cash position is strong with $1.2M in available funds. Net cash flow for the month is positive at +$85K, with projected cash flow remaining positive through Q4.';
    }
    
    if (lowerMessage.includes('vendor') || lowerMessage.includes('payable')) {
      return 'You have 23 outstanding vendor bills totaling $67K. 5 bills are due within the next 7 days, totaling $12K. The oldest outstanding bill is from TechCorp for $3.5K, due 15 days ago.';
    }
    
    if (lowerMessage.includes('customer') || lowerMessage.includes('receivable')) {
      return 'Outstanding customer invoices total $234K across 47 customers. $45K is past due (>30 days). Your largest outstanding invoice is from MegaCorp for $25K, issued 22 days ago.';
    }
    
    if (lowerMessage.includes('profit') || lowerMessage.includes('margin')) {
      return 'Your gross profit margin is currently 68%, up from 65% last quarter. Net profit margin stands at 18%, which exceeds industry benchmarks of 15% for your sector.';
    }
    
    return 'I understand you\'re asking about financial data. Could you be more specific? I can help with revenue analysis, expense tracking, cash flow, vendor bills, customer invoices, profit margins, and more.';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: simulateAIResponse(userMessage.content),
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(msg => msg.id !== 'typing').concat(botResponse));
      setIsLoading(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Bot className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Financial Assistant</h3>
            <p className="text-sm text-gray-500">Ask me anything about your financial data</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '500px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-start space-x-2 max-w-[80%] ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-100'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is thinking...</span>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about revenue, expenses, cash flow, vendor bills..."
            className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={2}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}