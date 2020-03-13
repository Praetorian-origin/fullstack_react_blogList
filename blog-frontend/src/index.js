
import React from 'react'

import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import PromisePolyfill from 'promise-polyfill'

if (!window.Promise) {
  window.Promise = PromisePolyfill
}


ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')

)