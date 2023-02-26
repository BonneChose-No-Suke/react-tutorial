export type squares = string[]

export type GameState = {
  size: number
  history: squares[]
  stepNumber: number
  xIsNext: boolean
  current: squares
}

export type GameAction = {
  type: 'TURN_PASSED' | 'RETURN_TO' | 'CHANGE_GameBoardSize'
  payload: { history: squares[]; current: squares; step: number; size: number }
}