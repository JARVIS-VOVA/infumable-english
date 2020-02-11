import { takeLatest, call, put } from 'redux-saga/effects'

import Api from '../../lib/api'
import { resourceChangeStatus } from '../loader/actions'

import sessionActions from './actions'
import SESSION from './constants'

export default function* watcherSaga() {
  yield takeLatest(SESSION.CREATE_REQUEST, watchCreateRequest)
  yield takeLatest(SESSION.DELETE_REQUEST, watchDeleteRequest)
}

function* watchCreateRequest({ payload, meta }) {
  try {
    const response = yield call(Api.Session.create, payload)

    yield put(sessionActions.createSuccess(response.data, meta))
  } catch (error) {
    yield put(sessionActions.createFailure({}, error.response, meta))
  }
}

function* watchDeleteRequest({ payload, meta }) {
  try {
    const response = yield call(Api.Session.destroy)

    yield put(sessionActions.deleteSuccess(payload, meta))
  } catch (error) {
    yield put(sessionActions.deleteFailure(payload, meta))
  }
}
