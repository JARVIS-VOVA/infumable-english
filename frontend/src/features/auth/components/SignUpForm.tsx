import React from 'react'
import { Form, Field } from 'react-final-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSignup } from '../api/signup'
import { composeValidators, required, email, minLengthPassword, passwordsMatch } from 'src/helpers/validations/fieldLevelValidation'

const SignUpForm: React.FC = () => {
  const navigate = useNavigate()
  const signupMutation = useSignup()

  const onSubmit = (values: any) => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        toast.success('Account localized. Welcome to the collective.')
        navigate('/terms')
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.errors?.join(', ') || 'Registration failed')
      },
    })
  }

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-8 rounded-3xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-accent-500/10 blur-2xl rounded-full -ml-16 -mt-16"></div>

        <div className="text-center space-y-2">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Registration</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Join our network of linguistic pioneers.</p>
        </div>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid, values }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Field
                  name="email"
                  validate={composeValidators(required, email)}
                  render={({ input, meta }) => (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Email Endpoint</label>
                      <input
                        {...input}
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-[10px] font-bold uppercase tracking-wide mt-1 ml-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                />

                <Field
                  name="username"
                  validate={required}
                  render={({ input, meta }) => (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Linguistic Avatar</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="username"
                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-[10px] font-bold uppercase tracking-wide mt-1 ml-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                />

                <Field
                  name="password"
                  validate={composeValidators(required, minLengthPassword)}
                  render={({ input, meta }) => (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Security Key</label>
                      <input
                        {...input}
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-[10px] font-bold uppercase tracking-wide mt-1 ml-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                />

                <Field
                  name="passwordConfirmation"
                  validate={composeValidators(required, minLengthPassword, passwordsMatch(values.password))}
                  render={({ input, meta }) => (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Confirm Identity</label>
                      <input
                        {...input}
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600"
                      />
                      {meta.touched && meta.error && (
                        <div className="text-red-500 text-[10px] font-bold uppercase tracking-wide mt-1 ml-1">{meta.error}</div>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={invalid || signupMutation.isPending}
                  className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-800 disabled:opacity-50 text-white font-black italic uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-accent-500/20 active:scale-95"
                >
                  {signupMutation.isPending ? 'Processing...' : 'Initiate Registration'}
                </button>
              </div>

              <p className="text-center text-xs text-slate-500 dark:text-slate-500 font-medium">
                Already synchronized? {' '}
                <Link to="/login" className="text-accent-500 hover:underline font-bold">Establish Session</Link>
              </p>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default SignUpForm
