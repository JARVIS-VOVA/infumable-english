import 'regenerator-runtime/runtime'
import { fork, all } from 'redux-saga/effects'

import sessionWatcherSaga from './session/sagas'
import userWatcherSaga from './user/sagas'
import wordWatcherSaga from './word/sagas'

export default function* rootWatcherSaga() {
  yield all([
    fork(sessionWatcherSaga),
    fork(userWatcherSaga),
    fork(wordWatcherSaga),
  ])
}

