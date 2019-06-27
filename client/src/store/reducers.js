import { reducer as form } from 'redux-form'

import loader from './loader/reducer'
import session from './session/reducer'
import user from './user/reducer'
import word from './word/reducer'

export default {
  form,
  loader,
  session,
  user,
  word,
}
