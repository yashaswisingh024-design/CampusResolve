import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = 'default', children }) => {
  const variants = {
    default: 'bg-[#eee9df] text-[#53636a]',
    secondary: 'bg-[#eee9df] text-[#53636a]',
    primary: 'bg-[#e3f0ed] text-[#286f75]',
    success: 'bg-[#e7f0e6] text-[#456d50]',
    warning: 'bg-[#f7efd9] text-[#89652c]',
    danger: 'bg-[#f8e9e4] text-[#9d4f42]',
    info: 'bg-[#e3f0ed] text-[#286f75]',
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
