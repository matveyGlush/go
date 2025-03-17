"use client"

import React from 'react';
import CustomLink from './CustomLink';

export default function GameResult({message}: {message: string}) {
  return (
    <>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <div>
          <h2 className='text-lg mb-5'>{message}</h2>
          <CustomLink
            href='/'
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            На главную страницу
          </CustomLink>
        </div>
      </div>
    </>
  );
};