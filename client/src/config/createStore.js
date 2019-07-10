import { createStore, applyMiddleware, combineReducers } from 'redux'
import { router5Middleware, router5Reducer } from 'redux-router5'
import { createLogger } from 'redux-logger'

import reducers from '../store/reducers'

export default (router, initialState = {}) => {
  const createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router),
    createLogger({ diff: true, collapsed: true })
  )(createStore)

  const store = createStoreWithMiddleware(
    combineReducers({
      router: router5Reducer,
      ...reducers
    }),
    initialState
  )

  window.store = store

  return store
}
