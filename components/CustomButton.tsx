import React, { ReactNode } from 'react';

interface CustomButtonProps {
  children: ReactNode,
  className: string,
  type?: "button" | "submit" | "reset" | undefined,
}

export default function CunstomButton({ children, className = '', type = 'button' }: CustomButtonProps) {
  return (
    <button
      type={type}
      className={`rounded-lg transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-105 ${className}`}
    >
      {children}
    </button>
  );
};