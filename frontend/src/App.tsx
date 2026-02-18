import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense } from 'react';
import { useUser } from 'src/features/auth/api/getUser';
import { Loader } from 'src/features/shared/components/Loader';
import { ScrollToTop } from 'src/features/shared/components/ScrollToTop';

// Lazy load pages
import { ErrorBoundary } from 'react-error-boundary';

const SignInPage = React.lazy(() => import('src/features/auth/components/SignInPage'));
const SignUpPage = React.lazy(() => import('src/features/auth/components/SignUpPage'));
const TermsPage = React.lazy(() => import('src/features/terms/components/TermsPage'));
const TagsPage = React.lazy(() => import('src/features/tags/components/TagsPage'));
const WelcomePage = React.lazy(() => import('src/features/welcome/components/WelcomePage'));

const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0c] p-4 text-center">
    <div className="glass-card p-12 rounded-3xl max-w-md space-y-6">
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">System Breach</h2>
      <p className="text-slate-500 dark:text-slate-400">An unexpected disruption has occurred in the linguistic matrix.</p>
      <button
        onClick={() => window.location.reload()}
        className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black italic uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary-500/20 active:scale-95"
      >
        Re-initialize Session
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const { data: user, isLoading } = useUser();
  const isAuthenticated = !!user;

  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ScrollToTop />
      <Suspense fallback={<Loader isLoading={true} />}>
        <Routes>
          {/* Public Routes */}
          {!isAuthenticated && (
            <>
              <Route path="/login" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<WelcomePage />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}

          {/* Private Routes */}
          {isAuthenticated && (
            <>
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<Navigate to="/terms" replace />} />
              <Route path="/signup" element={<Navigate to="/terms" replace />} />
              <Route path="*" element={<Navigate to="/terms" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
