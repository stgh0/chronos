'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Utensils, Check, ArrowRight, RotateCcw, AlertCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_TIME_SLOTS } from '@/data/demoData';

export default function LunchBreaksPage() {
  const router = useRouter();
  const { lunchConfig, setLunchConfig, showToast } = useApp();

  const toggleSySlot = (slotNumber: number) => {
    setLunchConfig((prev) => {
      const exists = prev.sySlots.includes(slotNumber);
      const updated = exists ? prev.sySlots.filter((s) => s !== slotNumber) : [...prev.sySlots, slotNumber];
      return { ...prev, sySlots: updated };
    });
  };

  const toggleTySlot = (slotNumber: number) => {
    setLunchConfig((prev) => {
      const exists = prev.tySlots.includes(slotNumber);
      const updated = exists ? prev.tySlots.filter((s) => s !== slotNumber) : [...prev.tySlots, slotNumber];
      return { ...prev, tySlots: updated };
    });
  };

  const handleSave = () => {
    showToast('Lunch break reservation policy updated successfully!', 'success');
  };

  const handleReset = () => {
    setLunchConfig({ sySlots: [4], tySlots: [5] });
    showToast('Lunch break slots reset to default (SY Slot 4, TY Slot 5)', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title Header matching Screenshot 1 */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center justify-center p-2.5 rounded-full bg-teal-100/80 text-teal-800 mb-2">
          <Utensils className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
          Configure Lunch Breaks
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Set lunch break slots for both SY and TY students
        </p>
      </div>

      {/* Two Large Cards: SY and TY (Exact recreation of Screenshot 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SY (Second Year) Lunch Break Card */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-slate-900">
              SY (Second Year) Lunch Break
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              {lunchConfig.sySlots.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {DEMO_TIME_SLOTS.map((slot) => {
              const isSelected = lunchConfig.sySlots.includes(slot.slotNumber);
              return (
                <button
                  key={`sy-${slot.slotNumber}`}
                  type="button"
                  onClick={() => toggleSySlot(slot.slotNumber)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-sm ring-2 ring-blue-500/20 font-bold'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">Slot {slot.slotNumber}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    {slot.startTime}–{slot.endTime}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TY (Third Year) Lunch Break Card */}
        <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/20 p-6 shadow-sm hover:border-emerald-300 transition">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-emerald-950">
              TY (Third Year) Lunch Break
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
              {lunchConfig.tySlots.length} Selected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {DEMO_TIME_SLOTS.map((slot) => {
              const isSelected = lunchConfig.tySlots.includes(slot.slotNumber);
              return (
                <button
                  key={`ty-${slot.slotNumber}`}
                  type="button"
                  onClick={() => toggleTySlot(slot.slotNumber)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-100/80 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20 font-bold'
                      : 'border-emerald-100 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/40 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">Slot {slot.slotNumber}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-emerald-700" />}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-0.5">
                    {slot.startTime}–{slot.endTime}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Amber Policy Note (Direct recreation of Screenshot 1 bottom banner) */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start gap-3 shadow-sm">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Note: </span>
          These slots will be reserved for lunch breaks and cannot be used for MDM/PEC scheduling. The optimization engine
          will hard-lock these periods across all student divisions and faculty timetables.
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Defaults</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="rounded-lg border border-teal-700 bg-white px-5 py-2 text-xs font-bold text-teal-800 hover:bg-teal-50 transition"
          >
            Save Configuration
          </button>
          <Link
            href="/timetable/mdm"
            className="flex items-center gap-1.5 rounded-lg bg-teal-800 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
          >
            <span>Continue to MDM Grid</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
