import { GameAction, GameState } from '../type/GameState'

export const initialState: GameState =  {
  history: [Array(5**2).fill(null)],
  stepNumber: 0,
  xIsNext: true,
  current:  Array(5**2).fill(null)
}

export const gameReducer = (state: GameState, action: GameAction):GameState => {
  switch(action.type) {
    case 'TURN_PASSED':
      return {
        ...state,
        history: action.payload.history.concat([action.payload.current]),
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
        current: action.payload.current
      }
    case 'RETURN_TO':
      return {
        ...state,
        history: state.history,
        stepNumber: action.payload.step,
        xIsNext: (action.payload.step) % 2 === 0,
        current:  state.history[action.payload.step]
      }
    default:
      return state
  }
}

