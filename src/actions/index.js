import fetch from 'isomorphic-fetch'

const receiveRedditData = (jsonData) => {
  return {
    type: 'fetch',
    data: jsonData
  }
}

export const fetchRedditData = () => {
  return (dispatch) => {
    return fetch(`https://www.reddit.com/r/reactjs.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveRedditData(json)))
  }
}