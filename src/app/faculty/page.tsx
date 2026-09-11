'use client';

import React, { useState } from 'react';
import { UserCheck, Clock, BookOpen, Search, Plus, Sparkles } from 'lucide-react';
import { DEMO_FACULTY } from '@/data/demoData';

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DEMO_FACULTY.filter(
    (f) =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.coursesTaught.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Directory & Workload</h1>
          <p className="text-xs text-slate-500 mt-1">
            Faculty weekly teaching caps, preferred time shifts, and subject allotments
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
          <Plus className="h-4 w-4" />
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search faculty name or course..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((fac) => (
          <div key={fac.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-800 text-white font-bold text-sm">
                  {fac.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{fac.name}</h3>
                  <p className="text-xs text-slate-500">{fac.designation}</p>
                  <p className="text-[11px] text-teal-800 font-medium">{fac.email}</p>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                {fac.workloadStatus}
              </span>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-semibold">Teaching Load</span>
                <span className="font-bold text-slate-900">
                  {fac.currentHours} / {fac.maxHoursPerWeek} hrs/week
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-teal-700 h-1.5 rounded-full"
                  style={{ width: `${(fac.currentHours / fac.maxHoursPerWeek) * 100}%` }}
                />
              </div>

              <div className="pt-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Courses Assigned</span>
                <p className="text-xs text-slate-700 font-medium mt-0.5">{fac.coursesTaught.join(', ')}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Preferred Shifts</span>
                <p className="text-[11px] text-slate-500">{fac.preferredSlots.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
