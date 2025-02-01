"use client"

import React from 'react';

interface CustomModalProps {
  size?: number,
}

type TableEl = React.JSX.Element[]

export default function GameBoard({ size = 9 }: CustomModalProps) {

  let color: string = 'white' 
  
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
  }

  function createGameBoardHtml(): TableEl {
    let rows: TableEl = []

    for(let i = 0; i < size; i++) {
      let cols: TableEl = []
      for(let j = 0; j < size; j++) {
        color = j % 2 === 0 ? 'white' : 'black'
        cols.push(
          <td 
          className={
            `relative border-[3px] border-gray-600 
            ${gameSizes.cellSize}`
          }
          key={i + ',' + j}
          >
            <div className={
              `absolute rounded-full
              ${color === 'black' ? 'bg-slate-900': 'bg-white shadow-xl'} 
              ${gameSizes.rockSize} 
              ${gameSizes.rockPosition}`
            }>
              <span className={
                `absolute top-[25%] left-[25%] rounded-full border-[1px]
                ${gameSizes.circleSize} 
                ${color === 'black' ? 'border-stone-400': 'border-stone-400'}`
              }/>
            </div>
          </td>)
      }
      rows.push(<tr key={i} className="leading-[0]">{cols}</tr>)
    }

    return rows
  }

  return (
    <table className={
      `relative game-table border-collapse translate-x-8 my-20 
      ${gameSizes.moveTable}`
    }>
      <tbody>
        { createGameBoardHtml() }
      </tbody>
    </table>
  );
};