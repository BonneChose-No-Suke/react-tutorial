import React from "react"
import { Board } from "./Board"

type squares = string[]

type GameProps = {
  size: number
}

export const Game = (props: GameProps) => {
  const squares: squares = Array(props.size^2).fill(null)
  const [history, setHistory] = React.useState<squares[]>([squares])
  const [stepNumber, setStepNumber] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true)
  const [current, setCurrent] = React.useState(squares)

  const winner = calculateWinner(props.size, current)
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
            size={props.size}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )

}

// サイズを入力して勝利条件を設定する
// mapを使ってsetWinningArrayをrefactoringする
const setWinningArray = (size: number):number[][] => {
  const winningArray: number[][] = []
  // 横方向の勝利条件
  const rowWinning = [...Array(size)].map((_, row) => {
    return winningArray.push([...Array(size)].map((_, j) => size*row + j))
  })

  // 縦方向の勝利条件
  const columnWinning = [...Array(size)].map((_, column) => {
    return winningArray.push([...Array(size)].map((_, j) => size*j + column))
  })

  // 斜め方向の勝利
  winningArray.push([...Array(size)].map((_, j)=> (size+1)*j))
  winningArray.push([...Array(size)].map((_, j)=> (size-1)*(j+1)))

  return(winningArray)
}

// ========================================
const  calculateWinner = (size:number, squares: squares) => {
  let lines: number[][] = setWinningArray(size)
  let testArray: number[] = Array(size)
  for(let i = 0; i < lines.length; i ++) {
    testArray = lines[i]
    let winCount = 0
    for(let j = 1; j < testArray.length; j ++) {
      if(squares[testArray[0]] && squares[testArray[0]] === squares[testArray[j]]) {
        winCount++
      }
    }

    if(winCount === size - 1) {
      return squares[testArray[0]]
    }
  }
  return null
}
