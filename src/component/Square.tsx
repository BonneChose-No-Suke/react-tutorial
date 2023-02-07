import React from "react"

type SquareProps = {
  onClick: () => void,
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