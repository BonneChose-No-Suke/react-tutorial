import { gameReducer, initialState } from "hooks/gameReducer"
import React, { useReducer } from "react"
import { squares } from "type/GameState"
import { Board } from "./Board"

export const Game = () => {
  const size = 5
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const winner = calculateWinner(size, state.current)
  let status: string
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O')
  }

  const jumpTo = (step: number) => {
    dispatch({ type: 'RETURN_TO', payload: {step: step, history: state.history, current: state.current} })
  }

  const handleClick = (i: number) => {
    const currentHistory = state.history.slice(0, state.stepNumber + 1)
    const current = currentHistory[currentHistory.length - 1]
    const currentSquares = current.slice()
    if (calculateWinner(size, currentSquares) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = state.xIsNext ? 'X' : 'O'
    dispatch({ type: 'TURN_PASSED', payload: {history: currentHistory, current: currentSquares, step: currentHistory.length}})
  }

    const moves = state.history.map((square:squares, move: number)=> {
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
            squares={state.current}
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

// サイズを入力して勝利条件を設定する
const setWinningArray = (size: number): number[][] => {
  let rowWinning: number[][] = []
  for(let i = 0; i < size; i++) {
    let rowWinningArray = [...Array(size)].map((_, j)=> size*i+j)
    rowWinning.push(rowWinningArray)
  }

  let columnWinning: number[][] = []
  for(let i = 0; i < size; i++) {
    let columnWinningArray = [...Array(size)].map((_, j)=> size*j+i)
    columnWinning.push(columnWinningArray)
  }

  let crossWinning:number[][] = []
  crossWinning.push([...Array(size)].map((_, i)=> (size+1)*i))
  crossWinning.push([...Array(size)].map((_, i)=> (size-1)*(i+1)))

  let winningArray = rowWinning.concat(columnWinning, crossWinning)
  return(winningArray)
}

// ========================================
// 
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
