"use client"

import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import { useRouter } from 'next/navigation'

type Inputs = {
  boardSize: number
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

export default function FormSingleGame() {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/game?single=true&size=${data.boardSize}`)
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Одиночная игра</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <Select label="Размер поля" {...register("boardSize")} />
          </div>
          <CunstomButton
            type="submit"
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Играть
          </CunstomButton>
        </form>
      </div>
    </>
  );
};