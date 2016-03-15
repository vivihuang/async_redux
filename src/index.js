import 'babel-polyfill'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import appStore from './stores/appStore'

ReactDom.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
)
