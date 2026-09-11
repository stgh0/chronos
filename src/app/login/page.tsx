'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Sparkles, UserCheck, GraduationCap, ArrowRight, Lock, Mail, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole, showToast } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@chronos.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin@chronos.edu.in');
    } else if (role === 'faculty') {
      setEmail('suresh.kulkarni@chronos.edu.in');
    } else if (role === 'student') {
      setEmail('rahul.sharma@chronos.edu.in');
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setCurrentRole(selectedRole);
    showToast(`Logged in successfully as ${selectedRole.toUpperCase()}`, 'success');

    // Route to respective dashboard
    if (selectedRole === 'faculty') {
      router.push('/faculty-dashboard');
    } else if (selectedRole === 'student') {
      router.push('/student-dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white font-black text-2xl shadow-xl shadow-teal-500/20 mb-4">
            C
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Chronos Academic</h1>
          <p className="text-sm text-teal-200/80 mt-1 font-medium">
            Intelligent University Scheduling Platform
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-900/60 border border-teal-500/30 text-teal-300 text-xs font-semibold mt-3">
            <Sparkles className="h-3 w-3" />
            <span>NEP 2020 Multi-Page System</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-700/60 bg-white/95 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-lg font-bold text-slate-900">Sign in to Your Account</h2>
          <p className="text-xs text-slate-500 mt-1 mb-5">Select your role and enter your institutional credentials</p>

          {/* Role Selection Buttons */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Role Context
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition ${
                  selectedRole === 'admin'
                    ? 'bg-white text-teal-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className={`h-4 w-4 mb-1 ${selectedRole === 'admin' ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('faculty')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition ${
                  selectedRole === 'faculty'
                    ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className={`h-4 w-4 mb-1 ${selectedRole === 'faculty' ? 'text-indigo-700' : 'text-slate-400'}`} />
                <span>Faculty</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg text-xs font-bold transition ${
                  selectedRole === 'student'
                    ? 'bg-white text-amber-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className={`h-4 w-4 mb-1 ${selectedRole === 'student' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span>Student</span>
              </button>
            </div>
          </div>

          {/* Credential Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Institutional Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2 text-sm text-slate-800 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2 text-sm text-slate-800 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-800 py-3 px-4 font-bold text-white text-sm hover:bg-teal-900 shadow-md shadow-teal-900/20 transition"
            >
              <span>Sign In as {selectedRole.toUpperCase()}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
            <span>Strict Role & Access Scope Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
