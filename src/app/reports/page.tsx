'use client';

import React from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Building2,
  UserCheck,
  GraduationCap,
  Calendar,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { exportService } from '@/services/exportService';
import { DEMO_DEPARTMENTS, DEMO_FACULTY } from '@/data/demoData';

export default function ReportsPage() {
  const { timetableCells, showToast } = useApp();

  const handleExportExcelAll = () => {
    exportService.exportToExcel(timetableCells, 'ATS_DemoUniversity_Master_Timetable');
    showToast('Downloaded full university master schedule (.xlsx)', 'success');
  };

  const handleExportDepartment = (deptCode: string) => {
    exportService.exportToExcel(timetableCells, `ATS_${deptCode}_Timetable`);
    showToast(`Exported ${deptCode} department timetable to Excel (.xlsx)`, 'success');
  };

  const handleExportFaculty = (facultyName: string) => {
    const facultyCells = timetableCells.filter((c) => c.facultyName.includes(facultyName));
    exportService.exportToExcel(facultyCells, `ATS_Faculty_${facultyName.replace(/[^a-zA-Z]/g, '_')}`);
    showToast(`Exported timetable for ${facultyName} to Excel (.xlsx)`, 'success');
  };

  const handlePrint = () => {
    exportService.printTimetable();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Reports & Export Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Export verified master timetables, department schedules, faculty allotments, and student batch sheets
        </p>
      </div>

      {/* Primary Export Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-teal-600 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-teal-800">
              <FileSpreadsheet className="h-6 w-6" />
              <h2 className="text-base font-black">Export Master Timetable (Excel)</h2>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Downloads a comprehensive multi-slot Excel workbook formatted with course titles, faculty codes,
              classroom allocations, and division splits for all departments.
            </p>
          </div>
          <button
            onClick={handleExportExcelAll}
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-800 py-3 px-4 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
          >
            <Download className="h-4 w-4" />
            <span>Download Master Spreadsheet (.xlsx)</span>
          </button>
        </div>

        <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-slate-800">
              <Printer className="h-6 w-6" />
              <h2 className="text-base font-black">Print-Friendly PDF Export</h2>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Formats clean high-contrast monochrome or styled academic printouts ready for campus noticeboards,
              faculty registers, and accreditation documentation.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 px-4 text-xs font-bold text-white hover:bg-slate-800 shadow-md transition"
          >
            <Printer className="h-4 w-4" />
            <span>Open Print / PDF View</span>
          </button>
        </div>
      </div>

      {/* Targeted Exports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Department Timetables */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Building2 className="h-4 w-4 text-teal-700" />
            <span>Department Timetables</span>
          </div>
          <p className="text-xs text-slate-500">Download single-department schedules</p>

          <div className="space-y-2 pt-2">
            {DEMO_DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => handleExportDepartment(dept.code)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50 text-xs font-semibold text-slate-800 transition"
              >
                <span>{dept.name}</span>
                <Download className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Timetables */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <UserCheck className="h-4 w-4 text-teal-700" />
            <span>Faculty Allotments</span>
          </div>
          <p className="text-xs text-slate-500">Individual weekly teaching slips</p>

          <div className="space-y-2 pt-2">
            {DEMO_FACULTY.slice(0, 4).map((f) => (
              <button
                key={f.id}
                onClick={() => handleExportFaculty(f.name)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50 text-xs font-semibold text-slate-800 transition"
              >
                <span className="truncate">{f.name}</span>
                <Download className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Student Batch Timetables */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <GraduationCap className="h-4 w-4 text-teal-700" />
            <span>Student Cohorts</span>
          </div>
          <p className="text-xs text-slate-500">Division-specific weekly charts</p>

          <div className="space-y-2 pt-2">
            {['SY-A', 'SY-B', 'TY-A', 'TY-B'].map((div) => (
              <button
                key={div}
                onClick={() => handleExportDepartment(div)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-teal-50 text-xs font-semibold text-slate-800 transition"
              >
                <span>Division {div} (NEP Track)</span>
                <Download className="h-3.5 w-3.5 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
