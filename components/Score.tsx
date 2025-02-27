'use client'

import React, { useState } from 'react';

export default function Score() {

  return (
    <div className='w-full flex flex-col items-center mt-10'>
      <div className='w-7/12 flex justify-between mb-2'>
        <span>your name</span>
        <span>234 points</span>
      </div>
      <span className='relative w-full border-b-2 border-slate-900 score-underline'></span>
      <div className='w-7/12 flex justify-between mt-2'>
        <span>opponent</span>
        <span>231 points</span>
      </div>
    </div>
  );
};