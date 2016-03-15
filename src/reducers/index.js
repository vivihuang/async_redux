const rootReducer = (state=[], action) => {
  switch (action.type) {
    case 'fetch':
      return action.data
    default:
      return state
  }
}

export default rootReducer