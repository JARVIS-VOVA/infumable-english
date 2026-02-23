import React from 'react'
import { Form, Field } from 'react-final-form'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useLogin } from '../api/login'
import { composeValidators, required, email, minLengthPassword } from 'src/helpers/validations/fieldLevelValidation'

type SignInFormValues = {
  email: string;
  password: string;
}

type ApiErrorPayload = {
  error?: string;
}

type ApiError = {
  response?: {
    data?: ApiErrorPayload;
  };
}

const SignInForm: React.FC = () => {
  const navigate = useNavigate()
  const loginMutation = useLogin()

  const onSubmit = (values: SignInFormValues) => {
    loginMutation.mutate(
      { session: values },
      {
        onSuccess: () => {
          toast.success('Access granted. Welcome back.')
          navigate('/terms')
        },
        onError: (error: unknown) => {
          const apiError = error as ApiError
          toast.error(apiError.response?.data?.error || 'Authentication failed')
        },
      }
    )
  }

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-8 rounded-3xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-2xl rounded-full -mr-16 -mt-16"></div>

        <div className="text-center space-y-2">
          <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Credentials</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Synchronize with your linguistic profile.</p>
        </div>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
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
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={invalid || loginMutation.isPending}
                  className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-primary-800 disabled:opacity-50 text-white font-black italic uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  {loginMutation.isPending ? 'Authenticating...' : (
                    <>
                      Establish Session
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-xs text-slate-500 dark:text-slate-500 font-medium">
                New to the collective? {' '}
                <Link to="/signup" className="text-primary-500 hover:underline font-bold">Initiate Registration</Link>
              </p>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export default SignInForm
