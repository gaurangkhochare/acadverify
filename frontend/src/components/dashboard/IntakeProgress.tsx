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
    <div className="space-y-3">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        {enrolled} of {approved} approved seats are filled
      </h2>

      <ProgressBar current={enrolled} total={approved} />

      <p className="text-sm sm:text-base text-slate-700 font-medium">
        {isOverIntake ? (
          <span className="text-rose-600 font-bold">
            Intake exceeded by {enrolled - approved} seats! Review supernumerary quota or pending admissions.
          </span>
        ) : (
          <>
            {seatsRemaining} {seatsRemaining === 1 ? 'seat' : 'seats'} remaining. Enrolment cannot go above the approved intake.
          </>
        )}
      </p>
    </div>
  );
};

