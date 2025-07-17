import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import ReportsTab from './components/ReportsTab';
import Dashboard from './components/Dashboard';
import AdminTab from './components/AdminTab';
import UsersTab from './components/UsersTab';
import PWAInstallBanner from './components/PWAInstallBanner';
import OfflineIndicator from './components/OfflineIndicator';
import NotificationManager from './components/NotificationManager';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial AI Assistant</h2>
              <p className="text-gray-600 mb-6">
                Ask me about vendor bills, customer invoices, aging reports, financial statements, and more.
                I can help you analyze your financial data using natural language queries.
              </p>
            </div>
            <ChatInterface />
          </div>
        );
      case 'reports':
        return <ReportsTab />;
      case 'admin':
        return <AdminTab />;
      case 'users':
        return <UsersTab />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderActiveTab()}
      <PWAInstallBanner />
      <OfflineIndicator />
      <NotificationManager />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;