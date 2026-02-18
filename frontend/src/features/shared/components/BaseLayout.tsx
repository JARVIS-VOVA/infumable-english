import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Loader } from './Loader';

type BaseLayoutProps = {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, isLoading, title }) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50 dark:bg-[#0a0a0c] selection:bg-primary-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/10 blur-[130px] rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-500/10 blur-[130px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] invert dark:invert-0"></div>
      </div>

      <Loader isLoading={isLoading} />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-0">
        {title && (
          <div className="mb-16 md:mb-20 animate-in fade-in slide-in-from-left-8 duration-700">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i % 2 === 1 ? 'text-primary-500' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mt-8 shadow-lg shadow-primary-500/20"></div>
          </div>
        )}
        {children}
      </main>

      <Footer />
    </div>
  );
};
