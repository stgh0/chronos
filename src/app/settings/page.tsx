'use client';

import React from 'react';
import { Settings as SettingsIcon, RotateCcw, Shield, Cpu, Database, Save } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SettingsPage() {
  const { resetAllData, showToast } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">System & Solver Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          ATS platform configuration, solver engine parameters, and demo state management
        </p>
      </div>

      <div className="space-y-6">
        {/* Solver Engine Configuration */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-teal-700" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Optimization Engine Backend
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Primary Solver Engine</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-medium">
                <option>Google OR-Tools CP-SAT (Simulated Mock)</option>
                <option>Genetic Algorithm Stochastic Search</option>
                <option>Gale-Shapley Stable Marriage Matcher</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Max Solver Time Limit</label>
              <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 font-medium">
                <option>30 Seconds (Fast Heuristic)</option>
                <option>60 Seconds (Standard Branch & Bound)</option>
                <option>300 Seconds (Deep Global Optimal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Demo State Reset */}
        <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/30 p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-900">
            <Database className="h-5 w-5 text-rose-700" />
            <h2 className="text-sm font-black">Demo State Management & Reset</h2>
          </div>
          <p className="text-xs text-rose-800 leading-relaxed">
            Reset all schedule modifications, applied AI suggestions, lunch reservations, and conflict states back to the
            clean demo baseline.
          </p>

          <div className="pt-2">
            <button
              onClick={resetAllData}
              className="flex items-center gap-2 rounded-xl bg-rose-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-rose-800 shadow-sm transition"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset All Demo Data to Default</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
