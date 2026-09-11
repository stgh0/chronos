'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Lock,
  LogOut,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Header = () => {
  const { currentUser, notifications, unreadCount, markNotificationRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs select-none">
      {/* Left: Branding / Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-800 text-white font-extrabold text-xs">
            C
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            Chronos Academic
          </span>
          <span className="hidden sm:inline-block text-[11px] text-slate-400 font-medium border-l border-slate-200 pl-2 ml-1">
            Demo University — CE Dept
          </span>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, faculty, rooms, constraints..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition"
          />
        </div>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">System Activity & Alerts</span>
                <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                  {unreadCount} New
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition ${
                      !n.read ? 'bg-teal-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">{n.title}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Identity Chip */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-extrabold text-xs">
            {currentUser.name.substring(0, 2).toUpperCase()}
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-slate-500 capitalize flex items-center gap-1">
              <Lock className="h-2.5 w-2.5 text-teal-600" />
              {currentUser.role} Mode
            </span>
          </div>

          <Link
            href="/login"
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition ml-1"
            title="Log Out / Switch Account"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
};
