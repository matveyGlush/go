"use client"

import { getGameInfo, makeMove } from '@/app/_lib/data';
import { Crossings } from '@/app/game/page';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface CustomModalProps {
  size?: number;
  crossings?: Crossings;
  gameId?: number
  playerId?: number;
  color?: string;
  turn?: string
}

type TableEl = React.JSX.Element[];
type GameSizes = {
  cellSize: string;
  rockSize: string;
  rockPosition: string;
  moveTable: string;
  circleSize: string;
}

export default function GameBoard({ size = 9, crossings = [{player_color: "BLACK", x: 2, y: 5}], gameId, playerId, color, turn }: CustomModalProps) {

  const searchParams = useSearchParams()
  const gameToCheck = searchParams.get('gameToCheck')



  const [cross, setCross] = useState<Crossings | null>()
  const [boardInactive, setBoardInactive] = useState<boolean>(false)


  useEffect(() => {
    if (gameToCheck) {
      const token = localStorage.getItem('token')
  
      async function fetchData() {
        const data = await getGameInfo(token || '', Number(gameToCheck));
        console.log(data)
        setCross(data[0].get_game_info.crossings || null);
      }
  
      fetchData(); // Initial fetch
    } else if (crossings) {
      setCross(crossings)
    }
  }, [])

  const gameSizes = size === 9 ? {
    cellSize: 'cell-size-sm',
    rockSize: 'rock-size-sm',
    rockPosition: 'rock-position-sm',
    moveTable: 'move-table-right-sm',
    circleSize: 'circle-size-sm',
  } : {
    cellSize: 'cell-size-lg',
    rockSize: 'rock-size-lg',
    rockPosition: 'rock-position-lg',
    moveTable: 'move-table-right-lg',
    circleSize: 'circle-size-lg',
  };

  function checkForStone(x: number, y: number): React.JSX.Element {
    console.log('in checkForStone' + (cross === null) + (cross === undefined))
    cross?.forEach(crossing => {
      if(crossing.x == x && crossing.y == y) {
        console.log('found coordinate')
        return (
          <Rock gameSizes={gameSizes} coordinates={[x, y]} color={crossing.player_color} argIsVisible={true}/>
        )
      }
    })
    return (
      <Rock gameSizes={gameSizes} coordinates={[x, y]}/>
    )
  }

  function createGameBoardHtml(): TableEl {
    if (!cross) {
      console.log('trouble')
    }
    let rows: TableEl = [];

    for (let i = 0; i < size; i++) {
      let cols: TableEl = [];
      for (let j = 0; j < size; j++) {
        cols.push(
          <td key={`${i},${j}`} className={`relative border-[3px] border-gray-600 ${gameSizes.cellSize}`}>
            {checkForStone(i, j)}
          </td>
        );
      }
      rows.push(<tr key={i} className="leading-[0]">{cols}</tr>);
    }

    return rows;
  }

  function Rock({ gameSizes, coordinates, argIsVisible }: { gameSizes: GameSizes, coordinates: [number, number], argIsVisible?: boolean, color?: 'BLACK' | 'WHITE'}) {
    const [isVisible, setIsVisible] = useState<boolean>(false)
  
    function handleMove(x: number, y: number) {
      if (turn !== color) {
        alert('Not your turn')
        return
      }
      if (boardInactive) return

      const token = localStorage.getItem('token')
      async function fetchData() {
        setBoardInactive(true)

        setIsVisible(true)

        const data = await makeMove(token || '', playerId || 0, x, y);
        setBoardInactive(false)
      }
  
      fetchData(); // Initial fetch
    }

    useEffect(() => {
      if (argIsVisible) setIsVisible(true)
    }, [])
  
    return (
      <div 
        className={`absolute rounded-full cursor-pointer
          ${isVisible ? (color === 'BLACK' ? 'bg-slate-900' : 'bg-white shadow-md shadow-zinc-400') : 'bg-transparent'}
          ${gameSizes.rockSize} 
          ${gameSizes.rockPosition}`
        }
        onClick={() => {
          console.log(isVisible)
          handleMove(coordinates[0], coordinates[1])
          if (!isVisible) setIsVisible(true)
        }}
      >
        {isVisible && (
          <span 
            className={`absolute top-[25%] left-[25%] rounded-full border-[1px]
              ${gameSizes.circleSize} border-stone-400`}
          />
        )}
      </div>
    );
  }

  return (
    <table className={`relative game-table border-collapse translate-x-8 my-20 ${gameSizes.moveTable}`}>
      <tbody>
        {cross && createGameBoardHtml()}
      </tbody>
    </table>
  );
}