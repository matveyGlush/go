"use client"

import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from './SelectGameBoardSize';
import { useRouter } from 'next/navigation';
import { findGamesWithoutInvite, joinCreatedGame } from '@/app/_lib/data';

type Inputs = {
  nickname: string
}

export default function FormNickname({gameId}: {gameId: number}) {

  const router = useRouter();
  const nicknameForm = useForm<Inputs>();

  const onFindGameSubmit: SubmitHandler<Inputs> = (data) => {
    const token = localStorage.getItem('token')
  
    async function fetchData() {
      const userData = await joinCreatedGame(token || '', gameId, data.nickname);
      router.push(`/game?id=${gameId}`)
    }

    fetchData(); // Initial fetch
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Принять приглашение</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={nicknameForm.handleSubmit(onFindGameSubmit)}>
          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="nickname">
              Игровое имя (только на эту игру)*
            </label>
            <input
              id="nickname"
              {...nicknameForm.register("nickname", { required: true, maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {nicknameForm.formState.errors.nickname?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {nicknameForm.formState.errors.nickname?.type === "maxLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
            {nicknameForm.formState.errors.nickname?.type === "minLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <CunstomButton
            type="submit"
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Войти в игру
          </CunstomButton>
        </form>
      </div>
    </>
  );
};