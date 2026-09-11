'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Filter } from 'lucide-react';
import { DEMO_COURSES } from '@/data/demoData';

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filtered = DEMO_COURSES.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'All' || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Courses Catalog & Credits</h1>
          <p className="text-xs text-slate-500 mt-1">
            NEP 2020 course classifications, weekly lecture/lab hour allocations, and assigned faculty
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
          <Plus className="h-4 w-4" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search course title or code..."
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:border-teal-700"
          />
        </div>

        <div className="flex items-center gap-2">
          {['All', 'core', 'mdm', 'pec'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                filterType === t
                  ? 'bg-teal-800 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((course) => (
          <div key={course.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {course.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{course.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Faculty: {course.facultyName}</p>
              </div>

              <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {course.type}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block">Credits</span>
                <span className="font-bold text-slate-800">{course.credits}</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block">Lectures</span>
                <span className="font-bold text-slate-800">{course.weeklyLectures}/wk</span>
              </div>
              <div className="p-1.5 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 font-bold block">Labs</span>
                <span className="font-bold text-slate-800">{course.weeklyLabs > 0 ? `${course.weeklyLabs} Lab` : 'None'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
