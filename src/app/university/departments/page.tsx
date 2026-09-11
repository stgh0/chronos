'use client';

import React, { useState } from 'react';
import { Building2, Users, GraduationCap, DoorOpen, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { DEMO_DEPARTMENTS } from '@/data/demoData';
import { Department } from '@/types';
import { useApp } from '@/context/AppContext';

export default function DepartmentsPage() {
  const { showToast } = useApp();
  const [departments, setDepartments] = useState<Department[]>(DEMO_DEPARTMENTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDept = () => {
    showToast('New Department modal: configured for Demo University', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">University Departments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Department administrative units, department chairs, and student/faculty quotas
          </p>
        </div>

        <button
          onClick={handleAddDept}
          className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search departments..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((dept) => (
          <div key={dept.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-800 font-bold border border-teal-200">
                  {dept.code}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{dept.name}</h3>
                  <p className="text-xs text-slate-500">Department Head: {dept.head}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-400">Students</span>
                <p className="text-sm font-black text-slate-800 mt-0.5">{dept.totalStudents}</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-400">Faculty</span>
                <p className="text-sm font-black text-slate-800 mt-0.5">{dept.totalFaculty}</p>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold uppercase text-slate-400">Rooms</span>
                <p className="text-sm font-black text-slate-800 mt-0.5">{dept.roomsCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
