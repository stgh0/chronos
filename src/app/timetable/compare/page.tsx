'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock,
  Award,
  ArrowRight,
  Shield,
  Activity,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { DEMO_SCHEDULE_VERSIONS } from '@/data/demoData';

export default function CompareSchedulesPage() {
  const { activeScheduleVersion, setActiveScheduleVersion, showToast } = useApp();

  const handleSelectSchedule = (version: (typeof DEMO_SCHEDULE_VERSIONS)[0]) => {
    setActiveScheduleVersion(version);
    showToast(`Switched active deployed schedule to: ${version.name}`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Compare Generated Schedules
            </h1>
            <span className="rounded-full bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-0.5 border border-teal-300">
              Pareto Frontier Evaluation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Evaluate candidate schedules generated across greedy heuristic, CP-SAT solver, and genetic algorithm passes
          </p>
        </div>

        <Link
          href="/timetable/generated"
          className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
        >
          <span>Open Active Timetable</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Side-by-Side 3-Card Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_SCHEDULE_VERSIONS.map((sched) => {
          const isActive = activeScheduleVersion.id === sched.id;

          return (
            <div
              key={sched.id}
              className={`rounded-2xl border-2 p-6 transition-all duration-200 flex flex-col justify-between ${
                sched.isBest
                  ? 'border-teal-700 bg-white shadow-xl ring-2 ring-teal-600/10'
                  : 'border-slate-200 bg-white shadow-sm hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase">Version</span>
                      {sched.isBest && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                          <Award className="h-3 w-3 text-amber-600" />
                          <span>RECOMMENDED</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-900 mt-1">{sched.name}</h3>
                  </div>

                  {isActive && (
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{sched.description}</p>

                {/* Quantitative Metric Bars */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {/* Hard Constraints */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <Shield className="h-3.5 w-3.5 text-rose-600" />
                        <span>Hard Constraints</span>
                      </span>
                      <span className={sched.hardConstraintPct === 100 ? 'text-emerald-700' : 'text-amber-700'}>
                        {sched.hardConstraintPct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          sched.hardConstraintPct === 100 ? 'bg-emerald-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${sched.hardConstraintPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Soft Constraints */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                        <span>Faculty Preferences</span>
                      </span>
                      <span className="text-teal-900">{sched.softConstraintPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-700 h-2 rounded-full"
                        style={{ width: `${sched.softConstraintPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Room Utilization */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                        <span>Room Utilization</span>
                      </span>
                      <span className="text-slate-800">{sched.roomUtilizationPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${sched.roomUtilizationPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Student Idle Time */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>Student Idle Gaps</span>
                      </span>
                      <span className={sched.idleTimePct <= 8 ? 'text-emerald-700' : 'text-amber-700'}>
                        {sched.idleTimePct}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${
                          sched.idleTimePct <= 8 ? 'bg-emerald-500' : 'bg-amber-400'
                        }`}
                        style={{ width: `${sched.idleTimePct * 4}%` }}
                      />
                    </div>
                  </div>

                  {/* Workload Balance */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span className="flex items-center gap-1">
                        <Activity className="h-3.5 w-3.5 text-purple-600" />
                        <span>Workload Equilibrium</span>
                      </span>
                      <span className="text-purple-900">{sched.workloadBalancePct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${sched.workloadBalancePct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSelectSchedule(sched)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-slate-100 text-slate-500 cursor-default'
                      : sched.isBest
                      ? 'bg-teal-800 text-white hover:bg-teal-700 shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {isActive ? 'Currently Active Schedule' : 'Deploy This Schedule'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparative Summary Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
          Optimization Metric Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2 font-bold">Optimization Parameter</th>
                <th className="py-2 font-bold">Schedule A (Greedy)</th>
                <th className="py-2 font-bold text-teal-800">Schedule B (CP-SAT Best)</th>
                <th className="py-2 font-bold">Schedule C (Genetic)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 font-semibold text-slate-800">Hard Constraint Zero Clashes</td>
                <td className="py-2.5 text-emerald-700 font-bold">100% (Passed)</td>
                <td className="py-2.5 text-emerald-700 font-bold">100% (Passed)</td>
                <td className="py-2.5 text-amber-700 font-bold">98% (1 Lab Warning)</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-800">Faculty Preferred Shift Alignment</td>
                <td className="py-2.5 text-slate-600">82.0%</td>
                <td className="py-2.5 text-emerald-700 font-bold">94.2% (+12.2%)</td>
                <td className="py-2.5 text-slate-600">89.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-800">Infrastructure Peak Utilization</td>
                <td className="py-2.5 text-slate-600">78.0%</td>
                <td className="py-2.5 text-emerald-700 font-bold">88.4% (+10.4%)</td>
                <td className="py-2.5 text-slate-600">83.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-800">Student Division Idle Gap Rate</td>
                <td className="py-2.5 text-amber-700">14.0% Gaps</td>
                <td className="py-2.5 text-emerald-700 font-bold">6.0% (Minimal)</td>
                <td className="py-2.5 text-slate-600">10.0%</td>
              </tr>
              <tr>
                <td className="py-2.5 font-semibold text-slate-800">Solver Engine Methodology</td>
                <td className="py-2.5 text-slate-500">Heuristic First-Fit</td>
                <td className="py-2.5 font-mono text-teal-800 font-bold">OR-Tools CP-SAT + Heuristic</td>
                <td className="py-2.5 text-slate-500">Stochastic Genetic 500 Gen</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
