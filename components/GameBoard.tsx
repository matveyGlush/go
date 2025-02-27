"use client"

import React, { useState } from 'react';

interface CustomModalProps {
  size?: number;
}

type TableEl = React.JSX.Element[];
type GameSizes = {
  cellSize: string;
  rockSize: string;
  rockPosition: string;
  moveTable: string;
  circleSize: string;
}

export default function GameBoard({ size = 9 }: CustomModalProps) {
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
            <Rock gameSizes={gameSizes} />
          </td>
        );
      }
      rows.push(<tr key={i} className="leading-[0]">{cols}</tr>);
    }

    return rows;
  }

  return (
    <table className={`relative game-table border-collapse translate-x-8 my-20 ${gameSizes.moveTable}`}>
      <tbody>
        {createGameBoardHtml()}
      </tbody>
    </table>
  );
}

function Rock({ gameSizes }: { gameSizes: GameSizes }) {
  const [isVisible, setIsVisible] = useState(false);
  const [color, setColor] = useState(false)

  return (
    <div 
      className={`absolute rounded-full cursor-pointer
        ${isVisible ? (color ? 'bg-slate-900' : 'bg-white shadow-md shadow-zinc-400') : 'bg-transparent'}
        ${gameSizes.rockSize} 
        ${gameSizes.rockPosition}`
      }
      onClick={() => {
        console.log(isVisible)
        setColor(!color)
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