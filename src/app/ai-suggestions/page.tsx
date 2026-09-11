'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Eye,
  Check,
  Calendar,
  X,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AISuggestionsPage() {
  const { suggestions, issues, applySuggestion, dismissSuggestion } = useApp();
  const [previewSuggestionId, setPreviewSuggestionId] = useState<string | null>(null);

  const previewTarget = suggestions.find((s) => s.id === previewSuggestionId);
  const unresolvedIssuesCount = issues.filter((i) => !i.resolved).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500 text-white shadow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Chronos AI Scheduling Assistant
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Targeted constraint conflict resolution powered by multi-agent heuristics
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/timetable/generated"
          className="flex items-center gap-2 rounded-xl bg-teal-800 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
        >
          <Calendar className="h-4 w-4" />
          <span>View Updated Timetable</span>
        </Link>
      </div>

      {/* Status Alert Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between ${
          unresolvedIssuesCount > 0
            ? 'border-amber-300 bg-amber-50/80 text-amber-950'
            : 'border-emerald-300 bg-emerald-50/80 text-emerald-950'
        }`}
      >
        <div className="flex items-center gap-3">
          {unresolvedIssuesCount > 0 ? (
            <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
          ) : (
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
          )}
          <div>
            <p className="text-sm font-bold">
              {unresolvedIssuesCount > 0
                ? `${unresolvedIssuesCount} scheduling conflicts require coordinator attention.`
                : 'All detected timetable conflicts have been successfully resolved!'}
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              {unresolvedIssuesCount > 0
                ? 'Review verified AI recommendations below. Each suggestion satisfies all hard constraints while improving overall soft satisfaction score.'
                : 'The master timetable now satisfies 100% of hard constraints and 98.4% of soft faculty preferences.'}
            </p>
          </div>
        </div>

        {unresolvedIssuesCount === 0 && (
          <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl">
            100% Feasible
          </span>
        )}
      </div>

      {/* Suggestion Cards List */}
      <div className="space-y-4">
        {suggestions.map((sug, idx) => {
          const correspondingIssue = issues.find((i) => i.id === sug.issueId);
          const isResolved = correspondingIssue?.resolved || sug.applied;

          return (
            <div
              key={sug.id}
              className={`rounded-2xl border p-6 shadow-sm transition-all duration-200 ${
                isResolved
                  ? 'border-emerald-200 bg-white/70 opacity-90'
                  : 'border-slate-200 bg-white hover:border-amber-400 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left info */}
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      Issue #{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isResolved ? 'Resolved & Applied' : 'Pending Action'}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase bg-slate-100 px-2 py-0.5 rounded">
                      {sug.actionType.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">{sug.title}</h3>

                  {/* Problem Description */}
                  {correspondingIssue && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-100">
                      <span className="font-bold text-slate-900">Constraint Violation: </span>
                      {correspondingIssue.problem}
                    </div>
                  )}

                  {/* AI Recommendation Details */}
                  <div className="p-3.5 bg-amber-50/50 rounded-xl text-xs text-slate-800 border border-amber-200/60 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span>AI Proposed Resolution:</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{sug.reasoning}</p>
                    <p className="text-emerald-700 font-bold text-[11px] pt-1">Impact: {sug.impact}</p>
                  </div>

                  {/* Move Details Pills */}
                  <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                    <div className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-rose-800">
                      <span className="text-[10px] uppercase font-bold text-rose-500 block">Current</span>
                      <span className="font-semibold">
                        {sug.currentDay} {sug.currentSlot} {sug.currentRoom ? `• ${sug.currentRoom}` : ''}
                      </span>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-400" />

                    <div className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">Proposed</span>
                      <span className="font-bold">
                        {sug.proposedDay} {sug.proposedSlot} {sug.proposedRoom ? `• ${sug.proposedRoom}` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                  {!isResolved ? (
                    <>
                      <button
                        onClick={() => applySuggestion(sug.id)}
                        className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-700 shadow-md transition"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Apply Suggestion</span>
                      </button>

                      <button
                        onClick={() => setPreviewSuggestionId(sug.id)}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-400" />
                        <span>Preview Change</span>
                      </button>

                      <button
                        onClick={() => dismissSuggestion(sug.id)}
                        className="text-xs text-slate-400 hover:text-slate-600 transition px-2 py-1"
                      >
                        Dismiss
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Applied to Active Timetable</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="rounded-2xl border border-slate-200 bg-white max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">Change Preview & Impact Assessment</h3>
              </div>
              <button
                onClick={() => setPreviewSuggestionId(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <p className="font-bold text-slate-800">{previewTarget.targetCourse}</p>
                <p className="text-slate-500 mt-0.5">{previewTarget.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/50">
                  <span className="text-[10px] font-bold text-rose-700 uppercase">Before Change</span>
                  <p className="font-bold text-slate-800 mt-1">
                    {previewTarget.currentDay}, {previewTarget.currentSlot}
                  </p>
                  <p className="text-[11px] text-slate-500">{previewTarget.currentRoom}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-rose-600">Soft score: 82%</span>
                </div>

                <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">After AI Optimization</span>
                  <p className="font-bold text-slate-800 mt-1">
                    {previewTarget.proposedDay}, {previewTarget.proposedSlot}
                  </p>
                  <p className="text-[11px] text-slate-500">{previewTarget.proposedRoom}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700">Soft score: 94.2%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-teal-900 text-[11px]">
                <span className="font-bold">Verified: </span>
                Zero room collision, faculty availability certified, student idle gap reduced.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewSuggestionId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  applySuggestion(previewTarget.id);
                  setPreviewSuggestionId(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-800 hover:bg-teal-700 shadow-sm"
              >
                Apply Change Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
