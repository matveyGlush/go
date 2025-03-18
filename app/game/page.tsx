'use client'

import {Suspense} from "react";

import { useState, useEffect } from "react";
import CustomLayout from "@/components/CustomLayout";
import GameBoard from "@/components/GameBoard";
import { getGameInfo, makeMove } from "../_lib/data";
import GameHelp from "@/components/GameHelp";
import Score from "@/components/Score";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";
import GameResult from "@/components/GameResult";
import CustomButton from "@/components/CustomButton";

export type Crossings = {
  player_color: 'WHITE' | 'BLACK',
  x: number,
  y: number
} []

type Player = {
  player_id: number,
  nickname: string,
  color: 'WHITE' | 'BLACK',
  is_caller: boolean,
}

export type CurrTurn = {
  player_id: number,
  color: 'WHITE' | 'BLACK',
  time_left: number,
}

type GameInfo = {
  status: string,
  board_size: number,
  players: Player[],
  crossings: Crossings,
  current_turn: CurrTurn,
  time_left: number
} | null

export default function Game() {
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  const [gameInfo, setGameInfo] = useState<GameInfo>(null);

  const searchParams = useSearchParams()
  const gameId = searchParams.get('id')

  const token = localStorage.getItem('token')

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      console.log('crossings in game page')
      console.log(gameInfo?.crossings)
      const data = await getGameInfo(token || '', Number(gameId));
      if (isMounted) {
        setGameInfo(data[0].get_game_info || null);
      }
    }

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const tempColor = gameInfo?.players[0].is_caller ? gameInfo?.players[0].color : gameInfo?.players[1]?.color;
    switch (gameInfo?.status) {
      case 'WHITE WIN': 
        tempColor === 'WHITE' ? setResultMessage('ПОБЕДА!') : setResultMessage('поражение.')
        setShowResultModal(true);
        break;
      case 'BLACK WIN': 
        tempColor === 'BLACK' ? setResultMessage('ПОБЕДА!') : setResultMessage('поражение.')
        setShowResultModal(true);
        break;
      case 'TIE': 
        setResultMessage('ничья!!!!!!')
        setShowResultModal(true);
        break;
      default:
        setShowResultModal(false)
    }
  }, [gameInfo])

  return (
    <Suspense>
      <CustomLayout className="flex justify-center items-center overflow-hidden">
        <CustomButton className="py-2 px-4 mx-auto" onClickFunc={() => 
          makeMove(
            token || '', 
            gameInfo?.players[0].is_caller ? gameInfo?.players[0].player_id : gameInfo?.players[1]?.player_id || 0,
            -1,
            -1
          )}>
          Пропустить ход
        </CustomButton>
        {gameInfo && <Score player1={gameInfo.players[0]} player2={gameInfo.players[1]} curr={gameInfo?.current_turn} time={gameInfo.time_left}/>}
        {gameInfo && <GameBoard 
        crossings={gameInfo?.crossings} 
        playerId={gameInfo?.players[0].is_caller ? gameInfo?.players[0].player_id : gameInfo?.players[1]?.player_id} 
        color={gameInfo?.players[0].is_caller ? gameInfo?.players[0].color : gameInfo?.players[1]?.color} 
        turn={gameInfo?.current_turn.color}
        />}
        <GameHelp />
      </CustomLayout>
      <Modal showModal={showResultModal} showModalFunc={setShowResultModal}>
        <GameResult message={resultMessage}/>
      </Modal>
    </Suspense>
  );
}