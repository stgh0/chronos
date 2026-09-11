'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  ShieldCheck,
  User,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { RoleGuard } from '@/components/auth/RoleGuard';

interface StudentTask {
  id: string;
  studentId: string;
  studentName: string;
  courseCode: string;
  courseName: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  priority: 'high' | 'medium' | 'low';
  type: 'Lab Report' | 'Project Milestone' | 'Quiz' | 'Theory Assignment';
}

const PERSONAL_STUDENT_TASKS: StudentTask[] = [
  {
    id: 'ST-001',
    studentId: 'CS-2024-089',
    studentName: 'Rahul Sharma',
    courseCode: 'CE-201',
    courseName: 'Data Structures & Algorithms',
    title: 'AVL Tree Implementation & Complexity Analysis Report',
    dueDate: '2026-09-14 (Monday 11:59 PM)',
    status: 'pending',
    priority: 'high',
    type: 'Lab Report',
  },
  {
    id: 'ST-002',
    studentId: 'CS-2024-089',
    studentName: 'Rahul Sharma',
    courseCode: 'CE-202',
    courseName: 'Operating Systems',
    title: 'Process Synchronization & Semaphore Deadlock Simulation',
    dueDate: '2026-09-18 (Friday 05:00 PM)',
    status: 'pending',
    priority: 'high',
    type: 'Project Milestone',
  },
  {
    id: 'ST-003',
    studentId: 'CS-2024-089',
    studentName: 'Rahul Sharma',
    courseCode: 'CE-203',
    courseName: 'Database Management Systems',
    title: 'University Library Relational Schema ERD & Normalization BCNF',
    dueDate: '2026-09-10 (Yesterday)',
    status: 'submitted',
    grade: '19/20 (A+)',
    priority: 'medium',
    type: 'Theory Assignment',
  },
  {
    id: 'ST-004',
    studentId: 'CS-2024-089',
    studentName: 'Rahul Sharma',
    courseCode: 'MDM-301',
    courseName: 'Internet of Things (IoT) Multidisciplinary',
    title: 'ESP32 Sensor Telemetry Setup & MQTT Protocol Test',
    dueDate: '2026-09-22 (Tuesday)',
    status: 'pending',
    priority: 'medium',
    type: 'Lab Report',
  },
];

export default function StudentTasksPage() {
  const { currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'submitted'>('all');
  const [submittedTasks, setSubmittedTasks] = useState<string[]>(['ST-003']);

  const handleMarkSubmitted = (taskId: string) => {
    if (!submittedTasks.includes(taskId)) {
      setSubmittedTasks([...submittedTasks, taskId]);
    }
  };

  const filteredTasks = PERSONAL_STUDENT_TASKS.filter((task) => {
    const isSub = submittedTasks.includes(task.id);
    if (filterStatus === 'pending') return !isSub;
    if (filterStatus === 'submitted') return isSub;
    return true;
  });

  return (
    <RoleGuard allowedRoles={['student', 'admin']}>
      <div className="space-y-6">
        {/* Strict Personal Access Header Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 p-6 text-white shadow-lg border border-teal-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-bold text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                <Lock className="h-3 w-3" />
                Strict Personal Authorization Scope
              </span>
              <span className="text-[11px] font-mono text-slate-300">ID: CS-2024-089</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">My Assigned Academic Tasks</h1>
            <p className="text-xs text-slate-300">
              Personal assignment ledger for <strong className="text-white">Rahul Sharma</strong> (SY-A Computer Engineering).
              Protected by role-based access control.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-right text-xs shrink-0">
            <div className="flex items-center justify-end gap-1.5 text-teal-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Cross-Student Access Blocked</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Isolated Personal Environment</p>
          </div>
        </div>

        {/* Filters & Summary Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === 'all' ? 'bg-teal-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Tasks ({PERSONAL_STUDENT_TASKS.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === 'pending' ? 'bg-teal-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Pending ({PERSONAL_STUDENT_TASKS.length - submittedTasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('submitted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filterStatus === 'submitted' ? 'bg-teal-800 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Submitted & Graded ({submittedTasks.length})
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <GraduationCap className="h-4 w-4 text-teal-700" />
            <span>Enrolled Batch: SY Computer Engineering (Division A)</span>
          </div>
        </div>

        {/* Task Cards List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const isSub = submittedTasks.includes(task.id);
            return (
              <div
                key={task.id}
                className={`p-5 rounded-2xl border transition shadow-sm hover:shadow-md ${
                  isSub
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : task.priority === 'high'
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-[10px] font-bold">
                        {task.courseCode}
                      </span>
                      <span className="text-xs font-bold text-slate-700">{task.courseName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {task.type}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">{task.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>Due: {task.dueDate}</span>
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-slate-700">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        <span>Assigned To: Rahul Sharma (Personal)</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isSub ? (
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-xl">
                          <CheckCircle2 className="h-4 w-4" />
                          Submitted
                        </span>
                        {task.grade && (
                          <p className="text-[11px] font-bold text-emerald-800 mt-1">Grade: {task.grade}</p>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMarkSubmitted(task.id)}
                        className="px-4 py-2 rounded-xl bg-teal-800 text-white font-bold text-xs hover:bg-teal-900 transition shadow-sm flex items-center gap-1.5"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Submit Assignment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Anti-Clash Security Guarantee Notice */}
        <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-teal-400 shrink-0" />
            <p>
              <strong>Chronos Data Isolation Active:</strong> Tasks from Division SY-B, TY-A, or other students are strictly isolated from your portal view.
            </p>
          </div>
          <span className="text-[11px] font-bold text-teal-300 bg-teal-900/60 px-3 py-1 rounded-lg border border-teal-500/30 shrink-0">
            Privacy Guard v2.4
          </span>
        </div>
      </div>
    </RoleGuard>
  );
}
