'use client';

import React from 'react';
import { Sliders, Clock, Calendar, Save } from 'lucide-react';
import { DEMO_TIME_SLOTS } from '@/data/demoData';
import { useApp } from '@/context/AppContext';

export default function AcademicSettingsPage() {
  const { showToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Academic Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Institutional academic calendar, working days, and standard time-slot template
          </p>
        </div>

        <button
          onClick={() => showToast('Academic calendar settings updated.', 'success')}
          className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition"
        >
          <Save className="h-4 w-4" />
          <span>Save Settings</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Calendar & Cycle</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-bold mb-1">Academic Year</label>
              <input
                type="text"
                defaultValue="2026–2027"
                className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-medium bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Current Term</label>
              <input
                type="text"
                defaultValue="Autumn Semester (Odd)"
                className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-medium bg-slate-50"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-bold mb-1">Teaching Days / Week</label>
              <input
                type="text"
                defaultValue="Monday through Friday (5 Days)"
                className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-medium bg-slate-50"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Standard Slot Grid (9 Slots)</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {DEMO_TIME_SLOTS.map((slot) => (
              <div
                key={slot.slotNumber}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between text-xs"
              >
                <span className="font-bold text-slate-800">Slot {slot.slotNumber}</span>
                <span className="text-slate-500 font-medium">{slot.startTime} – {slot.endTime} (55 min)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
