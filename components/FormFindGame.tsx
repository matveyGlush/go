"use client"

import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from './SelectGameBoardSize';
import { useRouter } from 'next/navigation';
import { findGamesWithoutInvite, joinCreatedGame } from '@/app/_lib/data';
import LoadingSpinner from './LoadingSpinner';

type Inputs = {
  boardSize: number
  nickname: string
}

export default function FormFindGame() {

  const router = useRouter();
  const findGameForm = useForm<Inputs>();
  const [isLoading, setIsLoadind] = useState(false)

  const onFindGameSubmit: SubmitHandler<Inputs> = (data) => {
    const token = localStorage.getItem('token')
  
    async function fetchData() {
      const allGames = await findGamesWithoutInvite(token || '');
      for (let i = 0; i < allGames[0].find_games_without_invite.available_games.length; i++) {
        console.log(allGames[0].find_games_without_invite.available_games[i].board_size == data.boardSize)
        if (allGames[0].find_games_without_invite.available_games[i].board_size == data.boardSize) {
          await joinCreatedGame(token || '', allGames[0].find_games_without_invite.available_games[i].game_id, data.nickname);
          router.push(`/game?id=${allGames[0].find_games_without_invite.available_games[i].game_id}`)
          return
        } else alert("Нет подходящих игр! Поменяйте размер поля или попробуйте позже.")
      }
    }

    fetchData();
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Найти игру</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={findGameForm.handleSubmit(onFindGameSubmit)}>
          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="nickname">
              Игровое имя (только на эту игру)*
            </label>
            <input
              id="nickname"
              {...findGameForm.register("nickname", { required: true, maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {findGameForm.formState.errors.nickname?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {findGameForm.formState.errors.nickname?.type === "maxLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
            {findGameForm.formState.errors.nickname?.type === "minLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <Select label="Размер поля" {...findGameForm.register("boardSize")} />
          </div>

          <CunstomButton
            type="submit"
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClickFunc={() => setIsLoadind(true)}
          >
            {isLoading ? <LoadingSpinner/> : 'Случайный соперник'}
          </CunstomButton>
        </form>
      </div>
    </>
  );
};