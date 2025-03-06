"use client"

import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import Select from './SelectGameBoardSize';
import { useRouter } from 'next/navigation';

type Inputs = {
  gameId: number
  code: string
}

type SelectInputs = {
  boardSize: number
  invite: string
}

export default function FormFindGame() {

  const router = useRouter();

  const [contactsData, setContactsData] = useState<Inputs | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined);
  console.log(successMsg);

  const findGameForm = useForm<Inputs>();
  const findRandomForm = useForm<SelectInputs>();

  const onFindGameSubmit: SubmitHandler<Inputs> = (data) => {
    setContactsData({ ...data });
  };

  const onFindRandorSubmit: SubmitHandler<SelectInputs> = (data) => {
    router.push('/game')
  };

  useEffect(() => {
    if (!contactsData) return;
    fetch(`https://functions.yandexcloud.net/d4eo4pnc96oovfhiuc6s?name`)
      .then((response) => response.json())
      .then((data) => {
        setSuccessMsg(data.success);
      })
      .catch((error) => console.log(error));
  }, [contactsData]);

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Найти игру</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {successMsg !== undefined ? (
          <h1 className="text-2xl font-bold">{successMsg}</h1>
        ) : (
          <form onSubmit={findGameForm.handleSubmit(onFindGameSubmit)}>
            <div className="relative mb-4">
              <label className="block text-left text-sm font-medium mb-1" htmlFor="name">
                ID игры*
              </label>
              <input
                id="name"
                {...findGameForm.register("gameId", { required: true, maxLength: 40, minLength: 2 })}
                aria-invalid={findGameForm.formState.errors.gameId ? "true" : "false"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {findGameForm.formState.errors.gameId?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
              {findGameForm.formState.errors.gameId?.type === "maxLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
              {findGameForm.formState.errors.gameId?.type === "minLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
            </div>

            <div className="relative mb-4">
              <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
                Код для входа*
              </label>
              <input
                id="email"
                {...findGameForm.register("code", { required: true, maxLength: 40, minLength: 2 })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {findGameForm.formState.errors.code?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
              {findGameForm.formState.errors.code?.type === "maxLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
              {findGameForm.formState.errors.code?.type === "minLength" && <p className="absolute top-0 left-32 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
            </div>

            <CunstomButton
              type="submit"
              className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Подключиться
            </CunstomButton>
          </form>
        )}
      </div>
      <p className="p-4 w-full text-center">или</p>

      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={findRandomForm.handleSubmit(onFindRandorSubmit)}>
          <div className="relative mb-4">
            <Select label="Размер поля" {...findRandomForm.register("boardSize")} />
          </div>
          <CunstomButton
          theme='dark'
          type='submit'
          className=" w-full py-2 rounded-lg hover:bg-gray-800"
          >
            Случайный соперник
          </CunstomButton>
        </form>
      </div>
    </>
  );
};