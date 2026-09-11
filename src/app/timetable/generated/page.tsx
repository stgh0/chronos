'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Filter,
  Download,
  Printer,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  BookOpen,
  Eye,
  Layers,
  X,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_TIME_SLOTS, DEMO_FACULTY, DEMO_ROOMS } from '@/data/demoData';
import { TimetableCell } from '@/types';
import { exportService } from '@/services/exportService';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

export default function GeneratedTimetablePage() {
  const { timetableCells, applySuggestion, showToast } = useApp();

  // Filters & Views
  const [selectedDivision, setSelectedDivision] = useState<string>('SY-A');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('All');
  const [selectedRoom, setSelectedRoom] = useState<string>('All');
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'student' | 'faculty' | 'room' | 'department'>('student');

  // Modal inspection state
  const [inspectCell, setInspectCell] = useState<TimetableCell | null>(null);

  // Filter cells based on active selection
  const filteredCells = timetableCells.filter((cell) => {
    if (selectedDay !== 'All' && cell.day !== selectedDay) return false;

    if (viewMode === 'faculty') {
      if (selectedFaculty !== 'All' && cell.facultyId !== selectedFaculty) return false;
    } else if (viewMode === 'room') {
      if (selectedRoom !== 'All' && cell.roomId !== selectedRoom) return false;
    } else {
      // student / department view
      if (selectedDivision !== 'All' && cell.section !== selectedDivision && !cell.section.startsWith(selectedDivision)) {
        return false;
      }
    }
    return true;
  });

  const getCellForSlot = (day: string, slotNumber: number): TimetableCell | undefined => {
    return filteredCells.find(
      (c) => c.day === day && (c.slotNumber === slotNumber || (c.durationSlots === 2 && c.slotNumber + 1 === slotNumber))
    );
  };

  const conflictsCount = timetableCells.filter((c) => c.isConflict).length;

  const handleExportExcel = () => {
    exportService.exportToExcel(timetableCells, `ATS_Timetable_${selectedDivision}`);
    showToast(`Exported timetable for ${selectedDivision} to Excel (.xlsx)`, 'success');
  };

  const handlePrint = () => {
    exportService.printTimetable();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Master Academic Timetable</h1>
            <span className="rounded-full bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 border border-teal-300">
              Schedule Version B (Optimal)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Demo University • Computer Engineering • Academic Year 2026–27 • NEP 2020 Matrix
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/ai-suggestions"
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition"
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            <span>AI Assistant ({conflictsCount} issues)</span>
          </Link>

          <Link
            href="/timetable/compare"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Layers className="h-4 w-4 text-slate-500" />
            <span>Compare Versions</span>
          </Link>

          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 rounded-xl border border-teal-700 bg-white px-3.5 py-2 text-xs font-bold text-teal-800 hover:bg-teal-50 transition shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Export Excel</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 transition shadow-sm"
          >
            <Printer className="h-4 w-4" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Filter & View Mode Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            {(['student', 'faculty', 'room', 'department'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                  viewMode === mode
                    ? 'bg-white text-teal-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {mode} View
              </button>
            ))}
          </div>

          {/* Quick Division Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cohort:</span>
            {['SY-A', 'SY-B', 'TY-A', 'TY-B'].map((div) => (
              <button
                key={div}
                onClick={() => setSelectedDivision(div)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                  selectedDivision === div
                    ? 'border-teal-700 bg-teal-50 text-teal-900 font-bold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filters depending on view */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Division</label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-800"
            >
              <option value="SY-A">Second Year Div A (SY-A)</option>
              <option value="SY-B">Second Year Div B (SY-B)</option>
              <option value="TY-A">Third Year Div A (TY-A)</option>
              <option value="TY-B">Third Year Div B (TY-B)</option>
              <option value="All">All Divisions</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Faculty Filter</label>
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-800"
            >
              <option value="All">All Faculty</option>
              {DEMO_FACULTY.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Room / Lab Filter</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-800"
            >
              <option value="All">All Rooms & Labs</option>
              {DEMO_ROOMS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Day Filter</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs text-slate-800"
            >
              <option value="All">All Days (Mon–Fri)</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Timetable Grid Container */}
      <div className="timetable-container rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[950px]">
            {/* Table Header: Days */}
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200">
                <th className="p-3 text-xs font-extrabold text-slate-600 uppercase tracking-wider w-36 text-center border-r border-slate-200">
                  Time Slot
                </th>
                {DAYS.map((day) => (
                  <th
                    key={day}
                    className="p-3 text-xs font-black text-slate-900 uppercase tracking-wider text-center border-r border-slate-200 last:border-r-0"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body: 9 Slots */}
            <tbody className="divide-y divide-slate-200">
              {DEMO_TIME_SLOTS.map((slot) => (
                <tr key={slot.slotNumber} className="hover:bg-slate-50/40 transition">
                  {/* Slot Column */}
                  <td className="p-3 text-center border-r border-slate-200 bg-slate-50/70">
                    <span className="text-xs font-black text-slate-900 block">Slot {slot.slotNumber}</span>
                    <span className="text-[10px] font-medium text-slate-500 block mt-0.5">
                      {slot.startTime}–{slot.endTime}
                    </span>
                  </td>

                  {/* Day Cells */}
                  {DAYS.map((day) => {
                    const cell = getCellForSlot(day, slot.slotNumber);

                    if (!cell) {
                      return (
                        <td
                          key={`${day}-${slot.slotNumber}`}
                          className="p-2 border-r border-slate-200 last:border-r-0 text-center align-middle bg-slate-50/20"
                        >
                          <span className="text-[11px] text-slate-300 font-medium">— Free —</span>
                        </td>
                      );
                    }

                    // Card Styling based on Type
                    const isLunch = cell.type === 'lunch';
                    const isConflict = cell.isConflict;
                    const isAI = cell.isAIRecommended;
                    const isLab = cell.type === 'lab';
                    const isMdm = cell.type === 'mdm';
                    const isPec = cell.type === 'pec';

                    let cardClasses = 'bg-white border-slate-200 hover:border-teal-400 hover:shadow-md';
                    let badgeClasses = 'bg-slate-100 text-slate-700';

                    if (isLunch) {
                      cardClasses = 'bg-rose-50/70 border-rose-200 text-rose-900 cursor-default';
                      badgeClasses = 'bg-rose-100 text-rose-800 font-bold';
                    } else if (isConflict) {
                      cardClasses = 'bg-amber-50/90 border-amber-400 text-amber-950 ring-1 ring-amber-400 animate-pulse';
                      badgeClasses = 'bg-amber-500 text-white font-bold';
                    } else if (isAI) {
                      cardClasses = 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-xs';
                      badgeClasses = 'bg-emerald-600 text-white font-bold';
                    } else if (isLab) {
                      cardClasses = 'bg-blue-50/60 border-blue-200 text-blue-950';
                      badgeClasses = 'bg-blue-100 text-blue-800 font-bold';
                    } else if (isMdm) {
                      cardClasses = 'bg-amber-50/50 border-amber-200 text-amber-950';
                      badgeClasses = 'bg-amber-100 text-amber-800 font-bold';
                    } else if (isPec) {
                      cardClasses = 'bg-purple-50/50 border-purple-200 text-purple-950';
                      badgeClasses = 'bg-purple-100 text-purple-800 font-bold';
                    }

                    return (
                      <td
                        key={`${day}-${slot.slotNumber}`}
                        className="p-1.5 border-r border-slate-200 last:border-r-0 align-top"
                      >
                        <div
                          onClick={() => setInspectCell(cell)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-150 relative ${cardClasses}`}
                        >
                          <div className="flex items-start justify-between gap-1 mb-1">
                            <span className="text-[11px] font-black leading-tight truncate">
                              {cell.courseName}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded shrink-0 uppercase ${badgeClasses}`}>
                              {isLunch
                                ? 'Lunch'
                                : isConflict
                                ? 'Conflict'
                                : isAI
                                ? 'AI Fixed'
                                : isLab
                                ? 'Lab (2h)'
                                : isMdm
                                ? 'MDM'
                                : isPec
                                ? 'PEC'
                                : 'Lecture'}
                            </span>
                          </div>

                          {!isLunch && (
                            <>
                              <p className="text-[10px] text-slate-600 truncate font-medium flex items-center gap-1">
                                <User className="h-3 w-3 text-slate-400 shrink-0" />
                                <span>{cell.facultyName}</span>
                              </p>
                              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                <span className="flex items-center gap-0.5">
                                  <MapPin className="h-3 w-3 text-slate-400" />
                                  <span>{cell.roomName}</span>
                                </span>
                                <span className="font-bold text-slate-700 bg-slate-100 px-1 rounded text-[9px]">
                                  {cell.section}
                                </span>
                              </div>
                            </>
                          )}

                          {isConflict && (
                            <div className="mt-1.5 text-[9px] font-bold text-amber-800 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 shrink-0" />
                              <span className="truncate">Click to resolve with AI</span>
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Timetable Cell Inspection Modal */}
      {inspectCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="rounded-2xl border border-slate-200 bg-white max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lecture Details & Diagnostics
                </span>
                <h3 className="text-base font-black text-slate-900">{inspectCell.courseName}</h3>
                <p className="text-xs text-slate-500">
                  {inspectCell.day} • Slot {inspectCell.slotNumber} • Section {inspectCell.section}
                </p>
              </div>
              <button
                onClick={() => setInspectCell(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400">Faculty Assigned</p>
                <p className="font-bold text-slate-800 mt-0.5">{inspectCell.facultyName}</p>
                <p className="text-[10px] text-slate-500">Workload: 14 hrs/week</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400">Location</p>
                <p className="font-bold text-slate-800 mt-0.5">{inspectCell.roomName}</p>
                <p className="text-[10px] text-slate-500">Capacity: 80 students</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400">NEP Category</p>
                <p className="font-bold text-slate-800 mt-0.5 capitalize">{inspectCell.type}</p>
                <p className="text-[10px] text-slate-500">Duration: {inspectCell.durationSlots} Slot(s)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400">Status</p>
                <p
                  className={`font-bold mt-0.5 ${
                    inspectCell.isConflict ? 'text-amber-700' : 'text-emerald-700'
                  }`}
                >
                  {inspectCell.isConflict ? 'Conflict Detected' : 'Verified Feasible'}
                </p>
                <p className="text-[10px] text-slate-500">Constraint satisfaction: 100%</p>
              </div>
            </div>

            {/* Conflict details if present */}
            {inspectCell.isConflict && (
              <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>Conflict Analysis</span>
                </div>
                <p className="text-xs text-amber-800">{inspectCell.conflictReason}</p>
                <div className="pt-2 flex justify-end">
                  <Link
                    href="/ai-suggestions"
                    onClick={() => setInspectCell(null)}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-amber-700 transition"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Apply AI Resolution</span>
                  </Link>
                </div>
              </div>
            )}

            {inspectCell.note && (
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-900">
                <span className="font-bold">System Log: </span>
                {inspectCell.note}
              </div>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setInspectCell(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
