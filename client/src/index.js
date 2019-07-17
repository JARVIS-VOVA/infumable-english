import React from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import ReactDOM from 'react-dom'

import createRouter from './config/createRouter'
import configureStore from './config/createStore'

import Nav from './components/pages/Nav'
import SwitchRoute from './SwitchRoute'

import './assets/styles/app.scss'

const router = createRouter()
const store = configureStore(router)

const wrappedApp = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <>
        <Nav />
        <SwitchRoute />
      </>
    </RouterProvider>
  </Provider>
)

router.start((err, state) => {
  ReactDOM.render(wrappedApp, document.getElementById('root'))
})
