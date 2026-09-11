'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sliders, CheckCircle2, ArrowRight, Shield, Sparkles, Building2, GraduationCap, Users } from 'lucide-react';
import { DEMO_CONSTRAINTS } from '@/data/demoData';
import { Constraint } from '@/types';

export default function ConfigureGenerationPage() {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState('dept-comp');
  const [selectedYear, setSelectedYear] = useState('2026-2027');
  const [selectedProgram, setSelectedProgram] = useState('prog-btech-ce');
  const [selectedBatches, setSelectedBatches] = useState<string[]>(['grp-sy-a', 'grp-sy-b', 'grp-ty-a', 'grp-ty-b']);
  const [constraints, setConstraints] = useState<Constraint[]>(DEMO_CONSTRAINTS);

  const toggleBatch = (batchId: string) => {
    setSelectedBatches((prev) =>
      prev.includes(batchId) ? prev.filter((b) => b !== batchId) : [...prev, batchId]
    );
  };

  const toggleConstraint = (id: string) => {
    setConstraints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isEnabled: !c.isEnabled } : c))
    );
  };

  const hardConstraints = constraints.filter((c) => c.category === 'hard');
  const softConstraints = constraints.filter((c) => c.category === 'soft');

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Timetable Generation Wizard
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure solver scope, target cohorts, and constraint priorities before invoking the optimization engine
        </p>
      </div>

      {/* Target Scope Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-teal-700" />
            <span>1. Department</span>
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium text-slate-800 focus:border-teal-700 focus:outline-none"
          >
            <option value="dept-comp">Computer Engineering (CE)</option>
            <option value="dept-it">Information Technology (IT)</option>
            <option value="dept-aids">AI & Data Science (AIDS)</option>
            <option value="dept-ece">Electronics & Communication (ECE)</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <GraduationCap className="h-4 w-4 text-teal-700" />
            <span>2. Program & Track</span>
          </label>
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium text-slate-800 focus:border-teal-700 focus:outline-none"
          >
            <option value="prog-btech-ce">B.Tech Computer Engineering (NEP 2020)</option>
            <option value="prog-btech-aids">B.Tech AI & Data Science</option>
            <option value="prog-mtech-ce">M.Tech Advanced Computing</option>
          </select>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="h-4 w-4 text-teal-700" />
            <span>3. Academic Cycle</span>
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium text-slate-800 focus:border-teal-700 focus:outline-none"
          >
            <option value="2026-2027">AY 2026–2027 (Odd Sem / Autumn)</option>
            <option value="2026-2027-even">AY 2026–2027 (Even Sem / Spring)</option>
          </select>
        </div>
      </div>

      {/* Target Divisions */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          4. Target Student Divisions for Timetable Synthesis
        </label>
        <div className="flex flex-wrap gap-2.5">
          {[
            { id: 'grp-sy-a', label: 'SY-A (Second Year Div A • 65 students)' },
            { id: 'grp-sy-b', label: 'SY-B (Second Year Div B • 68 students)' },
            { id: 'grp-ty-a', label: 'TY-A (Third Year Div A • 62 students)' },
            { id: 'grp-ty-b', label: 'TY-B (Third Year Div B • 64 students)' },
            { id: 'grp-fy-a', label: 'FY-A (Final Year Div A • 70 students)' },
          ].map((b) => {
            const isSelected = selectedBatches.includes(b.id);
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => toggleBatch(b.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-2 ${
                  isSelected
                    ? 'border-teal-700 bg-teal-50 text-teal-900 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isSelected ? 'bg-teal-700' : 'bg-slate-300'}`} />
                <span>{b.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Constraints Review Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hard Constraints */}
        <div className="rounded-2xl border-2 border-rose-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-rose-50">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-600" />
              <h2 className="text-sm font-black text-rose-950">HARD CONSTRAINTS</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              Mandatory (100% Satisfied)
            </span>
          </div>

          <div className="space-y-2.5">
            {hardConstraints.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start justify-between gap-3"
              >
                <div>
                  <p className="text-xs font-bold text-slate-800">{c.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={c.isEnabled}
                  onChange={() => toggleConstraint(c.id)}
                  className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600 shrink-0 mt-0.5"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Soft Constraints */}
        <div className="rounded-2xl border-2 border-teal-100 bg-white p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-teal-50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-teal-700" />
              <h2 className="text-sm font-black text-teal-950">SOFT CONSTRAINTS & PREFERENCES</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
              Weighted Optimization (GA / CP-SAT)
            </span>
          </div>

          <div className="space-y-2.5">
            {softConstraints.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-800">{c.title}</p>
                    <span className="text-[10px] text-teal-700 font-semibold">Weight: {c.weight}/10</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.description}</p>
                </div>
                <input
                  type="checkbox"
                  checked={c.isEnabled}
                  onChange={() => toggleConstraint(c.id)}
                  className="h-4 w-4 rounded text-teal-700 focus:ring-teal-600 shrink-0 mt-0.5"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <Link
          href="/timetable/mdm"
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          ← Back to MDM Matrix
        </Link>

        <button
          type="button"
          onClick={() => router.push('/timetable/generate')}
          className="flex items-center gap-2 rounded-xl bg-teal-800 px-7 py-3 text-xs font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-900/20 transition"
        >
          <span>Launch AI Scheduling Engine</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
