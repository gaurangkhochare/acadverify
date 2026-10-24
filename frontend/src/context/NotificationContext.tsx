import React, { createContext, useContext, useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  notify: (type: NotificationType, title: string, message?: string) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback((type: NotificationType, title: string, message?: string) => {
    const id = `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setNotifications((prev) => [...prev, { id, type, title, message }]);

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, [removeNotification]);

  return (
    <NotificationContext.Provider value={{ notifications, notify, removeNotification }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto p-4 rounded-xl border shadow-lg flex items-start justify-between gap-3 transition-all ${
              n.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : n.type === 'error'
                ? 'bg-red-50 border-red-300 text-red-900'
                : n.type === 'warning'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-blue-50 border-blue-300 text-blue-900'
            }`}
          >
            <div>
              <p className="font-semibold text-sm">{n.title}</p>
              {n.message && <p className="text-xs mt-0.5 opacity-90">{n.message}</p>}
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-slate-400 hover:text-slate-700 text-sm font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

