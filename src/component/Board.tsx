import React from "react"
import { Square } from "./Square"

type BoardProps = {
  onClick: (i: number) => void,
  squares: string[],
  size: number
}

export const Board = (props: BoardProps) => {

  const rowArray = [...Array(props.size)].map((_, i) => i)
  const columnArray = [...Array(props.size)].map((_, i) => i)

  const board = rowArray.map(row=> {
    return(
      <div
        key={row}
        className="board-row">
        {columnArray.map(column=> {
          return(
            <Square
              key={column}
              value={props.squares[props.size*row + column]}
              onClick={()=>props.onClick(props.size*row + column)}
            />
          )
        })}
      </div>
    )
  })

  return (
    <div>
      {board}
    </div>
  )
}