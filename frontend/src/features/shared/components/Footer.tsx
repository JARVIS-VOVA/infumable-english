import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES, { OUTSIDE_ROUTES } from 'src/constants/routes';
import { gitHubSvg } from 'src/assets/img';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 dark:bg-[#0a0a0c] border-t border-primary-500/10 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex justify-center md:justify-start">
            <Link
              to={ROUTES.police}
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary-500 transition-colors italic"
            >
              System Policy
            </Link>
          </div>

          <div className="flex-1 flex justify-center">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase">
              COPYRIGHT © 2019 - {currentYear} <span className="text-primary-500/20 mx-2 hidden sm:inline">|</span> INFUMABLE ENGLISH
            </p>
          </div>

          <div className="flex-1 flex justify-center md:justify-end">
            <a
              href={OUTSIDE_ROUTES.urlGitHubRepository}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-10 h-10 bg-white dark:bg-white/5 hover:bg-primary-500 dark:hover:bg-primary-500 rounded-xl border border-primary-500/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/5"
              aria-label="GitHub Repository"
            >
              <img src={gitHubSvg} alt="GitHub" className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:invert transition-all dark:invert" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
