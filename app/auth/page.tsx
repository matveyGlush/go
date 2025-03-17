"use client"

import CunstomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import LogIn from '@/components/LogIn';
import SignUp from '@/components/SignUp';
import Head from 'next/head';
import { Suspense, useState } from 'react';

export default function Auth() {

  const [isAuth, setIsAuth] = useState(true)

  return (
    <Suspense>
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <CustomLayout>
        <div className="pb-7 text-center">
          {isAuth ? <LogIn/> : <SignUp/>}
        </div>
        <CunstomButton 
          onClickFunc={() => setIsAuth(!isAuth)}
          className="flex py-2 px-4 text-xs mx-auto"
          theme='dark'
        >
          {isAuth ? "Нет аккаунта? Зарегистрируйтесь!" : "Уже есть аккаунт? Войдите!"}
        </CunstomButton>
      </CustomLayout>
    </Suspense>
  );
}
