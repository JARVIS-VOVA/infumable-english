import { reducer as form } from 'redux-form'

import session from './session/reducer'
import user from './user/reducer'

export default {
  form,
  session,
  user
}
