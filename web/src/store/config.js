import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),

  // applyMiddleware(
  //   // createLogger({ diff: true, collapsed: true }),
  //   sagaMiddleware,
  // )
})

sagaMiddleware.run(sagas)


// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { createLogger } from 'redux-logger'
// import createSagaMiddleware from 'redux-saga'

// import reducers from 'src/storereducers'
// import rootWatcherSaga from 'src/storesagas'

// export default (router, initialState = {}) => {
//   const sagaMiddleware = createSagaMiddleware()

//   const createStoreWithMiddleware = applyMiddleware(
//     createLogger({ diff: true, collapsed: true }),
//     sagaMiddleware
//   )(createStore)

//   const store = createStoreWithMiddleware(
//     combineReducers({
//       ...reducers
//     }),
//     initialState
//   )

//   sagaMiddleware.run(rootWatcherSaga)

//   window.store = store

//   return store
// }
