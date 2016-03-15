import { combineReducers } from 'redux'

let selectedReddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case 'selectReddit':
      return action.data
    default:
      return state
  }
}

let fetchData = (state=[], action) => {
  switch (action.type) {
    case 'fetch':
      return action.data
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedReddit,
  fetchData
})

export default rootReducer