import { takeLatest, call, put } from 'redux-saga/effects'

import Api from 'src/helpers/api'
import { currentUserActions, sessionActions, loaderActions } from 'src/store/actions'

import SESSION from './constants'

export default function* watcherSaga() {
  // yield takeLatest(SESSION.CREATE_REQUEST, watchCreateRequest)
  // yield takeLatest(SESSION.DELETE_REQUEST, watchDeleteRequest)
}

// function* watchCreateRequest({ payload }) {
//   try {
//     yield put(loaderActions.changeStatus({ status: true }))
//     const response = yield call(Api.Session.create, payload)
//     yield put(sessionActions.createSuccess(response.data))
//     yield put(loaderActions.changeStatus({ status: false }))
//   } catch (error) {
//     yield put(sessionActions.createFailed())
//     yield put(loaderActions.changeStatus({ status: false }))
//   }
// }

// function* watchDeleteRequest() {
//   try {
//     yield put(loaderActions.changeStatus({ status: true }))
//     yield call(Api.Session.destroy)
//     yield put(sessionActions.deleteSuccess())
//     yield put(currentUserActions.logout())
//     yield put(loaderActions.changeStatus({ status: false }))
//   } catch (error) {
//     yield put(sessionActions.deleteFailed())
//     yield put(loaderActions.changeStatus({ status: false }))
//   }
// }
