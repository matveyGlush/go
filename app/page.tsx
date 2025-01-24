"use client"

import CustomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import CustomLink from '@/components/CustomLink';
import FormCreateGame from '@/components/FormCreateGame';
import FormFindGame from '@/components/FormFindGame';
import Modal from '@/components/Modal';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
  const results = [
    {
      opponent: 'Игрок id 1',
      date: '23.10.2024',
      state: 'victory',
      gameId: '0'
    },
    {
      opponent: 'Игрок id 2',
      date: '23.10.2024',
      state: 'lose',
      gameId: '1'
    },
    {
      opponent: 'Игрок id 3',
      date: '23.10.2024',
      state: 'pair',
      gameId: '2'
    },
    {
      opponent: 'Игрок id 4',
      date: '23.10.2024',
      state: 'pair',
      gameId: '3'
    },
    {
      opponent: 'Игрок id 5',
      date: '23.10.2024',
      state: 'lose',
      gameId: '4'
    },
    {
      opponent: 'Игрок id 6',
      date: '23.10.2024',
      state: 'victory',
      gameId: '5'
    },
    {
      opponent: 'Игрок id 7',
      date: '23.10.2024',
      state: 'victory',
      gameId: '6'
    },
    {
      opponent: 'Игрок id 8',
      date: '23.10.2024',
      state: 'victory',
      gameId: '7'
    },
  ]

  const [showCreateGameModal, setShowCreateGameModal] = useState(false)
  const [showFindGameModal, setShowFindGameModal] = useState(false)


  return (
    <>
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <CustomLayout>
        <div className="py-8 text-center bg-gray-100 rounded-lg mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-6">
            <div className="mb-3 px-3">
              <h1 className="text-2xl font-bold mb-4 md:text-4xl">Игра&nbsp;Го&nbsp;&mdash;&nbsp;Искусство стратегии&nbsp;и&nbsp;гармонии</h1>
              <p className="text-lg max-w-md mx-auto">Постигайте древнюю игру&nbsp;Го: развивайте мышление, захватывая территории на&nbsp;игровом поле.</p>
            </div>
            <div className="flex justify-center align-middle rounded-lg overflow-hidden">
              <Image src={'/rocks.png'} width={200} height={100} className='h-fit' alt="Игровые камни"/>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 md:gap-10 mb-10">
          <CustomButton 
            className="max-w-44 mt-3 mb-6 px-7 py-3" theme='dark'
            onClickFunc={() => setShowFindGameModal(!showFindGameModal)}
          >
            Найти игру
          </CustomButton>
          <CustomButton 
            className="max-w-44 mt-3 mb-6 px-7 py-3" 
            onClickFunc={() => setShowCreateGameModal(!showCreateGameModal)}
          >
            Создать новую
          </CustomButton>
        </div>

        <div className="mb-5 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-6">Список ваших игр</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
            {results.map((item) => (
              <div key={item.gameId} className="p-4 text-center flex flex-col items-center bg-white shadow-md rounded-lg max-w-sm w-full">
                <h3 className="text-xl font-semibold mb-2">{item.opponent}</h3>
                <p className="max-w-xs text-center">{item.date}</p>
                <p className="max-w-xs text-center">{item.state}</p>
                <CustomButton className="max-w-46 my-2 text-center" theme='dark'>Посмотреть доску</CustomButton>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 py-16 rounded-lg text-center">
          <h3 className="text-2xl font-bold">Поможем чем сможем</h3>
          <CustomLink href="contact-us" className="max-w-52 mx-auto mt-3" theme='dark'>Правила игры</CustomLink>
          <CustomLink href="contact-us" className="max-w-52 mx-auto mt-3" theme='dark'>Частые вопросы</CustomLink>
          <CustomLink href="contact-us" className="max-w-52 mx-auto mt-3" theme='dark'>Сообщить об ошибке</CustomLink>
        </div>
      </CustomLayout>
      <Modal showModal={showCreateGameModal} showModalFunc={setShowCreateGameModal}>
        <FormCreateGame/>
      </Modal>
      <Modal showModal={showFindGameModal} showModalFunc={setShowFindGameModal}>
        <FormFindGame/>
      </Modal>
    </>
  );
}
