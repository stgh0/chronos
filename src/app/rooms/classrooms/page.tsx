'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DoorOpen, Users, Plus, Search, CheckCircle2 } from 'lucide-react';
import { DEMO_ROOMS } from '@/data/demoData';

export default function ClassroomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const classrooms = DEMO_ROOMS.filter((r) => r.type === 'classroom');

  const filtered = classrooms.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Lecture Classrooms</h1>
          <p className="text-xs text-slate-500 mt-1">
            Classroom seating capacities, audiovisual equipment, and building locations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/rooms/labs"
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            View Laboratories →
          </Link>
          <button className="flex items-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition">
            <Plus className="h-4 w-4" />
            <span>Add Classroom</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((room) => (
          <div key={room.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                  {room.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{room.name}</h3>
                <p className="text-xs text-slate-500">{room.building} • Floor {room.floor}</p>
              </div>

              <div className="text-right">
                <span className="text-xl font-black text-slate-900">{room.capacity}</span>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Seats</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
              {room.equipment.map((eq, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                  {eq}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
