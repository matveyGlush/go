"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HideOnScroll from "./HideOnScroll";
import CustomLink from "@/components/CustomLink";

export default function CustomLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <HideOnScroll>
        <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
          <div className="container mx-auto max-w-4xl flex justify-between items-center py-4 px-6">
            <Link href="/">
              <div className="text-xl font-bold">Игра&nbsp;Го</div>
            </Link>
            {pathname !== "/auth" && (
              <CustomLink href="auth" theme="dark">Аккаунт</CustomLink>
            )}
          </div>
        </header>
      </HideOnScroll>

      <main className="container mx-auto max-w-4xl pt-24 px-4 flex-grow text-black">
        <div className="mt-8">{children}</div>
      </main>

      <footer className="text-center py-4 bg-white">
        <Link href={'https://github.com/matveyGlush/go'} className="text-gray-600 text-sm underline">github&nbsp;matveyGlush</Link>
      </footer>
    </div>  
  );
}
