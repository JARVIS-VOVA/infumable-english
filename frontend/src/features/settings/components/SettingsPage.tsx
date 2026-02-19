import React from 'react'
import toast from 'react-hot-toast'
import { useUser } from 'src/features/auth/api/getUser'
import { useUpdateCurrentUser } from 'src/features/auth/api/updateCurrentUser'
import { BaseLayout } from 'src/features/shared/components/BaseLayout'
import { THEME_MODES, ThemeModeContext } from 'src/features/shared/contexts/ThemeModeContext'

const SettingsPage: React.FC = () => {
  const { data: user, isLoading } = useUser()
  const updateCurrentUserMutation = useUpdateCurrentUser()
  const { themeMode, toggleThemeMode } = React.useContext(ThemeModeContext)
  const [username, setUsername] = React.useState('')

  React.useEffect(() => {
    if (user?.username) {
      setUsername(user.username)
    }
  }, [user?.username])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedUsername = username.trim()

    if (!normalizedUsername) {
      toast.error('Username cannot be blank')
      return
    }

    if (!user || normalizedUsername === user.username) {
      return
    }

    updateCurrentUserMutation.mutate(
      { user: { username: normalizedUsername } },
      {
        onSuccess: () => {
          toast.success('Username updated')
        },
        onError: (error: any) => {
          const apiErrors = error.response?.data?.errors
          toast.error(Array.isArray(apiErrors) ? apiErrors.join(', ') : 'Failed to update username')
        },
      }
    )
  }

  return (
    <BaseLayout title="Settings" isLoading={isLoading}>
      <div className="max-w-2xl space-y-6">
        <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-5">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Profile
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                placeholder="username"
                autoComplete="username"
                maxLength={100}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Must be unique across all users.
              </p>
            </div>

            <button
              type="submit"
              disabled={updateCurrentUserMutation.isPending || !user || username.trim() === user.username}
              className="h-11 px-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] bg-primary-500 text-white enabled:hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {updateCurrentUserMutation.isPending ? 'Saving...' : 'Save Username'}
            </button>
          </form>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-3xl space-y-5">
          <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
            Appearance
          </h3>

          <button
            onClick={toggleThemeMode}
            className="h-11 px-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex items-center gap-3"
            aria-label="Toggle theme"
          >
            {themeMode === THEME_MODES.light ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            )}
            <span>Change Theme</span>
          </button>
        </section>
      </div>
    </BaseLayout>
  )
}

export default SettingsPage
