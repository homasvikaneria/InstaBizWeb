'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { admin, isAuthenticated, loading, logout } = useAuth();

  // Route protection: redirect unauthenticated users to /admin
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  // While restoring auth state or if unauthenticated (awaiting redirect), show loading indicator
  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header / Admin Info Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              Protected Admin Area
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Dashboard
            </h1>
            {admin && (
              <p className="text-sm text-slate-600">
                Signed in as <span className="font-semibold text-slate-900">{admin.name || 'Administrator'}</span> ({admin.email})
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            type="button"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 shrink-0"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Placeholder Body */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Authentication Layer Verified
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            You are viewing a protected client-side route. Your JWT session token is active and valid.
          </p>
        </div>

      </div>
    </div>
  );
}
