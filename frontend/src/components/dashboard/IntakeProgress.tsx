import React from 'react';
import { ProgressBar } from '../common/ProgressBar';

export interface IntakeProgressProps {
  enrolled: number;
  approved: number;
}

export const IntakeProgress: React.FC<IntakeProgressProps> = ({ enrolled, approved }) => {
  const seatsRemaining = Math.max(0, approved - enrolled);
  const isOverIntake = enrolled > approved;

  return (
    <div className="w-full space-y-3 min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 tracking-tight">
          {enrolled} of {approved} approved seats are filled
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 shrink-0">
          {Math.round((enrolled / (approved || 1)) * 100)}% Capacity
        </span>
      </div>

      <ProgressBar current={enrolled} total={approved} />

      <p className="text-sm text-slate-500 font-normal">
        {isOverIntake ? (
          <span className="text-rose-600 font-medium">
            Intake exceeded by {enrolled - approved} seats! Review supernumerary quota or pending admissions.
          </span>
        ) : (
          <>
            <span className="font-medium text-slate-700">{seatsRemaining} {seatsRemaining === 1 ? 'seat' : 'seats'} remaining.</span> Enrolment cannot go above the approved intake.
          </>
        )}
      </p>
    </div>
  );
};
