"use client"

import CustomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import CustomLink from '@/components/CustomLink';
import FormCreateGame from '@/components/FormCreateGame';
import FormFindGame from '@/components/FormFindGame';
import FormReportError from '@/components/FormReportError';
import Modal from '@/components/Modal';
import Rules from '@/components/Rules';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

export default function Page() {
  const results = [
    {
      opponent: 'username1',
      date: '23.10.2024',
      state: 'victory',
      gameId: '0'
    },
    {
      opponent: 'username2',
      date: '23.10.2024',
      state: 'lose',
      gameId: '1'
    },
    {
      opponent: 'username3',
      date: '23.10.2024',
      state: 'pair',
      gameId: '2'
    },
    {
      opponent: 'username4',
      date: '23.10.2024',
      state: 'pair',
      gameId: '3'
    },
    {
      opponent: 'username5',
      date: '23.10.2024',
      state: 'lose',
      gameId: '4'
    },
    {
      opponent: 'username6',
      date: '23.10.2024',
      state: 'victory',
      gameId: '5'
    },
    {
      opponent: 'username7',
      date: '23.10.2024',
      state: 'victory',
      gameId: '6'
    },
    {
      opponent: 'username8',
      date: '23.10.2024',
      state: 'victory',
      gameId: '7'
    },
  ]

  const [showCreateGameModal, setShowCreateGameModal] = useState(false)
  const [showFindGameModal, setShowFindGameModal] = useState(false)
  const [showReportErrorModal, setShowReportErrorModal] = useState(false)
  const [showRulesModal, setRulesModal] = useState(false)

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

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 mb-10">
          <CustomButton 
            className="max-w-44 mt-3 mb-6 px-7 py-3"
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

          <CustomButton 
            className="max-w-48 mt-3 mb-6 px-7 py-3" theme='dark'
            onClickFunc={() => setShowCreateGameModal(!showCreateGameModal)}
          >
            Одиночная игра
          </CustomButton>
        </div>

        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold mb-6">Список ваших игр</h2>
          <ul className="grid grid-cols-1 gap-4 w-full">
            {results.map((item) => (
              <li key={item.gameId} className="p-3 text-center flex md:flex-row flex-col items-center justify-evenly bg-white shadow-md rounded-lg max-w-sm md:max-w-xl w-full mx-auto">
                <h3 className="text-xl font-semibold mb-2">vs {item.opponent}</h3>
                <p className="max-w-xs text-center">{item.date}</p>
                <p className="max-w-xs text-center">{item.state}</p>
                <CustomButton className="max-w-46 my-2 text-center" theme='dark'>Посмотреть доску</CustomButton>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 py-16 rounded-lg text-center">
          <h3 className="text-2xl font-bold">Поможем чем сможем</h3>
          <CustomButton onClickFunc={() => setRulesModal(!showRulesModal)} className="max-w-52 mx-auto mt-3" theme='dark'>Сообщить об ошибке</CustomButton>
          <CustomLink href="https://go-game.ru/sg/" className="max-w-52 mx-auto mt-3" theme='dark'>Частые вопросы</CustomLink>
          <CustomButton onClickFunc={() => setShowReportErrorModal(!showReportErrorModal)} className="max-w-52 mx-auto mt-3" theme='dark'>Сообщить об ошибке</CustomButton>
        </div>
      </CustomLayout>
      <Modal showModal={showCreateGameModal} showModalFunc={setShowCreateGameModal}>
        <FormCreateGame/>
      </Modal>
      <Modal showModal={showFindGameModal} showModalFunc={setShowFindGameModal}>
        <FormFindGame/>
      </Modal>
      <Modal showModal={showReportErrorModal} showModalFunc={setShowReportErrorModal}>
        <FormReportError/>
      </Modal>
      <Modal showModal={showRulesModal} showModalFunc={setRulesModal}>
        <Rules/>
      </Modal>
    </>
  );
}
