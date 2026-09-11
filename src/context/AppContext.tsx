'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  TimetableCell,
  LunchConfig,
  MDMSlotSelection,
  SchedulingIssue,
  AISuggestion,
  ScheduleVersion,
  NotificationItem,
} from '@/types';
import {
  DEMO_USERS,
  INITIAL_TIMETABLE_CELLS,
  DEMO_SCHEDULING_ISSUES,
  DEMO_AI_SUGGESTIONS,
  DEMO_SCHEDULE_VERSIONS,
  DEMO_NOTIFICATIONS,
} from '@/data/demoData';
import { timetableService } from '@/services/timetableService';
import { aiSuggestionService } from '@/services/aiSuggestionService';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: UserProfile;
  setCurrentRole: (role: UserRole) => void;
  timetableCells: TimetableCell[];
  lunchConfig: LunchConfig;
  setLunchConfig: React.Dispatch<React.SetStateAction<LunchConfig>>;
  mdmLabSlots: MDMSlotSelection[];
  setMdmLabSlots: React.Dispatch<React.SetStateAction<MDMSlotSelection[]>>;
  mdmTheorySlots: MDMSlotSelection[];
  setMdmTheorySlots: React.Dispatch<React.SetStateAction<MDMSlotSelection[]>>;
  issues: SchedulingIssue[];
  suggestions: AISuggestion[];
  activeScheduleVersion: ScheduleVersion;
  setActiveScheduleVersion: (version: ScheduleVersion) => void;
  isGenerated: boolean;
  setIsGenerated: (generated: boolean) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  unreadCount: number;
  applySuggestion: (suggestionId: string) => void;
  dismissSuggestion: (suggestionId: string) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS[0]);
  const [timetableCells, setTimetableCells] = useState<TimetableCell[]>(INITIAL_TIMETABLE_CELLS);
  const [lunchConfig, setLunchConfig] = useState<LunchConfig>({
    sySlots: [4], // Slot 4 (11:25-12:20)
    tySlots: [5], // Slot 5 (12:20-01:15)
  });

  // Default MDM configuration matching Screenshot 3
  const [mdmLabSlots, setMdmLabSlots] = useState<MDMSlotSelection[]>([
    { day: 'Monday', slotNumber: 1, type: 'lab' },
    { day: 'Monday', slotNumber: 2, type: 'lab' },
    { day: 'Thursday', slotNumber: 1, type: 'lab' },
    { day: 'Thursday', slotNumber: 2, type: 'lab' },
  ]);

  const [mdmTheorySlots, setMdmTheorySlots] = useState<MDMSlotSelection[]>([
    { day: 'Monday', slotNumber: 5, type: 'theory' },
    { day: 'Wednesday', slotNumber: 5, type: 'theory' },
  ]);

  const [issues, setIssues] = useState<SchedulingIssue[]>(DEMO_SCHEDULING_ISSUES);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>(DEMO_AI_SUGGESTIONS);
  const [activeScheduleVersion, setActiveScheduleVersion] = useState<ScheduleVersion>(DEMO_SCHEDULE_VERSIONS[1]);
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEMO_NOTIFICATIONS);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const setCurrentRole = (role: UserRole) => {
    const user = DEMO_USERS.find((u) => u.role === role) || DEMO_USERS[0];
    setCurrentUser(user);
    showToast(`Switched active profile to ${user.name} (${user.roleTitle})`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const applySuggestion = (suggestionId: string) => {
    const res = timetableService.applySuggestion(suggestionId);
    if (res.success) {
      setTimetableCells([...timetableService.getAllCells()]);
      aiSuggestionService.markSuggestionApplied(suggestionId);
      setSuggestions([...aiSuggestionService.getSuggestions()]);
      setIssues([...aiSuggestionService.getIssues()]);
      showToast(res.message, 'success');
    } else {
      showToast('Could not apply suggestion', 'error');
    }
  };

  const dismissSuggestion = (suggestionId: string) => {
    aiSuggestionService.dismissSuggestion(suggestionId);
    setSuggestions([...aiSuggestionService.getSuggestions()]);
    showToast('Suggestion dismissed', 'info');
  };

  const resetAllData = () => {
    timetableService.resetToDefault();
    setTimetableCells(timetableService.getAllCells());
    setIssues(DEMO_SCHEDULING_ISSUES);
    setSuggestions(DEMO_AI_SUGGESTIONS);
    setLunchConfig({ sySlots: [4], tySlots: [5] });
    showToast('All timetable demo data reset to default factory state', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentRole,
        timetableCells,
        lunchConfig,
        setLunchConfig,
        mdmLabSlots,
        setMdmLabSlots,
        mdmTheorySlots,
        setMdmTheorySlots,
        issues,
        suggestions,
        activeScheduleVersion,
        setActiveScheduleVersion,
        isGenerated,
        setIsGenerated,
        notifications,
        markNotificationRead,
        unreadCount,
        applySuggestion,
        dismissSuggestion,
        toasts,
        showToast,
        resetAllData,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-lg border text-sm font-medium transition-all duration-300 transform translate-y-0 ${
              toast.type === 'success'
                ? 'bg-emerald-800 text-white border-emerald-700'
                : toast.type === 'error'
                ? 'bg-rose-800 text-white border-rose-700'
                : toast.type === 'warning'
                ? 'bg-amber-800 text-white border-amber-700'
                : 'bg-teal-900 text-white border-teal-800'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
