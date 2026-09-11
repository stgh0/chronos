'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserCheck,
  BookOpen,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { RoleGuard } from '@/components/auth/RoleGuard';

const FACULTY_COURSES = [
  {
    code: 'CE-202',
    name: 'Operating Systems',
    batches: 'SY-A, SY-B (Computer Engineering)',
    hours: '6 Hours / Week (Theory)',
    students: '124 Enrolled Students',
    location: 'Lecture Hall C-202',
    nextLecture: 'Today at Slot 5 (12:20–01:15)',
  },
  {
    code: 'CE-401',
    name: 'Advanced AI & Neural Networks',
    batches: 'LY-A (Computer Engineering)',
    hours: '4 Hours / Week (Theory + Project)',
    students: '58 Enrolled Students',
    location: 'Lecture Hall C-301',
    nextLecture: 'Tomorrow at Slot 2 (10:00–10:55)',
  },
  {
    code: 'LAB-OS',
    name: 'Operating Systems System Call Lab',
    batches: 'SY-A Batch 1 & 2',
    hours: '4 Hours / Week (Practical)',
    students: '62 Students',
    location: 'Lab-2 High Performance Computing',
    nextLecture: 'Thursday Slot 7–8 (02:10–04:00)',
  },
];

export default function FacultyCoursesPage() {
  return (
    <RoleGuard allowedRoles={['faculty', 'admin']}>
      <div className="space-y-6">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-lg border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-500/30 text-indigo-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Faculty Teaching Scope
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">My Teaching Courses & Batches</h1>
            <p className="text-xs text-indigo-100 mt-0.5">
              Assigned curriculum modules for <strong className="text-white">Dr. Suresh Kulkarni</strong> (Senior Professor, CE Dept)
            </p>
          </div>

          <Link
            href="/faculty-dashboard"
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-indigo-900 hover:bg-indigo-50 transition shadow"
          >
            View Workload Breakdown
          </Link>
        </div>

        {/* Faculty Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FACULTY_COURSES.map((course) => (
            <div
              key={course.code}
              className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-900 text-white font-mono text-xs font-bold">
                    {course.code}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {course.hours}
                  </span>
                </div>

                <h2 className="text-base font-extrabold text-slate-900">{course.name}</h2>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Batches: <strong className="text-slate-800">{course.batches}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Venue: <strong className="text-slate-800">{course.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
                    <span>Next: <strong className="text-indigo-900">{course.nextLecture}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{course.students}</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Active Schedule
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
