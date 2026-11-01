import React from 'react';
import { Button } from '../common/Button';
import { AlertCircle, AlertTriangle, HelpCircle } from 'lucide-react';

export interface IssueActionCardProps {
  title: string;
  subtext: string;
  actionLabel: string;
  onAction: () => void;
  variant?: 'fix' | 'review' | 'urgent';
}

export const IssueActionCard: React.FC<IssueActionCardProps> = ({
  title,
  subtext,
  actionLabel,
  onAction,
  variant,
}) => {
  const isReview = variant === 'review' || actionLabel.toLowerCase().includes('review');
  const isUrgent = variant === 'urgent' || title.toLowerCase().includes('no apaar');

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-sm transition-all duration-200 ${
        isUrgent
          ? 'bg-red-50/40 border-red-200/90 hover:border-red-300'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${
            isUrgent
              ? 'bg-red-100/70 border-red-200 text-red-600'
              : isReview
              ? 'bg-amber-50 border-amber-200 text-amber-600'
              : 'bg-blue-50 border-blue-200 text-[#0B3C88]'
          }`}
        >
          {isUrgent ? (
            <AlertCircle className="w-5 h-5" />
          ) : isReview ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <HelpCircle className="w-5 h-5" />
          )}
        </div>
        <div className="space-y-0.5 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate sm:whitespace-normal">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">{subtext}</p>
        </div>
      </div>

      <div className="sm:flex-shrink-0 flex items-center">
        <Button
          onClick={onAction}
          variant={isReview ? 'outline' : 'primary'}
          className={
            isReview
              ? 'w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 hover:border-gray-400 rounded-lg shadow-xs transition-colors'
              : 'w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors'
          }
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};
