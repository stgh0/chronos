'use client';

import React from 'react';
import { UserCheck, Clock, ShieldCheck } from 'lucide-react';
import { DEMO_FACULTY } from '@/data/demoData';

export default function FacultyConstraintsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty Shift & Off-Day Constraints</h1>
        <p className="text-xs text-slate-500 mt-1">
          Individual faculty availability windows, maximum consecutive lecture limits, and research day reservations
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 font-bold">Faculty Member</th>
                <th className="py-2.5 font-bold">Max Cap</th>
                <th className="py-2.5 font-bold">Preferred Shift Window</th>
                <th className="py-2.5 font-bold">Blocked / Off-Days</th>
                <th className="py-2.5 font-bold text-center">Consecutive Limit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_FACULTY.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{f.name}</td>
                  <td className="py-3 text-slate-600 font-medium">{f.maxHoursPerWeek} hrs/wk</td>
                  <td className="py-3 text-teal-800 font-semibold">{f.preferredSlots.join(' • ')}</td>
                  <td className="py-3 text-rose-700 font-semibold">
                    {f.offDays.length > 0 ? f.offDays.join(', ') : 'None (Full Week)'}
                  </td>
                  <td className="py-3 text-center font-bold text-slate-800">Max 2 Contiguous</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
