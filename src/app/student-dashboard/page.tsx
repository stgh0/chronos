'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Clock,
  MapPin,
  User,
  BookOpen,
  Utensils,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_TIME_SLOTS } from '@/data/demoData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function StudentDashboardPage() {
  const { timetableCells } = useApp();

  // Student SY-A cells
  const studentCells = timetableCells.filter((c) => c.section === 'SY-A' || c.section.startsWith('SY-A'));
  const todayClasses = studentCells.filter((c) => c.day === 'Monday');

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white font-black text-xl shadow-md">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">Aarav Patel</h1>
              <span className="rounded-full bg-teal-500/30 text-teal-200 text-xs px-2.5 py-0.5 border border-teal-400/30 font-bold">
                Division SY-A
              </span>
            </div>
            <p className="text-xs text-teal-100 mt-0.5">
              B.Tech Computer Engineering • Semester 3 • NEP 2020 Major-Minor
            </p>
            <p className="text-[11px] text-teal-200/80 mt-1">
              Elective Track: MDM Internet of Things (IoT) • Roll No: CE-2024-042
            </p>
          </div>
        </div>

        <Link
          href="/timetable/generated"
          className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-teal-900 hover:bg-teal-50 transition shadow"
        >
          View Full Class Schedule
        </Link>
      </div>

      {/* Primary "What's Next?" Magic Moment Card */}
      <div className="rounded-2xl border-2 border-teal-600 bg-gradient-to-r from-teal-50 to-white p-6 shadow-md">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-800 mb-2">
          <Sparkles className="h-4 w-4 text-teal-700" />
          <span>What&apos;s Next? • Up Next in 25 Minutes</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Operating Systems (CE-202)
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-bold text-teal-900 bg-teal-100/80 px-2.5 py-1 rounded-lg">
                <Clock className="h-4 w-4 text-teal-700" />
                <span>Slot 5: 12:20–01:15</span>
              </span>
              <span className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>Lecture Hall C-202 (Floor 2)</span>
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-700">
                <User className="h-4 w-4 text-slate-400" />
                <span>Dr. Suresh Kulkarni</span>
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-teal-200 bg-white text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-400">Classroom Readiness</span>
            <p className="text-xs font-bold text-emerald-700 mt-0.5">AC & Interactive Board Ready</p>
            <p className="text-[11px] text-slate-500">Attendance via ATS QR active</p>
          </div>
        </div>
      </div>

      {/* Grid: Today's Schedule & Lunch Break reminder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today's Lectures */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Today&apos;s Schedule (Monday)</h2>
              <p className="text-xs text-slate-500">6 Academic sessions + 1 Reserved lunch break</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
              SY-A Batch
            </span>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls) => {
              const isLunch = cls.type === 'lunch';
              return (
                <div
                  key={cls.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between ${
                    isLunch
                      ? 'border-rose-200 bg-rose-50/60 text-rose-900'
                      : 'border-slate-100 bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-black text-xs border border-slate-200">
                      {cls.slotNumber}
                    </span>
                    <div>
                      <p className="text-xs font-bold">{cls.courseName}</p>
                      <p className="text-[11px] text-slate-500">
                        {DEMO_TIME_SLOTS[cls.slotNumber - 1]?.startTime}–{DEMO_TIME_SLOTS[cls.slotNumber - 1]?.endTime}
                        {!isLunch && ` • ${cls.facultyName}`}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                      isLunch ? 'bg-rose-100 text-rose-800' : 'bg-white text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cls.roomName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Academic Policy & Lunch Notice */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
              <Utensils className="h-4 w-4 text-amber-700" />
              <span>SY Lunch Reservation</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Your lunch period is scheduled daily at{' '}
              <span className="font-bold">Slot 4 (11:25–12:20)</span>. ATS guarantees zero class scheduling during
              this hour.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              My NEP 2020 Elective Tracks
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <p className="font-bold text-slate-900">MDM: Internet of Things</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Dr. Sandeep Kadam • Lab-5 IoT</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <p className="font-bold text-slate-900">PEC: DevOps & Cloud Systems</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Prof. Priya Iyer • Room C-204</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
