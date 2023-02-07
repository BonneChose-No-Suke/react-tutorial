import React from "react"

type SquareProps = {
  onClick: any,
  value: string
}

export const Square = (props: SquareProps) => {
  return (
    <button
      className="square"
      onClick={props.onClick!}
    >
      {props.value}
    </button>
  )
}