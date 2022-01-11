import { combineReducers } from 'redux'

import { sessionReducer } from './session/reducer'
import { userReducer } from './user/reducer'

export const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>
