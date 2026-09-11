'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sliders, Shield, Sparkles, Check, Save } from 'lucide-react';
import { DEMO_CONSTRAINTS } from '@/data/demoData';
import { useApp } from '@/context/AppContext';

export default function GeneralConstraintsPage() {
  const { showToast } = useApp();
  const [constraints, setConstraints] = useState(DEMO_CONSTRAINTS);

  const toggle = (id: string) => {
    setConstraints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isEnabled: !c.isEnabled } : c))
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Constraints Matrix</h1>
          <p className="text-xs text-slate-500 mt-1">
            Core optimization rules, hard constraints (100% satisfaction), and soft preference weights
          </p>
        </div>

        <button
          onClick={() => showToast('Constraint weights saved to solver parameter file.', 'success')}
          className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition"
        >
          <Save className="h-4 w-4" />
          <span>Save Rule Weights</span>
        </button>
      </div>

      <div className="space-y-3">
        {constraints.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start justify-between gap-4 hover:border-teal-300 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono">
                  {c.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    c.category === 'hard'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-teal-100 text-teal-800'
                  }`}
                >
                  {c.category} Constraint
                </span>
              </div>
              <p className="text-xs text-slate-600">{c.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 pt-1">
              {c.category === 'soft' && (
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Weight</span>
                  <span className="text-xs font-black text-teal-800">{c.weight} / 10</span>
                </div>
              )}
              <input
                type="checkbox"
                checked={c.isEnabled}
                onChange={() => toggle(c.id)}
                className="h-5 w-5 rounded text-teal-700 focus:ring-teal-600 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
