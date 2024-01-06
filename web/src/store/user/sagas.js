import { takeLatest, call, put } from 'redux-saga/effects'

import Api from 'src/helpers/api'

import { userActions } from 'src/store/actions'
import USER from './constants'

export default function* watcherSaga() {
  // yield takeLatest(USER.CREATE_REQUEST, watchCreateRequest)
}

// function* watchCreateRequest({ payload }) {
//   try {
//     const response = yield call(Api.User.create, payload)
//     yield put(userActions.createSuccess(response.data))
//   } catch (error) {
//     yield put(userActions.createFailed())
//   }
// }
