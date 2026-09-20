import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
