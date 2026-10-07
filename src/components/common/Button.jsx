import React from 'react';
import { cn } from '../../utils/cn';

export const Button = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#f7efe5] disabled:opacity-50 disabled:pointer-events-none rounded-xl';
  
  const variants = {
    primary: 'bg-[#2F858E] text-white hover:bg-[#256f77] shadow-sm hover:shadow focus:ring-[#2F858E]',
    secondary: 'bg-[#e3f0ed] text-[#286f75] hover:bg-[#d5e9e5] focus:ring-[#2F858E]',
    outline: 'border border-[#d8cfc2] bg-[#fffdfa] hover:bg-[#f8f3ec] text-[#53636a] focus:ring-[#2F858E]',
    ghost: 'bg-transparent hover:bg-[#f2ece4] text-[#53636a] focus:ring-[#8c9a98]',
    danger: 'bg-[#f8e9e4] text-[#9d4f42] hover:bg-[#f3dcd3] focus:ring-[#b75d4b]',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
