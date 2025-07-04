import 'regenerator-runtime/runtime'
import { fork, all } from 'redux-saga/effects'

import currentUserWatcherSaga from './currentUser/sagas'

export default function* rootWatcherSaga() {
  yield all([
    fork(currentUserWatcherSaga),
  ])
}

