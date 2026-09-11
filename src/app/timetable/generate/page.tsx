'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Wand2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
// canvas-confetti imported dynamically at runtime (browser-only)

const PIPELINE_STEPS = [
  { step: 1, name: 'Reading input data & curriculum graph', detail: 'Ingested 42 courses, 31 faculty, 18 rooms, 6 labs from timetable_data.xlsx' },
  { step: 2, name: 'Validating NEP 2020 constraints', detail: 'Checking Major-Minor credits, lecture limits, and lunch breaks (SY Slot 4, TY Slot 5)' },
  { step: 3, name: 'Assigning core theory courses', detail: 'Allocating Data Structures, OS, Database, Discrete Math to optimal morning slots' },
  { step: 4, name: 'Resolving faculty schedule preferences', detail: 'Cross-verifying Dr. Suresh Kulkarni, Dr. Meera Sharma, and 29 other faculty preferences' },
  { step: 5, name: 'Allocating rooms & specialized laboratories', detail: 'Mapping AI Lab (Lab-1 GPU), DB Lab (Lab-3), and IoT Lab (Lab-5)' },
  { step: 6, name: 'Generating candidate schedule population', detail: 'Synthesizing 148 feasible candidate schedules via OR-Tools CP-SAT mock solver' },
  { step: 7, name: 'Multi-objective heuristic optimization', detail: 'Minimizing student idle gap (down to 6%) and maximizing room utilization (88.4%)' },
  { step: 8, name: 'Evaluating soft constraints & edge clashes', detail: 'Flagged 3 elective clashes; generated verified 1-click ATS AI resolutions' },
  { step: 9, name: 'Compiling final master timetable', detail: 'Committed Schedule Version B (94.2% soft satisfaction score) to active system state' },
];

