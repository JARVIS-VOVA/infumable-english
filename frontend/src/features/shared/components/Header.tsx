import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLogout } from 'src/features/auth/api/logout'
import { useUser } from 'src/features/auth/api/getUser'
import ROUTES from 'src/constants/routes'

const NAV_LINKS = [
  { path: ROUTES.root, label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: ROUTES.terms, label: 'Lexicon', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { path: ROUTES.publicSources, label: 'Public Sources', icon: 'M21 12a9 9 0 11-18 0 9 9 0 0118 0zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18' },
  { path: ROUTES.mySources, label: 'My Sources', icon: 'M8 7V3m8 4V3M4 11h16M5 21h14a1 1 0 001-1V7a2 2 0 00-2-2H6a2 2 0 00-2 2v13a1 1 0 001 1z' },
]

export const Header: React.FC = () => {
  const location = useLocation()
  const { data: user } = useUser()
  const logoutMutation = useLogout()
  const isAuthenticated = !!user

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const isActivePath = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-20 sm:w-72 glass border-r border-primary-500/10 transition-all duration-300">
      <div className="h-full flex flex-col p-3 sm:p-6">
        <Link to="/" className="flex items-center gap-4 group mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
            <span className="text-white font-black text-2xl italic leading-none">IE</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter hidden sm:block">
            Infumable <span className="text-primary-500">English</span>
          </h1>
        </Link>

        {isAuthenticated && (
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${isActivePath(path)
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                aria-current={isActivePath(path) ? 'page' : undefined}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
                </svg>
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5 border-t border-primary-500/10 flex flex-col gap-3">
          <div
            className="h-11 px-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-white/5 flex items-center gap-3"
            title={isAuthenticated ? user?.email : 'No email available'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 12H8m8 4H8m8-8H8m10 13H6a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline truncate">{isAuthenticated ? user?.email : 'No email'}</span>
          </div>

          <Link
            to={ROUTES.settings}
            className="h-11 px-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-2.757 0-5 2.243-5 5v6h10v-6c0-2.757-2.243-5-5-5zm0-6a3 3 0 00-3 3v3h6V5a3 3 0 00-3-3z" />
            </svg>
            <span className="hidden sm:inline">Settings</span>
          </Link>

          <button
            onClick={handleLogout}
            disabled={!isAuthenticated}
            className="h-11 px-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-red-500 enabled:hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3"
            title="Logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
