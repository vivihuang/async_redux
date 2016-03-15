import { combineReducers } from 'redux'

let selectedReddit = (state = 'book', action) => {
  switch (action.type) {
    case 'selectReddit':
      return action.data
    default:
      return state
  }
}

let fetchData = (state = [], action) => {
  switch (action.type) {
    case 'fetch':
      return {
        data: action.data,
        time: action.time
      }
    default:
      return {
        data: state,
        time: Date.now()
      }
  }
}

const rootReducer = combineReducers({
  selectedReddit,
  fetchData
})

export default rootReducer
