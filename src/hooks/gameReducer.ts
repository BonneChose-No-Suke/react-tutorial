import { GameAction, GameState } from '../type/GameState'

export const initialState: GameState =  {
  size: 3,
  history: [Array(3**2).fill(null)],
  stepNumber: 0,
  xIsNext: true,
  current:  Array(3**2).fill(null)
}

export const gameReducer = (state: GameState, action: GameAction):GameState => {
  switch(action.type) {
    case 'TURN_PASSED':
      return {
        ...state,
        size: state.size,
        history: action.payload.history.concat([action.payload.current]),
        stepNumber: state.history.length,
        xIsNext: !state.xIsNext,
        current: action.payload.current
      }
    case 'RETURN_TO':
      return {
        ...state,
        size: state.size,
        history: state.history,
        stepNumber: action.payload.step,
        xIsNext: (action.payload.step) % 2 === 0,
        current:  state.history[action.payload.step]
      }
    case 'CHANGE_GameBoardSize':
      return {
        ...state,
        size: action.payload.size,
        history: [Array((action.payload.size)**2).fill(null)],
        stepNumber: 0,
        xIsNext: true,
        current: Array((action.payload.size)**2).fill(null)
      }
    default:
      return state
  }
}

