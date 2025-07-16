import { takeLatest, call, put } from 'redux-saga/effects'
import _ from 'lodash'

import Api from 'src/helpers/api'
import { currentUserActions, loaderActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'

import CURRENT_USER from './constants'

export default function* watcherSaga() {
  yield takeLatest(CURRENT_USER.GET_REQUEST, watchGetRequest)
}

function* watchGetRequest() {
  try {
    yield put(loaderActions.changeStatus({ status: true }))
    const response = yield call(Api.CurrentUser.show)
    yield put(currentUserActions.getSuccess(response.data))
  } catch (error) {
    yield put(currentUserActions.getFailed())
    showToastError(error.response)
  } finally {
    yield put(loaderActions.changeStatus({ status: false }))
  }
}
