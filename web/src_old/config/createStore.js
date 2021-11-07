import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { middleware as thunkMiddleware } from 'redux-saga-thunk'

import reducers from '../store/reducers'
import rootWatcherSaga from '../store/sagas'

export default (router, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const createStoreWithMiddleware = applyMiddleware(
    createLogger({ diff: true, collapsed: true }),
    thunkMiddleware,
    sagaMiddleware
  )(createStore)

  const store = createStoreWithMiddleware(
    combineReducers({
      ...reducers
    }),
    initialState
  )

  sagaMiddleware.run(rootWatcherSaga)

  window.store = store

  return store
}
