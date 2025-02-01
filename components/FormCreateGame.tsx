"use client"

import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';

type Inputs = {
  boardSize: number
  invite: string
}

interface IFormValues {
  boardSize: number
}

const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label className="mb-1 text-sm font-medium block">{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="9">9 (рекомендуемое)</option>
      <option value="19">19</option>
    </select>
  </>
))

export default function FormCreateGame() {

  const [contactsData, setContactsData] = useState<Inputs | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | undefined>(undefined);
  console.log(successMsg);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setContactsData({ ...data });
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
      <h2 className="text-4xl font-bold mb-8">Новая игра</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {successMsg !== undefined ? (
          <h1 className="text-2xl font-bold">{successMsg}</h1>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <Select label="Размер поля" {...register("boardSize")} />
            </div>

            <div className="relative mb-4">
              <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
                Пригласить
              </label>
              <input
                id="email"
                {...register("invite", { maxLength: 40, minLength: 2 })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder='Игровое имя соперника'
              />
              <span className="inline-block text-xs w-full text-center">*Оставьте пустым для подбора случайного соперника</span>
              {errors.invite?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не больше&nbsp;40&nbsp;символов</p>}
              {errors.invite?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не меньше&nbsp;2&nbsp;символов</p>}
            </div>

            <CunstomButton
              type="submit"
              className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Создать игру
            </CunstomButton>
          </form>
        )}
      </div>
    </>
  );
};