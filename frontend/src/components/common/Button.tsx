import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'outline-white' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variantClasses = {
    primary:
      'bg-[#0B3C88] hover:bg-[#082E68] active:bg-[#062047] text-white font-bold border border-[#0B3C88] shadow-sm focus:ring-[#0B3C88]',
    outline:
      'bg-white hover:bg-slate-50 active:bg-slate-100 text-[#0B3C88] font-bold border-2 border-[#0B3C88] focus:ring-[#0B3C88]',
    'outline-white':
      'bg-transparent hover:bg-white/15 active:bg-white/25 text-white border-2 border-white focus:ring-white shadow-sm font-bold',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 border border-slate-200 focus:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border border-rose-600 focus:ring-rose-500',
    ghost:
      'bg-transparent hover:bg-slate-100 active:bg-slate-200 text-slate-700 focus:ring-slate-300',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  return (
    <button
      className={twMerge(clsx(baseClasses, variantClasses[variant], sizeClasses[size], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
