import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string
  password: string
}

export default function LogIn() {

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
    fetch(`https://functions.yandexcloud.net/d4eo4pnc96oovfhiuc6s?name=${contactsData.name}`)
      .then((response) => response.json())
      .then((data) => {
        setSuccessMsg(data.success);
      })
      .catch((error) => console.log(error));
  }, [contactsData]);

  return (
    <>
      <h2 className="text-4xl font-bold mb-8">Вход</h2>
      <div className="p-8 mt-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
        {successMsg !== undefined ? (
          <h1 className="text-2xl font-bold">{successMsg}</h1>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label className="block text-left text-sm font-medium mb-1" htmlFor="name">
                Имя в игре или Почта
              </label>
              <input
                id="name"
                {...register("name", { required: true, maxLength: 40, minLength: 2 })}
                aria-invalid={errors.name ? "true" : "false"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.name?.type === "required" && <p className="absolute top-0 left-44 text-red-800 text-sm">Обязательное поле</p>}
              {errors.name?.type === "maxLength" && <p className="absolute top-0 left-44 text-red-800 text-sm">Не больше 40 символов</p>}
              {errors.name?.type === "minLength" && <p className="absolute top-0 left-44 text-red-800 text-sm">Не меньше 2 символов</p>}
            </div>

            <div className="relative mb-4">
              <label className="block text-left text-sm font-medium mb-1" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type='password'
                {...register("password", { required: true, maxLength: 40, minLength: 2 })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.password?.type === "required" && <p className="absolute top-0 left-44 text-red-800 text-sm">Обязательное поле</p>}
              {errors.password?.type === "maxLength" && <p className="absolute top-0 left-44 text-red-800 text-sm">Не больше 40 символов</p>}
              {errors.password?.type === "minLength" && <p className="absolute top-0 left-44 text-red-800 text-sm">Не меньше 2 символов</p>}
            </div>

            <CunstomButton
              type="submit"
              className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Отправить
            </CunstomButton>
          </form>
        )}
      </div>
    </>
  );
};