"use client";

import { ReactNode, Suspense, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import HideOnScroll from "./HideOnScroll";
import CustomLink from "@/components/CustomLink";
import CunstomButton from "./CustomButton";
import { useRouter } from 'next/navigation';
import { useAuthToken } from "@/app/_lib/utils";
import { exitGame } from "@/app/_lib/data";

export default function CustomLayout({ children, className }: { children: ReactNode, className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()
  const gameId = searchParams.get('id')

  const isAuth = useAuthToken();

  function handleGameExit() {
    const result = confirm("Вы уверены? Выход из игры будет означать техническое поражение!")
    const token = localStorage.getItem('token')
    if (result) {
      exitGame(token || '', Number(gameId))
      router.push('/')
    }
  }

  return (
    <Suspense>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <HideOnScroll>
          <header className="fixed top-0 left-0 w-full bg-black text-white z-50">
            <div className="container mx-auto max-w-4xl flex justify-between items-center py-4 px-6">
              <Link href="/">
                <div className="text-xl font-bold">Игра&nbsp;Го</div>
              </Link>
              {pathname !== "/account" && pathname !== "/game" && (
                <CustomLink href={isAuth === 'in' ? 'account' : 'auth'} theme="dark">Аккаунт</CustomLink>
              )}
              {pathname === "/game" && (
                <CunstomButton theme="dark" onClickFunc={() => handleGameExit()}>Выйти из игры</CunstomButton>
              )}
            </div>
          </header>
        </HideOnScroll>

        <main className={`container mx-auto max-w-4xl pt-24 px-4 flex-grow text-black ${className}`}>
          <div>{children}</div>
        </main>

        <footer className="text-center py-4 bg-white">
          <Link href={'https://github.com/matveyGlush/go'} className="text-gray-600 text-sm underline">github&nbsp;matveyGlush</Link>
        </footer>
      </div>  
    </Suspense>
  );
}
