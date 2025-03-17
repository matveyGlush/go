"use client"

import React from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import Select from './SelectGameBoardSize';
import { useRouter } from 'next/navigation';
import { createNewGame, joinCreatedGame, sendInvite } from '@/app/_lib/data';

type Inputs = {
  boardSize: number
  nickname: string
  timeLimit: number
  color: 'BLACK' | 'WHITE'
  invite?: string
}

export default function FormCreateGame() {

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const token = localStorage.getItem('token')
  
    async function fetchData() {
      const gameId = await createNewGame(token || '', data.boardSize, data.timeLimit, data.nickname, data.color);
      // const gameId = JSON.stringify(response);
      if (gameId[0].create_new_game.status !== 'success') alert(`Ошибка. ${gameId[0].create_new_game.message}`)

      if (data.invite) {
        const inviteData = await sendInvite(token || '', data.invite, gameId[0].create_new_game.game_id, 600)
        // const inviteData = await JSON.parse(inviteResponse)
        if (inviteData[0].send_invite.status !== 'success') {
          alert(`Ошибка. ${inviteData[0].send_invite.message}`)
          return
        }
      }

      // const creation = await joinCreatedGame(token || '', gameId[0].create_new_game.game_id, data.nickname);
      if (gameId[0].create_new_game.status === 'success')
        router.push(`/game?id=${gameId[0].create_new_game.game_id}`)
      else alert(`Ошибка. ${gameId[0].create_new_game.message}`)
    }

    fetchData();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Новая игра</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <Select label="Размер поля" {...register("boardSize")} />
          </div>

          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
              Пригласить
              <span className='block text-xs'>*оставьте пустым для подбора случайного соперника*</span>
            </label>
            <input
              id="email"
              {...register("invite", { maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              placeholder='Email соперника'
            />
            {errors.invite?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не больше&nbsp;40&nbsp;символов</p>}
            {errors.invite?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="nickname">
              Игровое имя (только на эту игру)
            </label>
            <input
              id="nickname"
              {...register("nickname", { maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.nickname?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {errors.nickname?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не больше&nbsp;40&nbsp;символов</p>}
            {errors.nickname?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="timeLimit">
              Время на один ход (в секундах)
            </label>
            <input
              id="timeLimit"
              type='number'
              {...register("timeLimit", { maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.timeLimit?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {errors.timeLimit?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не больше&nbsp;40&nbsp;символов</p>}
            {errors.timeLimit?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <Select label="Выберите цвет камней" isColor={true} {...register("color")} />
          </div>

          <CunstomButton
            type="submit"
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Создать игру
          </CunstomButton>
        </form>
      </div>
    </>
  );
};