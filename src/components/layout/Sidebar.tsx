'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  BookOpen,
  DoorOpen,
  Sliders,
  UploadCloud,
  CheckCircle2,
  Utensils,
  Grid3X3,
  Wand2,
  Calendar,
  Layers,
  Sparkles,
  UserCheck,
  FileSpreadsheet,
  Settings as SettingsIcon,
  Bell,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Lock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  badgeColor?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar = () => {
  const pathname = usePathname();
  const { currentUser, issues } = useApp();
  const unresolvedIssuesCount = issues.filter((i) => !i.resolved).length;

  // Filter sections based on user role for strict access control
  let sections: NavSection[] = [];

  if (currentUser.role === 'student') {
    sections = [
      {
        title: 'MY STUDENT PORTAL',
        items: [
          { label: 'My Schedule', href: '/student-dashboard', icon: GraduationCap },
          { label: 'My Courses', href: '/student-dashboard/courses', icon: BookOpen },
          { label: 'My Assigned Tasks', href: '/student-dashboard/tasks', icon: CheckSquare, badge: 'Personal' },
        ],
      },
      {
        title: 'NOTIFICATIONS & SYSTEM',
        items: [
          { label: 'Notifications', href: '/notifications', icon: Bell },
        ],
      },
    ];
  } else if (currentUser.role === 'faculty') {
    sections = [
      {
        title: 'FACULTY PORTAL',
        items: [
          { label: 'My Teaching Schedule', href: '/faculty-dashboard', icon: UserCheck },
          { label: 'My Courses', href: '/faculty-dashboard/courses', icon: BookOpen },
        ],
      },
      {
        title: 'COMMUNICATION',
        items: [
          { label: 'Notifications', href: '/notifications', icon: Bell },
        ],
      },
    ];
  } else {
    // Admin Role
    sections = [
      {
        title: 'OVERVIEW',
        items: [
          { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ],
      },
      {
        title: 'TIMETABLE GENERATOR',
        items: [
          { label: '1. Upload Data', href: '/timetable/upload', icon: UploadCloud },
          { label: '2. Validate Data', href: '/timetable/validate', icon: CheckCircle2 },
          { label: '3. Lunch Breaks', href: '/timetable/lunch-breaks', icon: Utensils, badge: 'Key' },
          { label: '4. MDM / PEC Grid', href: '/timetable/mdm', icon: Grid3X3, badge: 'NEP' },
          { label: '5. Config Wizard', href: '/timetable/configure', icon: Sliders },
          { label: '6. Run Scheduler', href: '/timetable/generate', icon: Wand2 },
          { label: '7. Master Timetable', href: '/timetable/generated', icon: Calendar },
          { label: '8. Compare Schedules', href: '/timetable/compare', icon: Layers },
        ],
      },
      {
        title: 'INTELLIGENT ASSISTANT',
        items: [
          {
            label: 'AI Suggestions',
            href: '/ai-suggestions',
            icon: Sparkles,
            badge: unresolvedIssuesCount > 0 ? unresolvedIssuesCount : undefined,
            badgeColor: 'bg-rose-500 text-white',
          },
        ],
      },
      {
        title: 'INSTITUTION & DATA',
        items: [
          { label: 'Departments', href: '/university/departments', icon: Building2 },
          { label: 'Programs & Tracks', href: '/university/programs', icon: GraduationCap },
          { label: 'Academic Settings', href: '/university/academic-settings', icon: Sliders },
          { label: 'Student Batches', href: '/students', icon: Users },
          { label: 'Faculty Directory', href: '/faculty', icon: UserCheck },
          { label: 'Courses Catalog', href: '/courses', icon: BookOpen },
          { label: 'Classrooms', href: '/rooms/classrooms', icon: DoorOpen },
          { label: 'Laboratories', href: '/rooms/labs', icon: DoorOpen },
        ],
      },
      {
        title: 'CONSTRAINTS ENGINE',
        items: [
          { label: 'General Rules', href: '/constraints/general', icon: Sliders },
          { label: 'Faculty Preferences', href: '/constraints/faculty', icon: Sliders },
          { label: 'Room Capacities', href: '/constraints/rooms', icon: Sliders },
          { label: 'Student Groups', href: '/constraints/student-groups', icon: Sliders },
        ],
      },
      {
        title: 'ROLE PORTALS PREVIEW',
        items: [
          { label: 'Faculty View', href: '/faculty-dashboard', icon: UserCheck },
          { label: 'Student View', href: '/student-dashboard', icon: GraduationCap },
        ],
      },
      {
        title: 'OUTPUT & SYSTEM',
        items: [
          { label: 'Reports & Export', href: '/reports', icon: FileSpreadsheet },
          { label: 'Notifications', href: '/notifications', icon: Bell },
          { label: 'System Settings', href: '/settings', icon: SettingsIcon },
        ],
      },
    ];
  }

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white font-black text-lg shadow-md shadow-teal-900/40 group-hover:bg-teal-500 transition">
            C
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white tracking-tight text-base group-hover:text-teal-300 transition">
                CHRONOS
              </span>
              <span className="bg-teal-500/20 text-teal-400 text-[10px] font-bold px-1.5 py-0.2 rounded border border-teal-500/30">
                ACADEMIC
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">NEP 2020 Platform</span>
          </div>
        </Link>
      </div>

      {/* User Scope Indicator Card */}
      <div className="mx-3 my-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${currentUser.role === 'student' ? 'bg-amber-500/20 text-amber-400' : currentUser.role === 'faculty' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-teal-500/20 text-teal-400'}`}>
            <Lock className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Access Scope</p>
            <p className="text-xs font-bold text-slate-200 capitalize">{currentUser.role} Mode</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          Strict
        </span>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 custom-scrollbar">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <h3 className="px-2 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              {section.title}
            </h3>
            <div className="space-y-0.5 mt-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm font-bold'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 transition-colors ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          item.badgeColor || 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950 text-slate-500 text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
          <span>Strict Auth Active</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">v2.4.0</span>
      </div>
    </aside>
  );
};
