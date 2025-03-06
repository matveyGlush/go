"use client"

import React from 'react';

export default function LoadingSpinner({ theme = 'dark', className }: { theme?: 'dark' | 'light', className?: string }) {

  return (
    <div className="flex items-center justify-center">
      <div className={`w-8 h-8 border-4 border-transparent ${theme === 'dark' ? 'border-r-black' : 'border-r-white'}  rounded-full animate-spin ${className}`}></div>
    </div>
  );
};