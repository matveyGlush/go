'use client'

import { CurrTurn } from '@/app/game/page';
import React, { useState } from 'react';

type Player = {
  player_id: number,
  nickname: string,
  color: 'WHITE' | 'BLACK',
  is_caller: boolean,
}

export default function Score({ player1, player2, curr, time} : { player1: any, player2: any, curr?: CurrTurn, time: number }) {

  return (
    <div className='w-full flex flex-col items-center mt-10'>
      <span>Сейчас ходят {curr?.color === 'BLACK' ? 'черные' : 'белые'}</span>
      <span>Осталось секунд на ход: {time}</span>
      <div className='w-7/12 flex justify-between mb-2'>
        <span>{player1?.nickname}</span>
        <span>{player1?.color}</span>
      </div>
      <span className='relative w-full border-b-2 border-slate-900 score-underline'></span>
      <div className='w-7/12 flex justify-between mt-2'>
        <span>{player2?.nickname}</span>
        <span>{player2?.color}</span>
      </div>
    </div>
  );
};