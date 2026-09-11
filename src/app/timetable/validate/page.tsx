'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Users,
  DoorOpen,
  Cpu,
  GraduationCap,
  Sliders,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';
import { validationService } from '@/services/validationService';

export default function ValidatePage() {
  const result = validationService.validateExcelData('timetable_data.xlsx', 38400);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Data Validation Report</h1>
            <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 border border-emerald-300">
              Verified Schema
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data ingested from <span className="font-semibold text-slate-800">timetable_data.xlsx</span> (Demo University • Computer Engineering)
          </p>
        </div>

        <Link
          href="/timetable/upload"
          className="flex items-center gap-1 text-xs font-semibold text-teal-800 hover:underline"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span>Upload Another File</span>
        </Link>
      </div>

      {/* Summary KPI Cards (Courses: 42, Faculty: 31, Rooms: 18, Labs: 6, Student Groups: 12, Constraints: 87, Warnings: 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <BookOpen className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.coursesDetected}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Courses</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <Users className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.facultyDetected}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Faculty</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <DoorOpen className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.roomsDetected}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Rooms</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <Cpu className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.labsDetected}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Labs</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <GraduationCap className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.studentGroups}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Groups</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm text-center">
          <Sliders className="h-4 w-4 text-teal-700 mx-auto mb-1" />
          <p className="text-xl font-black text-slate-900">{result.constraintsDetected}</p>
          <p className="text-[10px] text-slate-500 font-semibold uppercase">Constraints</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 shadow-sm text-center">
          <AlertTriangle className="h-4 w-4 text-amber-600 mx-auto mb-1" />
          <p className="text-xl font-black text-amber-900">{result.warningsCount}</p>
          <p className="text-[10px] text-amber-800 font-semibold uppercase">Warnings</p>
        </div>
      </div>

      {/* Detailed Validation Checks */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          Validation Verification Rules
        </h2>

        <div className="space-y-3">
          {result.details.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border flex items-start gap-3 transition ${
                item.status === 'pass'
                  ? 'border-emerald-100 bg-emerald-50/30'
                  : 'border-amber-200 bg-amber-50/50'
              }`}
            >
              {item.status === 'pass' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900">{item.category}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'pass'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status === 'pass' ? 'Verified' : 'Review Advised'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2">
          <Link
            href="/timetable/lunch-breaks"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Configure Lunch Breaks
          </Link>
          <Link
            href="/timetable/mdm"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Configure MDM Grid
          </Link>
        </div>

        <Link
          href="/timetable/configure"
          className="flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
        >
          <span>Review Constraints & Solver Settings</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
