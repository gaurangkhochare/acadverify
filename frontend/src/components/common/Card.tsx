import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'warning' | 'info' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-150 p-6';

  const variantClasses = {
    default: 'bg-white border border-slate-900 shadow-sm',
    bordered: 'bg-white border border-slate-300 shadow-sm',
    warning: 'bg-[#FDE68A] border border-slate-900 shadow-sm text-slate-900',
    info: 'bg-[#EBF2FE] border border-slate-900 shadow-sm text-slate-900',
  };

  return (
    <div
      className={twMerge(clsx(baseClasses, variantClasses[variant], className))}
      {...props}
    >
      {children}
    </div>
  );
};

