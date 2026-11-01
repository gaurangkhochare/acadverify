import React from 'react';

export interface StepperProps {
  currentStep: number; // 1, 2, or 3
  onStepClick?: (step: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: 'Choose file' },
    { number: 2, label: 'Check data' },
    { number: 3, label: 'Submit' },
  ];

  return (
    <div className="flex items-center space-x-6 sm:space-x-10">
      {steps.map((step) => {
        const isActive = step.number === currentStep;
        const isPast = step.number < currentStep;

        return (
          <div
            key={step.number}
            onClick={() => onStepClick && isPast && onStepClick(step.number)}
            className={`flex items-center space-x-3 ${
              isPast && onStepClick ? 'cursor-pointer' : ''
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-base transition-colors ${
                isActive
                  ? 'bg-[#0B3C88] text-white border-2 border-[#0B3C88]'
                  : isPast
                  ? 'bg-blue-100 text-[#0B3C88] border-2 border-[#0B3C88]'
                  : 'bg-white text-slate-800 border-2 border-slate-800'
              }`}
            >
              {step.number}
            </div>
            <span
              className={`font-bold text-sm sm:text-base ${
                isActive ? 'text-slate-900' : 'text-slate-700'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

