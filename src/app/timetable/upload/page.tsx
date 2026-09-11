'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UploadCloud, FileSpreadsheet, CheckCircle2, Sparkles, ArrowRight, Database, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function UploadPage() {
  const router = useRouter();
  const { showToast } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    status: 'idle' | 'uploading' | 'completed';
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: 'uploading',
    });

    setTimeout(() => {
      setUploadedFile((prev) => (prev ? { ...prev, status: 'completed' } : null));
      showToast(`Successfully uploaded ${file.name}! Ready for data validation.`, 'success');
    }, 1200);
  };

  const handleUseDemoData = () => {
    setUploadedFile({
      name: 'timetable_data.xlsx',
      size: '38.4 KB',
      status: 'uploading',
    });

    setTimeout(() => {
      setUploadedFile({
        name: 'timetable_data.xlsx',
        size: '38.4 KB',
        status: 'completed',
      });
      showToast('Loaded demo university dataset: timetable_data.xlsx', 'success');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Title Header matching Screenshot 2 */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight">
          AI Timetable Generator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Ingest institutional curriculum, faculty shifts, classroom allotments, and NEP course matrices
        </p>
      </div>

      {/* Large Upload Box matching Screenshot 2 */}
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Circular Teal Icon Badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal-800 text-white shadow-md mb-4">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h2 className="text-lg font-bold text-slate-900">Upload Timetable Data</h2>
        <p className="text-xs text-slate-500 mt-1">Drop Excel file here or click to browse</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Supports .xlsx, .xls up to 10MB</p>

        {/* Upload Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:border-teal-600 hover:text-teal-800 transition shadow-sm"
          >
            <FileSpreadsheet className="h-4 w-4 text-teal-700" />
            <span>Select File</span>
          </button>

          <button
            type="button"
            onClick={handleUseDemoData}
            className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-5 py-2.5 text-xs font-bold text-teal-800 hover:bg-teal-100 transition shadow-sm"
          >
            <Database className="h-4 w-4 text-teal-700" />
            <span>Use Demo Dataset (timetable_data.xlsx)</span>
          </button>
        </div>

        {/* File Ingested Status Card */}
        {uploadedFile && (
          <div className="mt-8 mx-auto max-w-md rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-800 text-white font-bold text-xs">
                  XLSX
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{uploadedFile.name}</p>
                  <p className="text-[11px] text-slate-500">{uploadedFile.size}</p>
                </div>
              </div>

              {uploadedFile.status === 'completed' ? (
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Ready</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs font-medium text-teal-700">
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Parsing...</span>
                </div>
              )}
            </div>

            {uploadedFile.status === 'uploading' && (
              <div className="mt-3 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className="bg-teal-700 h-1.5 rounded-full animate-pulse" style={{ width: '70%' }} />
              </div>
            )}
          </div>
        )}

        {/* Generate Schedules Button with Sparkles Icon (Matches Screenshot 2) */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => {
              if (!uploadedFile) {
                handleUseDemoData();
              }
              router.push('/timetable/validate');
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-800 px-8 py-3 text-sm font-bold text-white hover:bg-teal-700 shadow-md shadow-teal-900/20 transition"
          >
            <Sparkles className="h-4 w-4 text-teal-200" />
            <span>Generate Schedules</span>
          </button>
        </div>
      </div>

      {/* Helper Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-800">1. Instant Parsing</p>
          <p className="text-[11px] text-slate-500 mt-1">Automatic detection of faculty codes, room capacities, and student strengths.</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-800">2. NEP 2020 Compliance</p>
          <p className="text-[11px] text-slate-500 mt-1">Handles multidisciplinary minor electives (MDM) and professional electives (PEC).</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-800">3. Zero-Collision Engine</p>
          <p className="text-[11px] text-slate-500 mt-1">Simulated CP-SAT constraint satisfaction prevents double-booking faculty or labs.</p>
        </div>
      </div>
    </div>
  );
}
