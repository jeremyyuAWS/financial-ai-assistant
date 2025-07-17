import React, { useState, useEffect } from 'react';
import { X, Users, Workflow, TrendingUp, Shield, Clock, DollarSign, Brain, MessageSquare, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const roleAgents = [
    {
      role: 'Admin',
      icon: <Settings className="h-6 w-6" />,
      description: 'System oversight and user management',
      capabilities: ['User management', 'System monitoring', 'Security oversight', 'Integration status'],
      color: 'bg-red-50 border-red-200'
    },
    {
      role: 'Finance',
      icon: <DollarSign className="h-6 w-6" />,
      description: 'Financial analysis and reporting',
      capabilities: ['Income statements', 'Balance sheets', 'Vendor bill analysis', 'Budget planning'],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      role: 'Executive',
      icon: <TrendingUp className="h-6 w-6" />,
      description: 'Strategic insights and decision support',
      capabilities: ['Executive dashboards', 'Performance metrics', 'Strategic planning', 'Risk assessment'],
      color: 'bg-purple-50 border-purple-200'
    },
    {
      role: 'Collections',
      icon: <Clock className="h-6 w-6" />,
      description: 'Accounts receivable and collections',
      capabilities: ['A/R aging analysis', 'Collection strategies', 'Customer payment tracking', 'Risk management'],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      role: 'Business Unit',
      icon: <Users className="h-6 w-6" />,
      description: 'Department-specific financial insights',
      capabilities: ['Department budgets', 'Cost center analysis', 'Expense tracking', 'Performance reporting'],
      color: 'bg-green-50 border-green-200'
    }
  ];

  const businessValue = [
    {
      metric: '40%',
      description: 'Reduction in manual report generation time',
      icon: <Clock className="h-8 w-8 text-blue-600" />
    },
    {
      metric: '85%',
      description: 'Faster financial query resolution',
      icon: <Brain className="h-8 w-8 text-green-600" />
    },
    {
      metric: '60%',
      description: 'Improvement in decision-making speed',
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />
    },
    {
      metric: '99.5%',
      description: 'System uptime and reliability',
      icon: <Shield className="h-8 w-8 text-red-600" />
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Natural Language Query',
      description: 'Users interact with the AI using natural language to ask financial questions',
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      step: 2,
      title: 'Data Analysis',
      description: 'AI analyzes relevant financial data from integrated systems',
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      step: 3,
      title: 'Intelligence Processing',
      description: 'Advanced algorithms process data and generate insights',
      icon: <Brain className="h-5 w-5" />
    },
    {
      step: 4,
      title: 'Response Generation',
      description: 'AI delivers actionable insights and recommendations',
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];


  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Financial AI Assistant
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your intelligent financial companion that transforms complex financial data into actionable insights through natural language conversations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI-Powered Analysis</span>
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Natural language financial queries</li>
            <li>• Real-time data from NetSuite & QuickBooks</li>
            <li>• Intelligent insights and recommendations</li>
            <li>• Automated report generation</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Enterprise Security</span>
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Role-based access control</li>
            <li>• Audit trails and compliance</li>
            <li>• Data encryption and security</li>
            <li>• SOX and GDPR compliant</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Your Role: {user?.role}</h4>
        <p className="text-sm text-gray-600">
          {user?.role === 'admin' && 'You have full system access including user management, system monitoring, and all financial data.'}
          {user?.role === 'finance' && 'You can access financial reports, manage vendor bills, analyze income statements, and generate comprehensive financial analytics.'}
          {user?.role === 'executive' && 'You have access to executive dashboards, strategic insights, and high-level performance metrics.'}
          {user?.role === 'collections' && 'You can manage accounts receivable, develop collection strategies, and track customer payment performance.'}
          {user?.role === 'business_unit' && 'You can access department-specific financial data, budget tracking, and cost center analysis.'}
        </p>
      </div>
    </div>
  );

  const renderRoleAgents = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Role-Based Access Agents</h3>
        <p className="text-gray-600">
          Each role has specialized access to relevant financial data and AI capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roleAgents.map((agent) => (
          <div key={agent.role} className={`p-4 rounded-lg border ${agent.color}`}>
            <div className="flex items-center space-x-3 mb-3">
              {agent.icon}
              <div>
                <h4 className="font-semibold text-gray-900">{agent.role}</h4>
                <p className="text-sm text-gray-600">{agent.description}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-700 mb-1">Key Capabilities:</p>
              {agent.capabilities.map((capability, index) => (
                <p key={index} className="text-xs text-gray-600">• {capability}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflow = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">AI Workflow Process</h3>
        <p className="text-gray-600">
          How the Financial AI Assistant processes your queries and delivers insights
        </p>
      </div>

      <div className="space-y-4">
        {workflowSteps.map((step, index) => (
          <div key={step.step} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {step.step}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                {step.icon}
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Example Query Flow</h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p><strong>User:</strong> "Show me all overdue vendor bills over $10K"</p>
          <p><strong>AI:</strong> Analyzes query → Filters vendor bills → Identifies overdue amounts → Generates response with actionable insights</p>
        </div>
      </div>
    </div>
  );

  const renderBusinessValue = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Business Value & ROI</h3>
        <p className="text-gray-600">
          Transform your finance operations and decision-making capabilities
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Core Business Benefits</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Dramatically reduce manual report generation time</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Accelerate financial query resolution</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Improve decision-making speed and accuracy</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Ensure high system reliability and uptime</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Eliminate repetitive financial data analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Enable self-service financial insights</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Reduce dependency on manual spreadsheet analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gray-900">•</span>
                <span>Provide 24/7 access to financial intelligence</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Implementation Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-gray-800">Operational Efficiency</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Automated report generation</li>
              <li>• Instant financial query responses</li>
              <li>• Streamlined month-end processes</li>
              <li>• Reduced manual data analysis</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="font-medium text-gray-800">Strategic Value</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Real-time financial insights</li>
              <li>• Predictive analytics capabilities</li>
              <li>• Risk identification and mitigation</li>
              <li>• Data-driven decision making</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Financial AI Assistant</h2>
                <p className="text-sm text-gray-600">Enterprise Financial Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: <Brain className="h-4 w-4" /> },
              { id: 'roles', label: 'Role Agents', icon: <Users className="h-4 w-4" /> },
              { id: 'workflow', label: 'AI Workflow', icon: <Workflow className="h-4 w-4" /> },
              { id: 'value', label: 'Business Value', icon: <TrendingUp className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'roles' && renderRoleAgents()}
          {activeTab === 'workflow' && renderWorkflow()}
          {activeTab === 'value' && renderBusinessValue()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Ready to explore? Start with the <strong>Query Bot</strong> tab or check out our <strong>Demo Scenarios</strong>.
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;