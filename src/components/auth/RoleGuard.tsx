'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Lock, GraduationCap, UserCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

interface RoleGuardProps {
  allowedRoles: UserRole[];
  children: ReactNode;
}

export const RoleGuard = ({ allowedRoles, children }: RoleGuardProps) => {
  const { currentUser } = useApp();

  if (allowedRoles.includes(currentUser.role)) {
    return <>{children}</>;
  }

  // Access Denied UI for unauthorized users (e.g. Students accessing Admin routes)
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 shadow-md">
        <ShieldAlert className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-bold border border-rose-200">
          <Lock className="h-3.5 w-3.5" />
          Strict Role Scope Enforced
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Access Restricted</h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          You are currently signed in as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role} mode). You are strictly authorized to access only content assigned to your role scope.
        </p>
      </div>

      {/* Role details box */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-lg mx-auto">
        <div className="flex items-center justify-between font-bold text-slate-900">
          <span>Active Role: {currentUser.role.toUpperCase()}</span>
          <span className="text-rose-600 font-semibold">Unauthorized Path</span>
        </div>
        <p className="text-slate-500">
          Students cannot view or edit system timetable settings, faculty schedules, or other students&apos; private tasks and records.
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        {currentUser.role === 'student' && (
          <Link
            href="/student-dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 transition shadow-md"
          >
            <GraduationCap className="h-4 w-4" />
            Return to My Student Portal
          </Link>
        )}

        {currentUser.role === 'faculty' && (
          <Link
            href="/faculty-dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 transition shadow-md"
          >
            <UserCheck className="h-4 w-4" />
            Return to Faculty Portal
          </Link>
        )}

        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
        >
          Switch Profile / Role
        </Link>
      </div>
    </div>
  );
};
