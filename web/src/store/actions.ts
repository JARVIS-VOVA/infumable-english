import * as SessionActionCreators from './session/actions'
import * as UserActionCreators from './user/actions'

export default {
  ...SessionActionCreators,
  ...UserActionCreators,
} 
