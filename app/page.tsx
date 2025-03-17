"use client"

import CustomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import CustomLink from '@/components/CustomLink';
import FormCreateGame from '@/components/FormCreateGame';
import FormFindGame from '@/components/FormFindGame';
import FormReportError from '@/components/FormReportError';
import FormSingleGame from '@/components/FormSingleGame';
import GameBoard from '@/components/GameBoard';
import Modal from '@/components/Modal';
import Rules from '@/components/Rules';
import Head from 'next/head';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useAuthToken } from './_lib/utils';
import LoadingSpinner from '@/components/LoadingSpinner';
import { declineInvite, getUserInfo } from './_lib/data';
import FormNickname from '@/components/FormNickname';

interface Player {
  email: string;
  color: string;
  score: number;
}

interface Game {
  game_id: number;
  board_size: number;
  status: string;
  players: Player[];
}

interface Invite {
  game_id: number;
  sender_email: string;
  recipient_email: string;
  time_left: number;
}

interface UserResponse {
  email: string;
  games: Game[];
  invites: Invite[];
}

export default function Page() {

  let isAuth = useAuthToken();

  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);

  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    const token = localStorage.getItem('token')
    
    async function fetchData() {
      const userData = await getUserInfo(token || '');
      // const gameId = JSON.stringify(response);
      if (userData[0].get_user_info.error) {
        return
      }
      setUserInfo(userData[0].get_user_info)
    }

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    }
  }, [isAuth])

  function handleDecline(from: string, to: string) {
    async function fetchData() {
      declineInvite(from, to)
    }

    fetchData(); // Initial fetch
  }

  const [showCreateGameModal, setShowCreateGameModal] = useState(false)
  const [showFindGameModal, setShowFindGameModal] = useState(false)
  const [showReportErrorModal, setShowReportErrorModal] = useState(false)
  const [showSingleGameModal, setShowSingleGameModal] = useState(false)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showGameBoardModal, setShowGameBoardModal] = useState(false)
  const [showNicknameModal, setShowNicknameModal] = useState(false)


  return (
    <Suspense>
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
          {isAuth === 'fetching' ? 
          <LoadingSpinner/> :
          (isAuth === 'in') && <CustomButton 
            className="max-w-44 mt-3 mb-6 px-7 py-3"
            onClickFunc={() => isAuth === 'in' ? setShowFindGameModal(!showFindGameModal) : router.push('/auth')}
          >
            Найти игру
          </CustomButton> 
          }
          {isAuth === 'in' &&
          <CustomButton 
            className="max-w-44 mt-3 mb-6 px-7 py-3" 
            onClickFunc={() => isAuth === 'in' ? setShowCreateGameModal(!showCreateGameModal) : router.push('/auth')}
          >
            Создать новую
          </CustomButton>
          }
          {/* {isAuth === 'in' && 
          <CustomButton 
            className="max-w-48 mt-3 mb-6 px-7 py-3" theme='dark'
            onClickFunc={() => isAuth === 'in' ? setShowSingleGameModal(!showSingleGameModal) : router.push('/auth')}
          >
            Одиночная игра
          </CustomButton>
          } */}
        </div>        
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Список приглашений</h2>
          {isAuth === 'fetching' && <LoadingSpinner/>}
          {isAuth === 'in' ? 
          <ul className="grid grid-cols-1 gap-4 w-full">
            {userInfo?.invites ? userInfo?.invites.map((item) => (
              <li key={item.game_id} className="p-3 text-center flex md:flex-row flex-col items-center justify-evenly bg-white shadow-md rounded-lg max-w-sm md:max-w-xl w-full mx-auto">
                <h3 className="text-xl font-semibold mb-2">{item.sender_email}</h3>
                <div>
                  <CustomButton 
                  onClickFunc={() => setShowNicknameModal(true)} 
                  className="max-w-40 my-2 text-center mr-3" theme='dark'
                  >Принять</CustomButton>
                  <CustomButton 
                  onClickFunc={() => handleDecline(item.recipient_email, item.sender_email)} 
                  className="max-w-40 my-2 text-center bg-red-800 text-white px-5 py-1"
                  >Отклонить</CustomButton>
                </div>

                <Modal showModal={showNicknameModal} showModalFunc={setShowNicknameModal}>
                  <FormNickname gameId={item.game_id}/>
                </Modal>
              </li>
            )) : <p>Тут будут ваши приглашения от других игроков</p>}
          </ul> :
          <p>Тут будут ваши приглашения от других игроков после входа в аккаунт или регистрации! </p>
          }
          
        </div>

        <div className="mb-5 text-center">
          <h2 className="text-2xl font-bold mb-6">Список прошлых игр</h2>
          {isAuth === 'fetching' && <LoadingSpinner/>}
          {isAuth === 'in' ? 
          <ul className="grid grid-cols-1 gap-4 w-full">
            {userInfo?.games ? userInfo?.games.map((item) => (
              <li key={item.game_id} className="p-3 text-center flex md:flex-row flex-col items-center justify-evenly bg-white shadow-md rounded-lg max-w-sm md:max-w-xl w-full mx-auto">
                <h3 className="text-sm font-semibold mb-2">VS {item.players[0]?.email !== userInfo.email ? item.players[0]?.email : item.players[1]?.email}</h3>
                <p className="max-w-xs text-sm text-center">{item.board_size}</p>
                <p className="max-w-xs text-sm text-center">{item.status}</p>
                <CustomButton 
                onClickFunc={() => {
                  router.push(pathname + `?gameToCheck=${item.game_id}`)
                  setShowGameBoardModal(!showGameBoardModal)
                }} 
                className="max-w-46 my-2 text-center" theme='dark'
                >Посмотреть доску</CustomButton>
              </li>
            )) : <p>Тут будет история ваших игр</p>}
          </ul> :
          <p>Тут будет история ваших игр после входа в аккаунт или регистрации! </p>
          }
        </div>

        <div className="bg-gray-100 py-16 rounded-lg text-center">
          <h3 className="text-2xl font-bold">Поможем чем сможем</h3>
          <CustomButton onClickFunc={() => setShowRulesModal(!showRulesModal)} className="w-52 mx-auto mt-3" theme='dark'>Правила</CustomButton>
          <CustomLink href="https://go-game.ru/sg/" className="max-w-52 mx-auto mt-3" theme='dark'>Частые вопросы</CustomLink>
          <CustomButton onClickFunc={() => isAuth ? setShowReportErrorModal(!showReportErrorModal) : router.push('/auth')} className="w-52 mx-auto mt-3" theme='dark'>Сообщить об ошибке</CustomButton>
        </div>
      </CustomLayout>
      <Modal showModal={showCreateGameModal} showModalFunc={setShowCreateGameModal}>
        <FormCreateGame/>
      </Modal>
      <Modal showModal={showFindGameModal} showModalFunc={setShowFindGameModal}>
        <FormFindGame/>
      </Modal>
      <Modal showModal={showSingleGameModal} showModalFunc={setShowSingleGameModal}>
        <FormSingleGame/>
      </Modal>
      <Modal showModal={showReportErrorModal} showModalFunc={setShowReportErrorModal}>
        <FormReportError/>
      </Modal>
      <Modal showModal={showRulesModal} showModalFunc={setShowRulesModal}>
        <Rules/>
      </Modal>
      <Modal showModal={showGameBoardModal} showModalFunc={setShowGameBoardModal}>
        {showGameBoardModal && <GameBoard/>}
      </Modal>
    </Suspense>
  );
}
