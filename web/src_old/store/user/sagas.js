import { takeLatest, call, put } from 'redux-saga/effects'

import Api from '../../lib/api'

import userActions from './actions'
import USER from './constants'

export default function* watcherSaga() {
  yield takeLatest(USER.CREATE_REQUEST, watchCreateRequest)
}

function* watchCreateRequest({ payload, meta }) {
  try {
    const response = yield call(Api.User.create, payload)
    yield put(userActions.createSuccess(response.data, meta))
  } catch (error) {
    yield put(userActions.createFailure(error.response, meta))
  }
}
