'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Award,
  Layers,
  Sparkles,
  Lock,
} from 'lucide-react';
import { RoleGuard } from '@/components/auth/RoleGuard';

const ENROLLED_COURSES = [
  {
    code: 'CE-201',
    name: 'Data Structures & Algorithms',
    type: 'Core Major (Theory + Lab)',
    credits: '4 Credits (3 Theory + 1 Lab)',
    faculty: 'Prof. Ananya Roy',
    location: 'Lab-1 Data Structures / Hall C-201',
    schedule: 'Mon (09:00), Wed (10:30), Fri (02:00)',
    progress: '85% Syllabus Completed',
    color: 'border-teal-200 bg-teal-50/40',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    code: 'CE-202',
    name: 'Operating Systems',
    type: 'Core Major (Theory)',
    credits: '3 Credits (3 Theory)',
    faculty: 'Dr. Suresh Kulkarni',
    location: 'Lecture Hall C-202',
    schedule: 'Mon (12:20), Tue (10:30), Thu (09:00)',
    progress: '70% Syllabus Completed',
    color: 'border-sky-200 bg-sky-50/40',
    badgeColor: 'bg-sky-100 text-sky-800',
  },
  {
    code: 'CE-203',
    name: 'Database Management Systems',
    type: 'Core Major (Theory + Lab)',
    credits: '4 Credits (3 Theory + 1 Lab)',
    faculty: 'Dr. Rajesh Sharma',
    location: 'Lab-3 DBMS / Hall C-203',
    schedule: 'Tue (09:00), Thu (12:20), Fri (10:30)',
    progress: '78% Syllabus Completed',
    color: 'border-indigo-200 bg-indigo-50/40',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    code: 'MDM-301',
    name: 'Internet of Things (IoT)',
    type: 'Multidisciplinary Minor (MDM)',
    credits: '3 Credits (2 Theory + 1 Lab)',
    faculty: 'Dr. Sandeep Kadam',
    location: 'Lab-5 IoT Specialist Hub',
    schedule: 'Thu (02:00–04:00 Dedicated MDM Slot)',
    progress: '65% Syllabus Completed',
    color: 'border-amber-200 bg-amber-50/40',
    badgeColor: 'bg-amber-100 text-amber-900',
  },
  {
    code: 'PEC-104',
    name: 'DevOps & Cloud Systems',
    type: 'Professional Elective (PEC)',
    credits: '3 Credits (3 Theory)',
    faculty: 'Prof. Priya Iyer',
    location: 'Lecture Hall C-204',
    schedule: 'Wed (02:00–04:00 Dedicated PEC Slot)',
    progress: '80% Syllabus Completed',
    color: 'border-emerald-200 bg-emerald-50/40',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
];

export default function StudentCoursesPage() {
  return (
    <RoleGuard allowedRoles={['student', 'admin']}>
      <div className="space-y-6">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-teal-500/30 text-teal-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-teal-400/30 flex items-center gap-1">
                <Lock className="h-3 w-3" />
                NEP 2020 Enrolled Courses
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight">My Enrolled Academic Courses</h1>
            <p className="text-xs text-teal-100 mt-0.5">
              Personal course catalog for <strong className="text-white">Rahul Sharma</strong> (SY Computer Engineering • 17 Total Credits)
            </p>
          </div>

          <Link
            href="/student-dashboard"
            className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-teal-900 hover:bg-teal-50 transition shadow"
          >
            View Weekly Schedule
          </Link>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENROLLED_COURSES.map((course) => (
            <div
              key={course.code}
              className={`p-6 rounded-2xl border ${course.color} shadow-sm space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                    {course.code}
                  </span>
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${course.badgeColor}`}>
                    {course.type}
                  </span>
                </div>

                <h2 className="text-lg font-black text-slate-900">{course.name}</h2>
                <p className="text-xs font-bold text-slate-700">{course.credits}</p>

                <div className="pt-2 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Instructor: <strong className="text-slate-800">{course.faculty}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Venue: <strong className="text-slate-800">{course.location}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>Time Slots: {course.schedule}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700">{course.progress}</span>
                <Link
                  href="/student-dashboard/tasks"
                  className="font-bold text-teal-800 hover:text-teal-900 underline text-xs"
                >
                  View Course Tasks →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
}
