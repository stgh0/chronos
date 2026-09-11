'use client';

import React from 'react';
import { DoorOpen, CheckCircle2 } from 'lucide-react';
import { DEMO_ROOMS } from '@/data/demoData';

export default function RoomsConstraintsPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Room Allocation Constraints</h1>
        <p className="text-xs text-slate-500 mt-1">
          Minimum seating capacity checks and specialized laboratory equipment matching rules
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 font-bold">Room Code</th>
                <th className="py-2.5 font-bold">Name</th>
                <th className="py-2.5 font-bold">Type</th>
                <th className="py-2.5 font-bold">Capacity</th>
                <th className="py-2.5 font-bold">Hardware / Feature Guard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_ROOMS.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-3 font-mono font-bold text-slate-800">{r.code}</td>
                  <td className="py-3 font-bold text-slate-900">{r.name}</td>
                  <td className="py-3 capitalize text-slate-600">{r.type}</td>
                  <td className="py-3 font-bold text-teal-800">{r.capacity} seats</td>
                  <td className="py-3 text-slate-600">{r.equipment.join(' • ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
