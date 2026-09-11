'use client';

import React from 'react';
import { GraduationCap, BookOpen, Layers, Plus } from 'lucide-react';
import { DEMO_PROGRAMS } from '@/data/demoData';

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Academic Programs & NEP Tracks</h1>
          <p className="text-xs text-slate-500 mt-1">
            Multidisciplinary curriculum pathways under NEP 2020 guidelines
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
          <Plus className="h-4 w-4" />
          <span>Add Program</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {DEMO_PROGRAMS.map((prog) => (
          <div key={prog.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                    {prog.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{prog.name}</h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">{prog.nepTrack}</p>
              </div>

              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {prog.durationYears} Years • {prog.totalSemesters} Semesters
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
