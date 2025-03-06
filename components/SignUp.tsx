import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { redirect } from 'next/navigation';
import { registerUser } from '@/app/_lib/data';
import LoadingSpinner from './LoadingSpinner';

type Inputs = {
  email: string
  password: string
  repeat: string
}

export default function SignUp() {

  const [registerData, setRegisterData] = useState<Inputs | null>(null);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setRegisterData({ ...data });
  };

  useEffect(() => {
    async function fetchLogin(email: string, password: string) {
      setIsFetching(true)
      const result = await registerUser(email, password)
      console.log(result)

      if (result[0].message === 'Registration successful') {
        localStorage.setItem('token', result[0].token)
        setMessage(result[0].message)
        redirect(`/`) 
      } else {
        setMessage(result[0].message)
        setIsFetching(false)
      }
    }

    if (!registerData) return;
    else fetchLogin(registerData.email, registerData.password)

    return () => {
      setIsFetching(false)
    }
  }, [registerData]);

  return (
    <>
      <h2 className="text-4xl font-bold mb-8 mt-8">Регистрация</h2>
      <div className="md:p-8 p-4 mt-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {message !== undefined && <h1 className="text-2xl font-bold">{message}</h1>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
              Почта
            </label>
            <input
              id="email"
              {...register("email", { required: true, maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.email?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {errors.email?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
            {errors.email?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="password">
              Придумайте пароль
            </label>
            <input
              id="password"
              type='password'
              {...register("password", { required: true, maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.password?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {errors.password?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не&nbsp;больше&nbsp;40&nbsp;символов</p>}
            {errors.password?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не&nbsp;меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <div className="relative mb-4">
            <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
              Повторите пароль
            </label>
            <input
              id="repeat"
              type='password'
              {...register("repeat", { required: true, maxLength: 40, minLength: 2 })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
            />
            {errors.email?.type === "required" && <p className="absolute top-0 left-36 text-red-800 text-sm">Обязательное&nbsp;поле</p>}
            {errors.email?.type === "maxLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не больше&nbsp;40&nbsp;символов</p>}
            {errors.email?.type === "minLength" && <p className="absolute top-0 left-36 text-red-800 text-sm">Не меньше&nbsp;2&nbsp;символов</p>}
          </div>

          <CunstomButton
            type="submit"
            className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            {isFetching ? <LoadingSpinner/> : 'Отправить'}
          </CunstomButton>
        </form>
      </div>
    </>
  );
};