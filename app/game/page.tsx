"use client"

import CustomLayout from '@/components/CustomLayout';
import GameBoard from '@/components/GameBoard';
import Head from 'next/head';

export default function Game() {

  return (
    <>
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <CustomLayout className='flex justify-center items-center overflow-hidden'>
        <GameBoard/>
      </CustomLayout>
    </>
  );
}
