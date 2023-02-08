import React from "react"
import { Board } from "./Board"

type squares = string[]

export const Game = () => {
  const size:number = 5
  const squares: squares = Array(size^2).fill(null)
  const [history, setHistory] = React.useState<squares[]>([squares])
  const [stepNumber, setStepNumber] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true)
  const [current, setCurrent] = React.useState(squares)

  const winner = calculateWinner(current)
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
    if (calculateWinner(currentSquares) || currentSquares[i]) {
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
function calculateWinner(squares: squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}