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
      className={`rounded-2xl border-2 border-slate-900 p-6 flex flex-col justify-between transition-all ${
        isWarning
          ? 'bg-[#FDE68A] text-slate-900'
          : 'bg-white text-slate-900 hover:shadow-md'
      } ${onClick ? 'cursor-pointer hover:border-[#0B3C88]' : ''}`}
    >
      <span className="text-base sm:text-lg font-bold text-slate-900">
        {label}
      </span>
      <div className="mt-3">
        <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
          {value}
        </span>
      </div>
    </div>
  );
};

