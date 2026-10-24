import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const variantClasses = {
    default: 'bg-slate-100 text-slate-800 border border-slate-200',
    neutral: 'bg-slate-200/70 text-slate-700 font-semibold px-3 py-1',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold',
    amber: 'bg-[#FDE68A] text-amber-950 border border-amber-300 font-semibold',
    danger: 'bg-rose-50 text-rose-800 border border-rose-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200',
  };

  return (
    <span
      className={twMerge(clsx(baseClasses, sizeClasses[size], variantClasses[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
};

