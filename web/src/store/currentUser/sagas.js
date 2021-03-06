import { takeLatest, call, put } from 'redux-saga/effects'

import Api from '../../lib/api'

import currentUserActions from './actions'
import CURRENT_USER from './constants'

export default function* watcherSaga() {
  yield takeLatest(CURRENT_USER.GET_REQUEST, watchGetRequest)
}

function* watchGetRequest({ meta }) {
  try {
    // yield put(resourceChangeStatus({ status: true }))

    console.log('response', response)
    const response = yield call(Api.CurrentUser.show)
    console.log('response', response)

    // yield put(resourceChangeStatus({ status: false }))
    yield put(currentUserActions.getSuccess(response.data, meta))
  } catch (error) {
    // yield put(resourceChangeStatus({ status: false }))

    // I як його отримати error в контейнері???
    console.log('sage', error.response)

    yield put(currentUserActions.getFailure('error.response', meta))
  }
}

