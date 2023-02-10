export type squares = string[]

export type GameState = {
  history: squares[]
  stepNumber: number
  xIsNext: boolean
  current: squares
}

export type GameAction = {
  type: 'TURN_PASSED' | 'RETURN_TO'
  payload: {
    history: squares[]
    current: squares
    step: number
  }
}