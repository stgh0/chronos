'use client';

import React, { useState } from 'react';
import { Users, GraduationCap, Plus, Search, Filter } from 'lucide-react';
import { DEMO_STUDENT_GROUPS } from '@/data/demoData';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = DEMO_STUDENT_GROUPS.filter(
    (g) =>
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Batches & Divisions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Student cohort strengths, NEP 2020 division splits, and elective enrollments
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
          <Plus className="h-4 w-4" />
          <span>Add Batch</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student batches..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <div key={group.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {group.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{group.name}</h3>
                <p className="text-xs text-slate-500">Year: {group.year} • Division {group.division}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-black text-slate-900">{group.strength}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Students</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Department: Computer Eng</span>
              <span className="font-semibold text-teal-800">Assigned 2 Labs/week</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