export default function GenerateTimetablePage() {
  const router = useRouter();
  const { setIsGenerated, showToast } = useApp();

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startGeneration = () => {
    setIsGenerating(true);
    setIsCompleted(false);
    setCurrentStepIndex(0);
    setProgressPct(5);
    setLogs(['[ATS-KERNEL] Initializing CP-SAT solver instance...']);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < PIPELINE_STEPS.length) {
        setCurrentStepIndex(step);
        setProgressPct(Math.round(((step + 1) / PIPELINE_STEPS.length) * 100));
        setLogs((prev) => [
          ...prev,
          `[STAGE ${step + 1}] ${PIPELINE_STEPS[step].name} — OK`,
          `  ↳ ${PIPELINE_STEPS[step].detail}`,
        ]);
      } else {
        clearInterval(interval);
        setProgressPct(100);
        setIsGenerating(false);
        setIsCompleted(true);
        setIsGenerated(true);
        showToast('Timetable generation finished! Optimal schedule compiled.', 'success');

        try {
          import('canvas-confetti').then((mod) => {
            mod.default({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#0d9488', '#10b981', '#f59e0b', '#6366f1'],
            });
          });
        } catch {
          // ignore if canvas-confetti is unavailable
        }
      }
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-teal-800 text-white shadow-lg shadow-teal-900/10 mb-2">
          <Wand2 className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight">
          Generate Optimized Timetable
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Autonomous constraint-satisfaction engine with heuristic multi-objective optimization
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Students</p>
          <p className="text-xl font-black text-slate-900 mt-1">1,400</p>
          <p className="text-[10px] text-teal-700">4 Divisions</p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Faculty</p>
          <p className="text-xl font-black text-slate-900 mt-1">31</p>
          <p className="text-[10px] text-teal-700">Preferences loaded</p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Courses</p>
          <p className="text-xl font-black text-slate-900 mt-1">42</p>
          <p className="text-[10px] text-teal-700">NEP Minors & Labs</p>
        </div>
        <div className="p-3.5 rounded-xl border border-slate-200 bg-white text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Rooms & Labs</p>
          <p className="text-xl font-black text-slate-900 mt-1">24</p>
          <p className="text-[10px] text-teal-700">18 Rooms + 6 Labs</p>
        </div>
        <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/60 text-center shadow-sm">
          <p className="text-xs font-bold text-teal-900 uppercase">Constraints</p>
          <p className="text-xl font-black text-teal-900 mt-1">87 Active</p>
          <p className="text-[10px] text-teal-700">6 Hard • 5 Soft Groups</p>
        </div>
      </div>

      {/* Generation Control / Progress Container */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        {/* Trigger Button or Live Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              {isCompleted
                ? 'Timetable Synthesis Complete!'
                : isGenerating
                ? 'Synthesizing University Schedule...'
                : 'Ready to Run Optimization Pipeline'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isGenerating
                ? PIPELINE_STEPS[currentStepIndex]?.name
                : isCompleted
                ? 'Schedule Version B successfully synthesized and verified against all constraints.'
                : 'Click below to initiate constraint satisfaction and heuristic optimization.'}
            </p>
          </div>

          {!isGenerating && (
            <button
              type="button"
              onClick={startGeneration}
              className="flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-3 text-xs font-extrabold text-white hover:bg-teal-700 shadow-md shadow-teal-900/20 transition"
            >
              {isCompleted ? <RefreshCw className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              <span>{isCompleted ? 'Re-run Scheduler' : 'Generate Optimized Timetable'}</span>
            </button>
          )}

          {isGenerating && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-900 text-xs font-bold border border-teal-200">
              <RefreshCw className="h-4 w-4 animate-spin text-teal-700" />
              <span>Running Solver ({progressPct}%)</span>
            </div>
          )}
        </div>

        {/* Total Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Pipeline Progress</span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* 9-Step Pipeline Flow Visualization */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const isDone = isCompleted || idx < currentStepIndex;
            const isCurrent = isGenerating && idx === currentStepIndex;

            return (
              <div
                key={step.step}
                className={`p-3 rounded-xl border transition ${
                  isDone
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                    : isCurrent
                    ? 'border-teal-500 bg-teal-50/70 text-teal-950 shadow-sm ring-1 ring-teal-500'
                    : 'border-slate-100 bg-slate-50/40 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : isCurrent ? (
                    <RefreshCw className="h-4 w-4 text-teal-700 animate-spin shrink-0" />
                  ) : (
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                      {step.step}
                    </span>
                  )}
                  <span className="text-xs font-bold truncate">{step.name}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{step.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Live Engine Console Logs */}
        {logs.length > 0 && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 font-mono text-[11px] text-teal-300 max-h-40 overflow-y-auto space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 mb-2 font-sans font-bold">
              ATS Solver Engine Output Stream
            </div>
            {logs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        )}

        {/* Results Card after Completion */}
        {isCompleted && (
          <div className="rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-emerald-950">
                  Schedule Generation Complete: Candidate B Deployed
                </h3>
                <p className="text-xs text-emerald-800 font-medium">
                  100% hard constraints satisfied • 94.2% soft constraints met • 88.4% peak classroom utilization
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Feasible Schedules</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">148 Generated</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Conflicts Resolved</span>
                <p className="text-lg font-black text-emerald-700 mt-0.5">12 Solved</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Soft Score</span>
                <p className="text-lg font-black text-teal-800 mt-0.5">94.2%</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Unscheduled</span>
                <p className="text-lg font-black text-slate-900 mt-0.5">0 Critical</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 text-center shadow-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Room Utilization</span>
                <p className="text-lg font-black text-teal-900 mt-0.5">88.4%</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <Link
                href="/ai-suggestions"
                className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Review 3 AI Elective Suggestions</span>
              </Link>
              <Link
                href="/timetable/generated"
                className="flex items-center gap-2 rounded-xl bg-teal-800 px-6 py-2 text-xs font-extrabold text-white hover:bg-teal-700 shadow-md transition"
              >
                <span>Open Master Timetable</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
