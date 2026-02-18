import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    isLoading?: boolean;
  }
>(({ className = '', variant = 'primary', size = 'md', fullWidth = false, isLoading = false, children, disabled, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-black italic uppercase tracking-wider transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100";

  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-xl shadow-primary-500/25 focus:ring-primary-500",
    secondary: "bg-accent-500 text-white hover:bg-accent-600 shadow-xl shadow-accent-500/25 focus:ring-accent-500",
    outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-900 focus:ring-slate-500 dark:border-slate-800 dark:hover:bg-slate-900 dark:text-white",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/25 focus:ring-red-500",
    glass: "glass-card hover:bg-white/20 dark:hover:bg-white/10 text-slate-900 dark:text-white border-white/20",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const loadingClass = isLoading ? "opacity-80 pointer-events-none" : "";

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${loadingClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
});

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'ghost' | 'outline' | 'filled' | 'glass';
    color?: 'default' | 'primary' | 'danger' | 'success' | 'accent';
  }
>(({ className = '', size = 'md', variant = 'ghost', color = 'default', children, ...props }, ref) => {
  const baseStyles = "rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-90";

  const sizes = {
    sm: "h-9 w-9 p-2",
    md: "h-11 w-11 p-2.5",
    lg: "h-14 w-14 p-3.5",
  };

  const variants = {
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800/50",
    outline: "border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50",
    filled: "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700",
    glass: "glass hover:bg-white/20 dark:hover:bg-white/10 border-white/20",
  };

  const colors = {
    default: "text-slate-500 dark:text-slate-400",
    primary: "text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-950/30",
    accent: "text-accent-500 hover:bg-accent-50 dark:hover:bg-accent-950/30",
    danger: "text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30",
    success: "text-green-500 hover:bg-green-50 dark:hover:bg-green-950/30"
  };

  const colorClass = color !== 'default' && variant === 'ghost' ? colors[color] : colors['default'];

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${colorClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string | boolean;
    helperText?: React.ReactNode;
    fullWidth?: boolean;
    containerClassName?: string;
  }
>(({ className = '', label, error, helperText, fullWidth = false, containerClassName = '', id, ...props }, ref) => {
  const inputId = id || React.useId();
  const hasError = !!error;

  return (
    <div className={`flex flex-col gap-2 ${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-black uppercase italic tracking-widest text-slate-500 dark:text-slate-400 ml-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          flex h-12 w-full rounded-2xl border-2 bg-white/50 dark:bg-[#0a0a0c]/50 px-4 py-2 text-sm backdrop-blur-sm
          placeholder:text-slate-400 focus:outline-none transition-all duration-300
          dark:text-slate-100
          ${hasError
            ? 'border-red-500 focus:ring-4 focus:ring-red-500/10'
            : 'border-slate-200 dark:border-white/10 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 dark:focus:border-primary-500/50'}
          ${className}
        `}
        {...props}
      />
      {helperText && (
        <p className={`text-[10px] font-bold uppercase tracking-tight ml-1 ${hasError ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

export const Card = ({ children, className = '', padding = 'md' }: { children: React.ReactNode; className?: string; padding?: 'none' | 'sm' | 'md' | 'lg' }) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6 md:p-8',
    lg: 'p-10 md:p-12',
  };

  return (
    <div className={`glass-card rounded-[2.5rem] overflow-hidden ${paddings[padding]} ${className}`}>
      {children}
    </div>
  );
};
