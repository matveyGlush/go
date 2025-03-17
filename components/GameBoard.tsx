"use client"

import { getGameInfo, makeMove } from '@/app/_lib/data';
import { Crossings } from '@/app/game/page';
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

  const [cross, setCross] = useState<Crossings | null>()
  const [boardInactive, setBoardInactive] = useState<boolean>(false)


  useEffect(() => {
    let isMounted = true;
    if (gameId && isMounted) {
      const token = localStorage.getItem('token')
  
      async function fetchData() {
        const data = await getGameInfo(token || '', Number(gameId));
        setCross(data[0].get_game_info.crossings || null);
      }
  
      fetchData(); // Initial fetch
    } else if (crossings) {
      setCross(crossings)
    }

    return () => {
      isMounted = false;
    };
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

  function createGameBoardHtml(): TableEl {
    let rows: TableEl = [];

    for (let i = 0; i < size; i++) {
      let cols: TableEl = [];
      for (let j = 0; j < size; j++) {
        cols.push(
          <td key={`${i},${j}`} className={`relative border-[3px] border-gray-600 ${gameSizes.cellSize}`}>
            <Rock gameSizes={gameSizes} coordinates={[i, j]}/>
          </td>
        );
      }
      rows.push(<tr key={i} className="leading-[0]">{cols}</tr>);
    }

    return rows;
  }

  useEffect(() => {
    cross?.forEach(cross => {
      let elem = document.getElementById(`${cross.x}${cross.y}`)
      if (cross.player_color === 'BLACK') elem?.classList.add(...['bg-white', 'shadow-md', 'shadow-zinc-400'])
      else elem?.classList.add(...['bg-slate-900'])

      let elemCircle = document.getElementById(`${cross.x}${cross.y}`)
      elemCircle?.classList.add(...['absolute', 'top-[25%]', 'left-[25%]', 'rounded-full', 'border-[1px]'])
    })
  }, [])

  function Rock({ gameSizes, coordinates }: { gameSizes: GameSizes, coordinates: [number, number] }) {
  
    function handleMove(x: number, y: number) {
      if (turn !== color) {
        alert('Not your turn')
        return
      }
      if (boardInactive) return

      const token = localStorage.getItem('token')
      async function fetchData() {
        setBoardInactive(true)

        let elem = document.getElementById(`${coordinates[0]}${coordinates[1]}`)
        if (color === 'BLACK') elem?.classList.add(...['bg-white', 'shadow-md', 'shadow-zinc-400'])
        else elem?.classList.add(...['bg-slate-900'])

        const data = await makeMove(token || '', playerId || 0, x, y);
        setBoardInactive(false)
      }
  
      fetchData(); // Initial fetch
    }
  
    return (
      <div 
        id={`${coordinates[0]}${coordinates[1]}`}
        className={`absolute rounded-full cursor-pointer
          ${gameSizes.rockSize} 
          ${gameSizes.rockPosition}`
        }
        onClick={() => {
          // console.log(isVisible)
          handleMove(coordinates[0], coordinates[1])
        }}
      >
          <span 
            id={`${coordinates[0]}+${coordinates[1]}`}
            className={`${gameSizes.circleSize} border-stone-400`}
          />
      </div>
    );
  }



  return (
    <table className={`relative game-table border-collapse translate-x-8 my-20 ${gameSizes.moveTable}`}>
      <tbody>
        {createGameBoardHtml()}
      </tbody>
    </table>
  );
}