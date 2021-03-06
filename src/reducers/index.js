import { combineReducers } from 'redux'
import _ from 'lodash'
import { routerReducer } from 'react-router-redux'

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
        data: _.isEmpty(state) ? state : state.data,
        time: Date.now()
      }
  }
}

const rootReducer = combineReducers({
  selectedReddit,
  fetchData,
  routing: routerReducer
})

export default rootReducer
