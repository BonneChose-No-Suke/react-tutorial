import { GameState } from '../type/GameState'

export const initialState: GameState =  {
  history: [Array(3**2).fill(null)],
  stepNumber: 0,
  xIsNext: true,
  current:  Array(3**2).fill(null)
}

export const gameReducer = (state: GameState, action: any):any => {
  switch(action.type) {
    case 'TURN_PASSED':
      return {
        ...state,
        history: (action.payload.currentHistory).concat([action.payload.currentSquares]),
        stepNumber: (action.payload.currentHistory).length,
        xIsNext: !(action.payload.xIsNext),
        current: action.payload.currentSquares
      }
    case 'RETURN_TO':
      return {
        ...state,
        history: action.payload.history,
        stepNumber: action.payload.stepNumber,
        xIsNext: (action.payload.step) % 2 === 0,
        current:  action.payload.history[action.payload.stepNumber]
      }
  }
}

