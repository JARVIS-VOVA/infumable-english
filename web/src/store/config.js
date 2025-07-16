import { configureStore, isRejectedWithValue } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'

import showToastError from 'src/helpers/showToastError'
import { termsApi } from 'src/api/termsApi'
import { tagsApi } from 'src/api/tagsApi'
import { usersApi } from 'src/api/usersApi'

import sagas from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

const rtkQueryErrorLogger = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error('API Error:', action.payload)
    showToastError(action.payload)
  }
  return next(action);
}

export default configureStore({
  reducer: combineReducers({
    ...reducers,
    [termsApi.reducerPath]: termsApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(rtkQueryErrorLogger)
      .concat(termsApi.middleware)
      .concat(tagsApi.middleware)
      .concat(usersApi.middleware)
})

sagaMiddleware.run(sagas)
