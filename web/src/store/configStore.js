import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { middleware as sagaThunkMiddleware } from 'redux-saga-thunk'

import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  applyMiddleware(
    createLogger({ diff: true, collapsed: true }),
    sagaThunkMiddleware,
    sagaMiddleware,
  )
)

sagaMiddleware.run(sagas)

export default store
