import { combineReducers } from 'redux'

import currentUser from './currentUser/reducer'
import loader from './loader/reducer'
import session from './session/reducer'
import user from './user/reducer'
import tag from './tag/reducer'
import term from './term/reducer'

export default combineReducers({
  currentUser,
  loader,
  session,
  user,
  tag,
  term,
})
