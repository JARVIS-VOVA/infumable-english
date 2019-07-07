import { reducer as form } from 'redux-form'

import loader from './loader/reducer'
import session from './session/reducer'
import user from './user/reducer'

export default {
  form,
  loader,
  session,
  user
}
