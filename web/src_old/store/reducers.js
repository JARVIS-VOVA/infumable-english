import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import { reducer as thunkReducer } from 'redux-saga-thunk'

import loader from './loader/reducer'
import session from './session/reducer'
import user from './user/reducer'
import currentUser from './currentUser/reducer'

const history = createBrowserHistory()

export default combineReducers({
  thunk: thunkReducer,
  router: connectRouter(history),
  loader,
  session,
  currentUser,
  user,
})
