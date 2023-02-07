import React from "react"
import { Square } from "./Square"

type BoardProps = {
  onClick: (i: number) => void,
  squares: string[],
  size: number
}

export const Board = (props: BoardProps) => {

  const renderSquare = (index: number) => {
    return(
      <Square
        value={props.squares[index]}
        onClick={()=> props.onClick(index)}
      />
    )
  }

  // ボードの列とスクエアをloopを回すかmapを使って反復することで生成する

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}