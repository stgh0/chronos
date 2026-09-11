'use client';

import React from 'react';
import { Users, GraduationCap } from 'lucide-react';
import { DEMO_STUDENT_GROUPS } from '@/data/demoData';

export default function StudentGroupsConstraintsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Group Workload Constraints</h1>
        <p className="text-xs text-slate-500 mt-1">
          Maximum daily lecture load per division, lunch break reservations, and lab batch splits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_STUDENT_GROUPS.map((g) => (
          <div key={g.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {g.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{g.name}</h3>
              </div>
              <span className="text-xs font-black text-slate-800">{g.strength} Students</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Max Daily Theory Hours:</span>
                <span className="font-bold text-slate-900">4 Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Mandatory Lunch Break:</span>
                <span className="font-bold text-rose-700">
                  {g.year === 'SY' ? 'Slot 4 (11:25–12:20)' : 'Slot 5 (12:20–01:15)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Practical Lab Batch Split:</span>
                <span className="font-bold text-teal-800">Batch 1 & Batch 2 (Parallel)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
