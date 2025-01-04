import React, { useEffect, useState } from 'react';
import CunstomButton from '@/components/CustomButton';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  name: string
  email: string
  message: string
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
    fetch(`https://functions.yandexcloud.net/d4eo4pnc96oovfhiuc6s?name=${contactsData.name}&email=${contactsData.email}&message=${contactsData.message}`)
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-left text-sm font-medium mb-1" htmlFor="name">
                Почта или номер телефона
              </label>
              <input
                id="name"
                {...register("name", { required: true, maxLength: 40, minLength: 2 })}
                aria-invalid={errors.name ? "true" : "false"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.name?.type === "required" && <p className="text-red-500 text-sm">This field is required</p>}
              {errors.name?.type === "maxLength" && <p className="text-red-500 text-sm">Name must be less than 40 characters</p>}
              {errors.name?.type === "minLength" && <p className="text-red-500 text-sm">Name must be at least 2 characters</p>}
            </div>

            <div>
              <label className="block text-left text-sm font-medium mb-1" htmlFor="email">
                Пароль
              </label>
              <input
                id="email"
                {...register("email", { required: true, maxLength: 40, minLength: 2 })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
              {errors.email?.type === "required" && <p className="text-red-500 text-sm">This field is required</p>}
              {errors.email?.type === "maxLength" && <p className="text-red-500 text-sm">Email must be less than 40 characters</p>}
              {errors.email?.type === "minLength" && <p className="text-red-500 text-sm">Email must be at least 2 characters</p>}
            </div>

            <CunstomButton
              type="submit"
              className="mt-20 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Submit
            </CunstomButton>
          </form>
        )}
      </div>
    </>
  );
};