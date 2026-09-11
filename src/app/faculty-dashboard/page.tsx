'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_FACULTY, DEMO_TIME_SLOTS } from '@/data/demoData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function FacultyDashboardPage() {
  const { timetableCells } = useApp();
  const [selectedFacultyId, setSelectedFacultyId] = useState('fac-1'); // Dr. Suresh Kulkarni

  const faculty = DEMO_FACULTY.find((f) => f.id === selectedFacultyId) || DEMO_FACULTY[0];

  // Faculty specific schedule cells
  const facultyCells = timetableCells.filter((c) => c.facultyId === faculty.id);

  // Today's classes (simulate Monday as today)
  const todayClasses = facultyCells.filter((c) => c.day === 'Monday');

  return (
    <div className="space-y-6">
      {/* Faculty Profile Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 p-6 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-700 text-white font-black text-xl shadow-md">
            SK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black">{faculty.name}</h1>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 border border-emerald-500/30 font-bold">
                Workload: {faculty.workloadStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-teal-200 mt-0.5">
              {faculty.designation} • {faculty.departmentId === 'dept-comp' ? 'Computer Engineering' : 'Department'}
            </p>
            <p className="text-[11px] text-slate-300 mt-1">
              Courses: {faculty.coursesTaught.join(' • ')}
            </p>
          </div>
        </div>

        {/* Switch faculty viewer */}
        <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
          <label className="block text-[10px] uppercase font-bold text-teal-200 mb-1">View Other Faculty</label>
          <select
            value={selectedFacultyId}
            onChange={(e) => setSelectedFacultyId(e.target.value)}
            className="rounded-lg bg-slate-900/80 border border-teal-500/30 text-white text-xs p-1.5 focus:outline-none"
          >
            {DEMO_FACULTY.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.designation.split(' ')[0]})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Metrics Row (Weekly Hours: 14, Lectures: 10, Labs: 4, Free Slots: 16) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Weekly Teaching Load</span>
            <Clock className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">
            {faculty.currentHours} / {faculty.maxHoursPerWeek} hrs
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div
              className="bg-teal-700 h-1.5 rounded-full"
              style={{ width: `${(faculty.currentHours / faculty.maxHoursPerWeek) * 100}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Scheduled Lectures</span>
            <BookOpen className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">10 Sessions</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Theory balanced</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Scheduled Labs</span>
            <CheckCircle2 className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">4 Hours</p>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5">Lab-1 (AI) & Lab-4</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Available Free Slots</span>
            <TrendingUp className="h-4 w-4 text-teal-700" />
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900">16 Slots</p>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">For research & mentoring</p>
        </div>
      </div>

      {/* Main Grid: Today's Sessions & Weekly Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Today's Classes & Preference Indicator */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900">Today&apos;s Sessions (Monday)</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800">
                {todayClasses.length} Scheduled
              </span>
            </div>

            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div key={cls.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{cls.courseName}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 uppercase">
                      Slot {cls.slotNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{DEMO_TIME_SLOTS[cls.slotNumber - 1]?.startTime}–{DEMO_TIME_SLOTS[cls.slotNumber - 1]?.endTime}</span>
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{cls.roomName}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preference Indicator Box */}
          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-950">
              <Sparkles className="h-4 w-4 text-teal-700" />
              <span>Registered Preferences</span>
            </div>
            <p className="text-xs text-teal-800 leading-relaxed">
              Preferred Morning Slots: 08:30–11:25. Timetable engine has achieved{' '}
              <span className="font-bold">100% adherence</span> to morning slots without fragmented idle gaps.
            </p>
            <div className="pt-2">
              <Link
                href="/constraints/faculty"
                className="text-xs font-bold text-teal-900 underline hover:text-teal-950"
              >
                Update My Preferences →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Weekly Timetable Matrix for Dr. Kulkarni */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Weekly Faculty Schedule</h2>
              <p className="text-xs text-slate-500">Filtered for {faculty.name}</p>
            </div>
            <Link
              href="/timetable/generated"
              className="text-xs font-bold text-teal-800 hover:underline flex items-center gap-1"
            >
              <span>Full Master Timetable</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                  <th className="py-2">Slot</th>
                  {DAYS.map((d) => (
                    <th key={d} className="py-2 text-center">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DEMO_TIME_SLOTS.slice(0, 7).map((slot) => (
                  <tr key={slot.slotNumber}>
                    <td className="py-2 font-bold text-slate-700 whitespace-nowrap">
                      {slot.startTime}–{slot.endTime}
                    </td>
                    {DAYS.map((day) => {
                      const cell = facultyCells.find(
                        (c) => c.day === day && (c.slotNumber === slot.slotNumber || (c.durationSlots === 2 && c.slotNumber + 1 === slot.slotNumber))
                      );

                      return (
                        <td key={day} className="py-1.5 px-1 text-center">
                          {cell ? (
                            <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-950">
                              <p className="font-bold text-[10px] truncate">{cell.courseName}</p>
                              <p className="text-[9px] text-teal-700 truncate">{cell.roomName} ({cell.section})</p>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-300">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
