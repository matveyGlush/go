"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ICustomLink { 
  children?: ReactNode,
  href: string,
  theme?: 'dark' | 'light',
  className?: string,
}

export default function CustomLink({ children, href, theme = 'light', className = '' }: ICustomLink) {
  return (
    <Link href={href} className={
      theme === 'light'
      ? `block rounded-lg px-5 py-1 border transition-all duration-200 bg-black text-white hover:bg-white hover:text-black hover:border-black ${className}` 
      : `block rounded-lg px-5 py-1 border border-black transition-all duration-200 bg-white text-black hover:bg-black hover:text-white hover:border-white ${className}`
    }>
      {children}
    </Link>
  )
}