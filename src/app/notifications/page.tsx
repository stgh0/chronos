'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, CheckCircle2, AlertTriangle, Info, ArrowRight, Check } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function NotificationsPage() {
  const { notifications, markNotificationRead, showToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">University Scheduling Notifications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time activity log for timetable updates, room reallocations, and solver alerts
          </p>
        </div>

        <button
          onClick={() => {
            notifications.forEach((n) => markNotificationRead(n.id));
            showToast('All notifications marked as read', 'success');
          }}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <Check className="h-3.5 w-3.5" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => markNotificationRead(notif.id)}
            className={`p-4 rounded-2xl border transition-all duration-150 flex items-start justify-between gap-4 cursor-pointer ${
              !notif.read ? 'border-teal-200 bg-teal-50/40 shadow-xs' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-xl mt-0.5 ${
                  notif.type === 'alert'
                    ? 'bg-rose-100 text-rose-700'
                    : notif.type === 'success'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-teal-100 text-teal-700'
                }`}
              >
                {notif.type === 'alert' ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : notif.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Info className="h-4 w-4" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900">{notif.title}</h3>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-teal-600" />}
                </div>
                <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                <span className="text-[10px] text-slate-400 mt-1 block">{notif.timestamp}</span>
              </div>
            </div>

            {notif.actionUrl && (
              <Link
                href={notif.actionUrl}
                className="flex items-center gap-1 text-xs font-bold text-teal-800 hover:underline shrink-0"
              >
                <span>View</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
