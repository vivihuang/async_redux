import fetch from 'isomorphic-fetch'

let receiveRedditData = (jsonData) => {
  return {
    type: 'fetch',
    data: jsonData,
    time: Date.now()
  }
}

export const fetchRedditData = (value) => {
  return (dispatch) => {
    return fetch(`https://www.reddit.com/r/${value}.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receiveRedditData(json)))
  }
}
