'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Users, Plus, CheckCircle2 } from 'lucide-react';
import { DEMO_ROOMS } from '@/data/demoData';

export default function LabsPage() {
  const labs = DEMO_ROOMS.filter((r) => r.type === 'lab');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Specialized Laboratories</h1>
          <p className="text-xs text-slate-500 mt-1">
            Computing, hardware, and IoT laboratories mapped to practical course sessions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/rooms/classrooms"
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            ← View Classrooms
          </Link>
          <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
            <Plus className="h-4 w-4" />
            <span>Add Laboratory</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab) => (
          <div key={lab.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {lab.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{lab.name}</h3>
                <p className="text-xs text-slate-500">{lab.building} • Floor {lab.floor}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-black text-slate-900">{lab.capacity}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Stations</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
              {lab.equipment.map((eq, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 font-medium border border-teal-100">
                  {eq}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
