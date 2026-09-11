'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  DoorOpen,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Cpu,
  Layers,
  Utensils,
  Grid3X3,
  Calendar,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_DEPARTMENTS } from '@/data/demoData';

import { RoleGuard } from '@/components/auth/RoleGuard';

export default function DashboardPage() {
  const { currentUser, issues } = useApp();
  const unresolvedIssues = issues.filter((i) => !i.resolved);

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-8">
            <Cpu className="h-64 w-64 text-white" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-700/60 px-3 py-1 text-xs font-semibold text-teal-200 border border-teal-500/30 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Academic Year 2026–2027 • Autumn Semester</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Welcome back, {currentUser.name}
            </h1>
            <p className="mt-1 text-sm text-teal-100 font-medium">
              Chronos Academic Platform is actively orchestrating multidisciplinary timetables for{' '}
              <span className="text-white font-bold">1,400 students</span> across{' '}
              <span className="text-white font-bold">4 departments</span> under NEP 2020 guidelines.
            </p>
          </div>

          {/* Guided Demo Shortcut */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/timetable/upload"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-teal-900 shadow hover:bg-teal-50 transition"
            >
              <span>1. Upload Timetable Data</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/timetable/lunch-breaks"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700/80 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 border border-teal-600/50 transition"
            >
              <Utensils className="h-3.5 w-3.5 text-teal-300" />
              <span>2. Lunch Breaks (SY/TY)</span>
            </Link>
            <Link
              href="/timetable/mdm"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-700/80 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700 border border-teal-600/50 transition"
            >
              <Grid3X3 className="h-3.5 w-3.5 text-teal-300" />
              <span>3. MDM / PEC Grid</span>
            </Link>
            <Link
              href="/timetable/generated"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-900 hover:bg-amber-300 shadow transition"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>View Generated Timetable</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Core Institutional Numbers (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Students</span>
            <Users className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">1,400</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">↑ 100% Enrolled</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Faculty Members</span>
            <GraduationCap className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">72</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">31 assigned</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Departments</span>
            <Building2 className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">4</p>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5">CE, IT, AIDS, ECE</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Courses</span>
            <BookOpen className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">42</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">14 NEP Minors</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Classrooms</span>
            <DoorOpen className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">18</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">88% Utilization</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Specialized Labs</span>
            <Cpu className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">6</p>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5">GPU / IoT Ready</p>
        </div>
      </div>

      {/* Status & Readiness Indicators (5 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-teal-950">Scheduling Readiness</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>
          <p className="mt-2 text-2xl font-black text-teal-900">94%</p>
          <p className="text-xs text-teal-700 mt-1 font-medium">Ready for AI Generation</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Data Validation</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-emerald-700">Passed</p>
          <p className="text-xs text-slate-500 mt-1">4 soft warnings checked</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-950">Scheduling Conflicts</span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-900">{unresolvedIssues.length} Items</p>
          <Link href="/ai-suggestions" className="text-xs text-amber-700 font-bold hover:underline mt-1 block">
            AI Suggestions ready →
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Room Utilization</span>
            <TrendingUp className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">88.4%</p>
          <p className="text-xs text-slate-500 mt-1">Peak: 10:30–01:15</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Unscheduled Lectures</span>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">0 Critical</p>
          <p className="text-xs text-slate-500 mt-1">100% Core courses placed</p>
        </div>
      </div>

      {/* Conflict Resolution Attention Box if issues present */}
      {unresolvedIssues.length > 0 && (
        <div className="rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-500 text-white mt-0.5">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-950">
                {unresolvedIssues.length} Scheduling Clashes Require Coordinator Attention
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                ATS AI Assistant has prepared 1-click verified resolutions for Advanced AI faculty clash, Database Lab
                room collision, and MDM IoT elective overlap.
              </p>
            </div>
          </div>
          <Link
            href="/ai-suggestions"
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 shadow-sm transition whitespace-nowrap"
          >
            <span>Resolve with AI</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Main Grid: Department Readiness & Room Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Readiness Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Department Scheduling Status</h2>
              <p className="text-xs text-slate-500">Autonomous timetable synthesis progress</p>
            </div>
            <Link href="/university/departments" className="text-xs font-semibold text-teal-700 hover:underline">
              View All
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {DEMO_DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{dept.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                      {dept.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Head: {dept.head} • {dept.totalFaculty} Faculty</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Generated</span>
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">94% Soft Satisfied</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room & Lab Utilization */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Infrastructure Allocation & Peak Load</h2>
              <p className="text-xs text-slate-500">Classrooms and specialized laboratories</p>
            </div>
            <Link href="/rooms/classrooms" className="text-xs font-semibold text-teal-700 hover:underline">
              Inspect Rooms
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Lecture Classrooms (Block C)</span>
                <span className="font-bold text-teal-900">88% (16/18 Occupied)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-teal-700 h-2.5 rounded-full" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>High-Performance AI & Data Lab (Lab-1)</span>
                <span className="font-bold text-teal-900">92% (GPU Allocated)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Database & Systems Labs (Lab-2, Lab-3, Lab-4)</span>
                <span className="font-bold text-amber-800">84% (Rebalanced via AI)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>IoT & Embedded Hardware Lab (Lab-5)</span>
                <span className="font-bold text-teal-900">76% (Available Slots Open)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-teal-600 h-2.5 rounded-full" style={{ width: '76%' }} />
              </div>
            </div>

            <div className="p-3 bg-teal-50/60 rounded-lg border border-teal-100 text-xs text-teal-900 flex items-center justify-between">
              <span>Ready to generate fresh timetable variant with updated constraints?</span>
              <Link
                href="/timetable/generate"
                className="font-bold text-teal-800 underline hover:text-teal-950"
              >
                Launch Optimizer →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}
