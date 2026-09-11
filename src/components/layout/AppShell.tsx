'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Breadcrumbs } from './Breadcrumbs';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1 p-8 min-h-[calc(100vh-4rem)] max-w-7xl">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
};
