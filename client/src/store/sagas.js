import 'regenerator-runtime/runtime'
import { fork, all } from 'redux-saga/effects'

import sessionWatcherSaga from './session/sagas'
import userWatcherSaga from './user/sagas'

export default function* rootWatcherSaga() {
  yield all([
    fork(sessionWatcherSaga),
    fork(userWatcherSaga)
  ])
}

