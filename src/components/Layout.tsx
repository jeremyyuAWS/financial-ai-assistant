import React from 'react';
import { Users, MessageSquare, BarChart3, Settings, LogOut, LayoutDashboard, HelpCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WelcomeModal from './WelcomeModal';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout, hasRole } = useAuth();
  const [showWelcomeModal, setShowWelcomeModal] = React.useState(false);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'finance', 'executive', 'business_unit', 'collections'] },
    { id: 'chat', label: 'Query Bot', icon: MessageSquare, roles: ['admin', 'finance', 'executive', 'business_unit', 'collections'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['admin', 'finance', 'executive'] },
    { id: 'admin', label: 'Admin', icon: Settings, roles: ['admin'] },
    { id: 'users', label: 'Users', icon: Users, roles: ['admin'] }
  ];

  const visibleTabs = tabs.filter(tab => tab.roles.includes(user?.role || ''));

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Financial AI Assistant
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.name} ({user?.role})
              </span>
              <button
                onClick={() => setShowWelcomeModal(true)}
                className="text-gray-500 hover:text-gray-700 p-1"
                title="Help & Information"
              >
                <HelpCircle size={20} />
              </button>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
      />
    </div>
  );
};

export default Layout;