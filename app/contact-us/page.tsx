"use client"

import CunstomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  name: string
  email: string
  message: string
}

export default function ContactPage() {
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
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <CustomLayout>
        <div className="py-12 text-center">
          <h2 className="text-4xl font-bold mb-8">Only CTA on the page</h2>
          <div className="p-8 mt-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
            {successMsg !== undefined ? (
              <h1 className="text-2xl font-bold">{successMsg}</h1>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-left text-sm font-medium mb-1" htmlFor="name">
                    Name
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
                    Email
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

                <div>
                  <label className="block text-left text-sm font-medium mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                    rows={4}
                  ></textarea>
                </div>

                <CunstomButton
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Submit
                </CunstomButton>
              </form>
            )}
          </div>
        </div>
      </CustomLayout>
    </>
  );
}
