import 'regenerator-runtime/runtime'
import { fork, all } from 'redux-saga/effects'

import sessionWatcherSaga from './session/sagas'

export default function* rootWatcherSaga() {
  yield all([
    fork(sessionWatcherSaga),
  ])
}

