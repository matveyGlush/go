import React, { ReactNode } from 'react';

interface CustomButtonProps {
  children?: ReactNode,
  type?: "button" | "submit" | "reset" | undefined,
  theme?: 'dark' | 'light',
  className?: string,
  onClickFunc?: (...args: any) => void,
  clickFuncArgs?: any[],
}

export default function CunstomButton({ children, className = '', type = 'button', theme = "light", onClickFunc, clickFuncArgs }: CustomButtonProps) {
  return (
    <button
      onClick={() => onClickFunc ? onClickFunc(...[clickFuncArgs]) : null}
      type={type}
      // className={`rounded-lg transition-all duration-300 bg-black text-white hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-105 ${className}`}
      className={
        theme === 'light'
        ? `rounded-lg transition-all duration-200 border bg-black text-white hover:bg-white hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}` 
        : `rounded-lg px-5 py-1 border border-black transition-all duration-200 bg-white text-black hover:bg-black hover:text-white hover:border-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}` 
      }
    >
      {children}
    </button>
  );
};