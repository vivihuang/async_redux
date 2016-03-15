import request from 'superagent'
import prefix from 'superagent-prefix'

let receiveRedditData = (data) => {
  return {
    type: 'fetch',
    data: data,
    time: Date.now()
  }
}

export const fetchRedditData = (value) => {
  return (dispatch) => {
    return request.get('/api/' + value)
      .use(prefix)
      .end((err, res) => {
        if (err) {
          return console.error(err)
        }
        dispatch(receiveRedditData(res.body))
      })
  }
}
