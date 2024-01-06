import { combineReducers } from 'redux'

import currentUser from './currentUser/reducer'
import loader from './loader/reducer'
import session from './session/reducer'
import user from './user/reducer'

export default combineReducers({
  currentUser,
  loader,
  session,
  user,
})
