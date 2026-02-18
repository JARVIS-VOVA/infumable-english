import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from 'src/features/auth/api/logout';
import { useUser } from 'src/features/auth/api/getUser';
import ROUTES from 'src/constants/routes';
import { ThemeModeContext, THEME_MODES } from 'src/features/shared/contexts/ThemeModeContext';
import { IconButton, Button } from './ui';

const NAV_LINKS = [
  { path: ROUTES.root, label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: ROUTES.terms, label: 'Lexicon', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
  { path: ROUTES.tags, label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
];

export const Header: React.FC = () => {
  const location = useLocation();
  const { themeMode, toggleThemeMode } = React.useContext(ThemeModeContext);
  const { data: user, isLoading: isUserLoading } = useUser();
  const logoutMutation = useLogout();
  const isAuthenticated = !!user;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-primary-500/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <span className="text-white font-black text-2xl italic leading-none">IE</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter hidden sm:block">
                Infumable <span className="text-primary-500">English</span>
              </h1>
            </Link>

            {isAuthenticated && (
              <div className="hidden lg:flex items-center gap-2">
                {NAV_LINKS.map(({ path, label, icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-3 ${location.pathname === path
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={icon} />
                    </svg>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <IconButton
              onClick={toggleThemeMode}
              variant="glass"
              size="md"
              aria-label="Toggle theme"
            >
              {themeMode === THEME_MODES.light ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </IconButton>

            {!isUserLoading && !isAuthenticated && (
              <div className="flex items-center gap-3">
                <Link to={ROUTES.signIn}>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                    Login
                  </Button>
                </Link>
                <Link to={ROUTES.signUp}>
                  <Button variant="primary" size="sm">
                    Join Now
                  </Button>
                </Link>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex items-center gap-5 pl-6 border-l border-primary-500/10">
                <div className="hidden sm:block text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Authenticated</p>
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic">{user?.username || 'User'}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-12 h-12 bg-white dark:bg-white/5 hover:bg-red-500 dark:hover:bg-red-500 text-primary-500 hover:text-white border border-primary-500/10 rounded-2xl flex items-center justify-center font-black uppercase italic shadow-lg shadow-black/5 transition-all duration-300 group/logout relative overflow-hidden active:scale-90"
                  title="Logout"
                >
                  <span className="group-hover/logout:translate-y-[-150%] transition-transform duration-300 block">{user?.username?.charAt(0) || 'U'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute translate-y-[150%] group-hover/logout:translate-y-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
