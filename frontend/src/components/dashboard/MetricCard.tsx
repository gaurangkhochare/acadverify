import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'warning' | 'info';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  variant = 'default',
  onClick,
}) => {
  const isWarning = variant === 'warning';

  return (
    <div
      onClick={onClick}
      className={`w-full min-w-0 rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 ${
        isWarning
          ? 'bg-amber-50 border-amber-200 text-gray-900 shadow-sm hover:shadow-md hover:border-amber-300'
          : 'bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300'
      } ${onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-wider ${isWarning ? 'text-amber-800' : 'text-slate-500'}`}>
          {label}
        </span>
        {isWarning && (
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        )}
      </div>
      <div className="mt-3">
        <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${isWarning ? 'text-amber-950' : 'text-slate-900'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};
