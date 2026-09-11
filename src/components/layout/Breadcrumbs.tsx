'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '/login' || pathname === '/dashboard') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  const formatSegment = (seg: string) => {
    return seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
      <Link href="/dashboard" className="flex items-center gap-1 hover:text-teal-800 transition">
        <Home className="h-3.5 w-3.5" />
        <span>Dashboard</span>
      </Link>

      {segments.map((seg, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/');
        const isLast = idx === segments.length - 1;

        return (
          <React.Fragment key={href}>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            {isLast ? (
              <span className="font-semibold text-slate-800">{formatSegment(seg)}</span>
            ) : (
              <Link href={href} className="hover:text-teal-800 transition">
                {formatSegment(seg)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
