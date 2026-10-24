import React from 'react';
import { Button } from '../common/Button';

export interface IssueActionCardProps {
  title: string;
  subtext: string;
  actionLabel: string;
  onAction: () => void;
  variant?: 'fix' | 'review';
}

export const IssueActionCard: React.FC<IssueActionCardProps> = ({
  title,
  subtext,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="rounded-2xl border-2 border-slate-900 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm sm:text-base text-slate-600">{subtext}</p>
      </div>
      <div className="sm:flex-shrink-0">
        <Button
          onClick={onAction}
          variant="primary"
          className="w-full sm:w-auto px-6 py-2.5 text-base font-bold bg-[#0B3C88] hover:bg-[#072B62]"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

