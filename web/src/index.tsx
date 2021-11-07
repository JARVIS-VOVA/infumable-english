import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './ts/store'
import TsApp from './ts/TsApp'

ReactDOM.render(
  <Provider store={ store }>
    <TsApp />
  </Provider>,
  document.getElementById('root')
);
