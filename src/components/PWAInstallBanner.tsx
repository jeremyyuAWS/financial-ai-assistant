import React, { useState } from 'react';
import { X, Smartphone, Download } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const PWAInstallBanner: React.FC = () => {
  const { deferredPrompt, isInstalled, installPWA } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (isInstalled || dismissed || !deferredPrompt) {
    return null;
  }

  const handleInstall = () => {
    installPWA();
    setDismissed(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 p-2 bg-gray-800 rounded-lg">
          <Smartphone size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Install Financial AI Assistant</h3>
          <p className="text-xs text-gray-300 mt-1">
            Install our app for quick access and offline capabilities
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={handleInstall}
              className="flex items-center space-x-1 px-3 py-1 bg-white text-gray-900 rounded text-xs font-medium hover:bg-gray-100"
            >
              <Download size={12} />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-1 text-gray-300 hover:text-white text-xs"
            >
              Maybe later
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-gray-800 rounded"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default PWAInstallBanner;