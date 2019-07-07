import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import ReactDOM from 'react-dom'

import router from './config/createRouter'
import configureStore from './config/createStore'

import App from './App'

import './assets/styles/app.scss'

const store = configureStore(router)

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
)

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById('root'))
})
