import { gameReducer, initialState } from "hooks/gameReducer"
import React, { useReducer } from "react"
import { GameState, squares } from "type/GameState"
import { Board } from "./Board"
import { Dropdown } from "./Dropdown"

export const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const sizeOptions = [
    { label: '3', value: 3 },
    { label: '5', value: 5 },
    { label: '7', value: 7 },
  ]

  const winner = calculateWinner(state.size, state.current)
  let status: string
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (state.xIsNext ? 'X' : 'O')
  }

  const handleSizeChange = (event: { target: { value: number }; }) => {
    const newSize = Number(event.target.value)
    dispatch({ type: 'CHANGE_GameBoardSize', payload: { history: state.history, current: state.current, step: state.stepNumber, size: newSize } })
  };

  const jumpTo = (step: number) => {
    dispatch({ type: 'RETURN_TO', payload: { step: step, history: state.history, current: state.current, size: (state.size) } })
  }

  const handleClick = (i: number) => {
    const currentHistory = state.history.slice(0, state.stepNumber + 1)
    const current = currentHistory[currentHistory.length - 1]
    const currentSquares = current.slice()
    if (calculateWinner(state.size, currentSquares) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = state.xIsNext ? 'X' : 'O'
    dispatch({ type: 'TURN_PASSED', payload: { history: currentHistory, current: currentSquares, step: currentHistory.length, size: state.size } })
  }

  const moves = state.history.map((square: squares, move: number) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start'

    return (
      <li key={move}>
        <button className="border-solid border border-black rounded px-0.5 py-0.25 mb-1" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const renderingBoard = (state: GameState): JSX.Element => {
    return (
      <Board
        squares={state.current}
        onClick={(i: number) => handleClick(i)}
        size={state.size}
      />)
  }

  return (
    <div className="flex flex-row">
      <div>
        {renderingBoard(state)}
      </div>
      <div className="ml-6">
        <div className="mb-1">{status}</div>
        <ol className="pl-5">{moves}</ol>
        <Dropdown
          label="Choose the size of Game Board!!"
          options={sizeOptions}
          value={state.size}
          onChange={handleSizeChange}
        />
        <div>Currently: {state.size}</div>
      </div>
    </div >
  )
}

const setWinningArray = (size: number): number[][] => {
  const winningArray: number[][] = []

  const rowWinning = [...Array(size)]
  rowWinning.map((_, row) => {
    return winningArray.push([...Array(size)].map((_, j) => size * row + j))
  })

  const columnWinning = [...Array(size)]
  columnWinning.map((_, column) => {
    return winningArray.push([...Array(size)].map((_, j) => size * j + column))
  })

  winningArray.push([...Array(size)].map((_, j) => (size + 1) * j))
  winningArray.push([...Array(size)].map((_, j) => (size - 1) * (j + 1)))

  return (winningArray)
}

const calculateWinner = (size: number, squares: squares) => {
  let lines: number[][] = setWinningArray(size)
  let testArray: number[] = Array(size)
  for (let i = 0; i < lines.length; i++) {
    testArray = lines[i]
    let winCount = 0
    for (let j = 1; j < testArray.length; j++) {
      if (squares[testArray[0]] && squares[testArray[0]] === squares[testArray[j]]) {
        winCount++
      }
    }

    if (winCount === size - 1) {
      return squares[testArray[0]]
    }
  }
  return null
}
