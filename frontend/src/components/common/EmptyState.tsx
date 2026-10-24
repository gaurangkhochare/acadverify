import React from 'react';
import { FolderOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
}) => {
  return (
    <div className="text-center py-12 px-4 border-2 border-dashed border-slate-300 rounded-2xl bg-white/60">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500 mb-3">
        {icon || <FolderOpen className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">{description}</p>
      {actionText && onAction && (
        <div className="mt-5">
          <Button onClick={onAction} size="sm">
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};

