import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from 'Src/store'
import App from 'Src/App'

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
