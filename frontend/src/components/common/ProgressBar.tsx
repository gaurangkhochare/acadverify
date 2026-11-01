import React from 'react';

export interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((current / (total || 1)) * 100)));

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-100 h-3.5 sm:h-4 rounded-full overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
