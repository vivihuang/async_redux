import request from 'superagent'
import prefix from 'superagent-prefix'

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
    return request.get('/api/' + type)
      .use(prefix)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }
        dispatch(receiveRedditData(res.body))
      })
  }
}

export const addNewData = (selectedType, text) => {
  console.log('here')
  return (dispatch) => {
    request.post('/api/' + selectedType)
      .send({title: text})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
        }
      })
    return dispatch(fetchRedditData(selectedType))
  }
}
