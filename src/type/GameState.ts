type squares = string[]

export type GameState = {
  history: squares[]
  stepNumber: number
  xIsNext: boolean
  current: squares
}