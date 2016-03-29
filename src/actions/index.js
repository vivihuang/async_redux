import fetch from 'isomorphic-fetch'

let receiveRedditData = (data) => {
  return {
    type: 'fetch',
    data: data,
    time: Date.now()
  }
}

export const selectType = (data) => {
  return {
    type: 'selectReddit',
    data
  }
}

export const fetchRedditData = (type) => {
  return (dispatch) => {
    return fetch('/api/list?type=' + type)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error('Bad response from server')
        }
        return res.json()
      })
      .then((data) => {
        dispatch(receiveRedditData(data))
      })
  }
}

export const addNewData = (selectedType, text) => {
  return (dispatch) => {
    return fetch('/api/list?type=' + selectedType, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: text
      })
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server')
      }
      return res.json()
    })
    .then((data) => {
      dispatch(fetchRedditData(data.kind))
    })
  }
}

export const deleteData = (selectedType, id) => {
  return (dispatch) => {
    return fetch('/api/list?type=' + selectedType, {
      method: 'delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server')
      }
      return res.json()
    })
    .then((data) => {
      dispatch(fetchRedditData(data.kind))
    })
  }
}

export const modifyData = (selectedType, id, text) => {
  return (dispatch) => {
    return fetch('/api/list?type=' + selectedType, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        title: text
      })
    })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server')
      }
      return res.json()
    })
    .then((data) => {
      dispatch(fetchRedditData(data.kind))
    })
  }
}
