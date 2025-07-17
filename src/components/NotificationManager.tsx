import React, { useState, useEffect } from 'react';
import { Bell, BellOff, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const NotificationManager: React.FC = () => {
  const { notificationPermission, requestNotificationPermission, sendNotification } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; timestamp: Date }>>([]);

  useEffect(() => {
    // Show notification prompt after 10 seconds if not granted
    const timer = setTimeout(() => {
      if (notificationPermission === 'default') {
        setShowPrompt(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [notificationPermission]);

  useEffect(() => {
    // Simulate financial alerts
    const interval = setInterval(() => {
      if (notificationPermission === 'granted') {
        const alerts = [
          { title: 'Overdue Invoice Alert', message: 'Enterprise Solutions Inc invoice is now 30 days overdue' },
          { title: 'Cash Flow Alert', message: 'Cash position below recommended threshold' },
          { title: 'Monthly Report Ready', message: 'Your monthly financial report is ready for review' },
          { title: 'Vendor Payment Due', message: '3 vendor payments due within 5 days' }
        ];

        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        const notification = sendNotification(randomAlert.title, {
          body: randomAlert.message,
          tag: 'financial-alert'
        });

        if (notification) {
          const newNotification = {
            id: Date.now().toString(),
            title: randomAlert.title,
            message: randomAlert.message,
            timestamp: new Date()
          };
          setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
        }
      }
    }, 30000); // Every 30 seconds for demo

    return () => clearInterval(interval);
  }, [notificationPermission, sendNotification]);

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    if (permission === 'granted') {
      setShowPrompt(false);
      sendNotification('Notifications Enabled', {
        body: 'You\'ll now receive important financial alerts'
      });
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      {/* Notification Permission Prompt */}
      {showPrompt && (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-80 z-50">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 p-2 bg-blue-100 rounded-lg">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-900">Stay Updated</h3>
              <p className="text-xs text-gray-600 mt-1">
                Get notified about important financial updates and alerts
              </p>
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={handleEnableNotifications}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                >
                  Enable Notifications
                </button>
                <button
                  onClick={() => setShowPrompt(false)}
                  className="px-3 py-1 text-gray-500 hover:text-gray-700 text-xs"
                >
                  Not now
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Notification History */}
      {notifications.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 space-y-2 z-40">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 animate-slide-in"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">{notification.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationManager;