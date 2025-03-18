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

export default function GameBoard({ size = 9, crossings = [], playerId, color, turn }: CustomModalProps) {

  const searchParams = useSearchParams()
  const gameToCheck = searchParams.get('gameToCheck')

  const [cross, setCross] = useState<Crossings | null>()
  const [boardInactive, setBoardInactive] = useState<boolean>(false)


  useEffect(() => {
    if (gameToCheck) {
      const token = localStorage.getItem('token')
  
      async function fetchData() {
        const data = await getGameInfo(token || '', Number(gameToCheck));
        setCross(data[0].get_game_info.crossings || null);
      }
      console.log('fetching in use eff by game to check from url')
      fetchData(); // Initial fetch
    } else if (crossings) {
      console.log('crossings from arg')
      console.log(crossings)
      setCross(crossings)
    }
  }, [crossings])

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
    console.log(cross)
    if (cross) {
      for (let i = 0; i < cross?.length; i++) {
        if(cross[i].x == x && cross[i].y == y) {
          console.log('found coordinate' + x + '.' + cross[i].x + ';' + y + '.' + cross[i].y)
          return (
            <Rock gameSizes={gameSizes} coordinates={[x, y]} stoneColor={cross[i].player_color} argIsVisible={true}/>
          )
        }
      }
    }
    console.log('retunr empty')
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

  function Rock({ gameSizes, coordinates, argIsVisible, stoneColor }: { gameSizes: GameSizes, coordinates: [number, number], argIsVisible?: boolean, stoneColor?: 'BLACK' | 'WHITE'}) {
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
      if (argIsVisible) {
        console.log('setting is visible!')
        setIsVisible(true)
      }
    }, [])
  
    return (
      <div 
        className={`absolute rounded-full cursor-pointer
          ${isVisible ? (stoneColor === 'BLACK' ? 'bg-slate-900' : 'bg-white shadow-md shadow-zinc-400') : 'bg-transparent'}
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
    <table className={`relative game-table border-collapse translate-x-8 mt-10 mb-20 ${gameSizes.moveTable}`}>
      <tbody>
        {cross && createGameBoardHtml()}
      </tbody>
    </table>
  );
}