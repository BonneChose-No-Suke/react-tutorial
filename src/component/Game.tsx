import React from "react"
import { Board } from "./Board"

type squares = string[]

type GameProps = {
  size: number
}

const winnerOf3 = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [0, 4, 8],
                    [2, 4, 6],
                  ]

const winnerOf4 = [
                    [0, 1, 2, 3],
                    [4, 5, 6, 7],
                    [8, 9, 10, 11],
                    [12, 13, 14, 15],
                    [0, 4, 8, 12],
                    [1, 5, 9, 13],
                    [2, 6, 10, 14],
                    [3, 7, 11, 15],
                    [0, 5, 10, 15],
                    [3, 6, 9, 12],
                  ]

const winnerOf5 = [
                    [0, 1, 2, 3, 4],
                    [5, 6, 7, 8, 9],
                    [10, 11, 12, 13, 14],
                    [15, 16, 17, 18, 19],
                    [20, 21, 22, 23, 24],
                    [0, 5, 10, 15, 20],
                    [1, 6, 11, 16, 21],
                    [2, 7, 12, 17, 22],
                    [3, 8, 13, 18, 23],
                    [4, 9, 14, 19, 24],
                    [0, 6, 12, 18, 24],
                    [4, 8, 12, 16, 20],
                  ]

export const Game = (props: GameProps) => {
  const size = 5
  const squares: squares = Array(size^2).fill(null)
  const [history, setHistory] = React.useState<squares[]>([squares])
  const [stepNumber, setStepNumber] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true)
  const [current, setCurrent] = React.useState(squares)

  const winner = calculateWinner(size, current)
  let status: string
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(step % 2 === 0)
    setCurrent(history[step])
  }

  const handleClick = (i: number) => {
    const currentHistory = history.slice(0, stepNumber + 1)
    const current = currentHistory[currentHistory.length - 1]
    const currentSquares = current.slice()
    if (calculateWinner(props.size, currentSquares) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O'
    setHistory(currentHistory.concat([currentSquares]))
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
    setCurrent(currentSquares)
  }

    const moves = history.map((history, move: number)=> {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start'

        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current}
            onClick={(i: number) => handleClick(i)}
            size={size}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )

}

// ========================================
function calculateWinner(size:number, squares: squares) {
  let lines = [[0]]
  let testArray = [...Array(size)].map((_, i)=>i)
  switch(size) {
    case 3:
      lines = winnerOf3
      break
    case 4:
      lines = winnerOf4
      break
    case 5:
      lines = winnerOf5
      break
  }
  for (let i = 0; i < lines.length; i++) {
    testArray = lines[i]
    for (let j = 0; j < testArray.length; j++){
      if(squares[0] !== squares[j]) {
        break
      }
    }
    return squares[0]
  }
  return null
}
