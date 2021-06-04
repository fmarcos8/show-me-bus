import { createStore } from 'redux'

const INITIAL_STATE = {
  busPositions: [],
  shapes: []
}

function rootReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case 'SET_SHAPES':
      return {...state, shapes: [...state.shapes, action.data]}
    case 'SET_BUS_POSITIONS':
      return {...state, busPositions: [...state.busPositions, action.data]}
    default:
      return state;
  }
}

const store = createStore(rootReducer)

export default store