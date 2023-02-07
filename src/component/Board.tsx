import React from "react"
import { Square } from "./Square"

type BoardProps = {
  onClick: (i: number) => void,
  squares: string[],
  size: number
}

export const Board = (props: BoardProps) => {

  const rowArray = Array(props.size)
  const columnArray = Array(props.size)

  // const renderSquare = (index: number) => {
  //   return(
  //     <Square
  //       value={props.squares[index]}
  //       onClick={()=> props.onClick(index)}
  //     />
  //   )
  // }

  // ボードの列とスクエアをloopを回すかmapを使って反復することで生成する

  const squareGenerate = (index: number) => {
    columnArray.map(num=>{
      return(
        <Square
          value={props.squares[props.size*index + num]}
          onClick={()=> props.onClick(props.size*index + num)}
        />
      )
    })
  }

  return (
    // <div>
    //   <div className="board-row">
    //     {renderSquare(0)}
    //     {renderSquare(1)}
    //     {renderSquare(2)}
    //   </div>
    //   <div className="board-row">
    //     {renderSquare(3)}
    //     {renderSquare(4)}
    //     {renderSquare(5)}
    //   </div>
    //   <div className="board-row">
    //     {renderSquare(6)}
    //     {renderSquare(7)}
    //     {renderSquare(8)}
    //   </div>
    // </div>
      rowArray.map(num=> {
        <div className="board-row">
          {squareGenerate(num)}
        </div>
      })
  )
}