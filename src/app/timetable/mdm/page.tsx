'use client';

import React from 'react';
import Link from 'next/link';
import { Grid3X3, ArrowRight, CheckCircle2, AlertTriangle, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_TIME_SLOTS } from '@/data/demoData';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function MdmSchedulingPage() {
  const { lunchConfig, mdmLabSlots, setMdmLabSlots, mdmTheorySlots, setMdmTheorySlots, showToast } = useApp();

  const isLunchSlot = (slotNum: number) => {
    return lunchConfig.sySlots.includes(slotNum) || lunchConfig.tySlots.includes(slotNum);
  };

  const isLabSelected = (day: string, slotNum: number) => {
    return mdmLabSlots.some((s) => s.day === day && s.slotNumber === slotNum);
  };

  const isTheorySelected = (day: string, slotNum: number) => {
    return mdmTheorySlots.some((s) => s.day === day && s.slotNumber === slotNum);
  };

  const toggleLabSlot = (day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', slotNum: number) => {
    if (isLunchSlot(slotNum)) {
      showToast(`Slot ${slotNum} is reserved for Lunch Break and cannot be selected for MDM.`, 'warning');
      return;
    }

    setMdmLabSlots((prev) => {
      const exists = prev.some((s) => s.day === day && s.slotNumber === slotNum);
      if (exists) {
        return prev.filter((s) => !(s.day === day && s.slotNumber === slotNum));
      } else {
        return [...prev, { day, slotNumber: slotNum, type: 'lab' }];
      }
    });
  };

  const toggleTheorySlot = (day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday', slotNum: number) => {
    if (isLunchSlot(slotNum)) {
      showToast(`Slot ${slotNum} is reserved for Lunch Break and cannot be selected for MDM.`, 'warning');
      return;
    }

    setMdmTheorySlots((prev) => {
      const exists = prev.some((s) => s.day === day && s.slotNumber === slotNum);
      if (exists) {
        return prev.filter((s) => !(s.day === day && s.slotNumber === slotNum));
      } else {
        return [...prev, { day, slotNumber: slotNum, type: 'theory' }];
      }
    });
  };

  const resetMdmDefaults = () => {
    setMdmLabSlots([
      { day: 'Monday', slotNumber: 1, type: 'lab' },
      { day: 'Monday', slotNumber: 2, type: 'lab' },
      { day: 'Thursday', slotNumber: 1, type: 'lab' },
      { day: 'Thursday', slotNumber: 2, type: 'lab' },
    ]);
    setMdmTheorySlots([
      { day: 'Monday', slotNumber: 5, type: 'theory' },
      { day: 'Wednesday', slotNumber: 5, type: 'theory' },
    ]);
    showToast('MDM slot selections reset to default template', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">MDM / PEC Scheduling Matrix</h1>
            <span className="rounded-full bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 border border-amber-300">
              NEP 2020 Multi-Discipline
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure multidisciplinary minor slots (IoT, Cybersecurity) and professional electives across weekly days
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-amber-500 border border-amber-600" />
            <span className="text-slate-700 font-medium">Selected Slot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-rose-100 border border-rose-300" />
            <span className="text-slate-700 font-medium">Reserved Lunch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-white border border-slate-300" />
            <span className="text-slate-700 font-medium">Available</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout Matching Screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: MDM Lab Sessions (2 required - 2 hours each) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                MDM Lab Sessions (2 required • 2 hours each)
              </h2>
              <p className="text-[11px] text-slate-500">Pairs of contiguous slots for IoT and Cybersecurity labs</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              {Math.floor(mdmLabSlots.length / 2)} / 2 Allocated
            </span>
          </div>

          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={`lab-${day}`} className="space-y-1.5">
                <p className="text-xs font-bold text-slate-700">{day}</p>
                <div className="grid grid-cols-3 gap-2">
                  {DEMO_TIME_SLOTS.map((slot) => {
                    const isSelected = isLabSelected(day, slot.slotNumber);
                    const isLunch = isLunchSlot(slot.slotNumber);

                    return (
                      <button
                        key={`lab-${day}-${slot.slotNumber}`}
                        type="button"
                        onClick={() => toggleLabSlot(day, slot.slotNumber)}
                        className={`h-9 rounded-lg text-[11px] font-medium transition flex items-center justify-center border ${
                          isSelected
                            ? 'bg-amber-500 text-white font-bold border-amber-600 shadow-sm'
                            : isLunch
                            ? 'bg-rose-100 text-rose-800 font-semibold border-rose-200 cursor-not-allowed opacity-90'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        title={isLunch ? 'Reserved for Lunch Break' : `${day} ${slot.startTime}–${slot.endTime}`}
                      >
                        {slot.startTime}–{slot.endTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: MDM Theory Slots (2 required) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">
                MDM Theory Slots (2 required)
              </h2>
              <p className="text-[11px] text-slate-500">Cross-departmental lecture blocks across engineering cohorts</p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              {mdmTheorySlots.length} / 2 Allocated
            </span>
          </div>

          <div className="space-y-4">
            {DAYS.map((day) => (
              <div key={`theory-${day}`} className="space-y-1.5">
                <p className="text-xs font-bold text-slate-700">{day}</p>
                <div className="grid grid-cols-3 gap-2">
                  {DEMO_TIME_SLOTS.map((slot) => {
                    const isSelected = isTheorySelected(day, slot.slotNumber);
                    const isLunch = isLunchSlot(slot.slotNumber);

                    return (
                      <button
                        key={`theory-${day}-${slot.slotNumber}`}
                        type="button"
                        onClick={() => toggleTheorySlot(day, slot.slotNumber)}
                        className={`h-9 rounded-lg text-[11px] font-medium transition flex items-center justify-center border ${
                          isSelected
                            ? 'bg-amber-500 text-white font-bold border-amber-600 shadow-sm'
                            : isLunch
                            ? 'bg-rose-100 text-rose-800 font-semibold border-rose-200 cursor-not-allowed opacity-90'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        title={isLunch ? 'Reserved for Lunch Break' : `${day} ${slot.startTime}–${slot.endTime}`}
                      >
                        {slot.startTime}–{slot.endTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Action Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <button
          onClick={resetMdmDefaults}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset MDM Defaults</span>
        </button>

        <div className="flex items-center gap-3">
          <Link
            href="/timetable/configure"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Review Constraints
          </Link>
          <Link
            href="/timetable/generate"
            className="flex items-center gap-2 rounded-lg bg-teal-800 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
          >
            <span>Proceed to Run Scheduler</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
