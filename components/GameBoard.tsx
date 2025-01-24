"use client"

import React from 'react';

interface CustomModalProps {
  size?: number,
}

type TableEl = React.JSX.Element[]

export default function GameBoard({ size = 9 }: CustomModalProps) {

  let cellSize = size === 9 
    ? 'cell-size-sm' 
    : 'cell-size-lg'

  function createGameBoardHtml(): TableEl {
    let rows: TableEl = []

    for(let i = 1; i <= size; i++) {
      let cols: TableEl = []
      for(let j = 1; j <= size; j++) {
        cols.push(
          <td 
          className={`inline-flex justify-center items-center ${cellSize} border border-gray-500`}
          key={i + ',' + j}
          >
            
          </td>)
      }
      rows.push(<tr key={i} className="leading-[0]">{cols}</tr>)
    }

    return rows
  }

  return (
    <table className="w-full h-full flex justify-center items-center border-collapse border border-gray-500">
      <tbody>
        { createGameBoardHtml() }
      </tbody>
    </table>
  );
};