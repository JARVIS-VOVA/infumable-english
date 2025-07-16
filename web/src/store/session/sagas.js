import { takeLatest, call, put } from 'redux-saga/effects'
import _ from 'lodash'

import Api from 'src/helpers/api'
import { sessionActions, loaderActions, currentUserActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'

import SESSION from './constants'

export default function* watcherSaga() {
  yield takeLatest(SESSION.CREATE_REQUEST, watchCreateRequest)
  yield takeLatest(SESSION.GET_REQUEST, watchGetRequest)
  yield takeLatest(SESSION.DELETE_REQUEST, watchDeleteRequest)
}

function* watchCreateRequest({ payload }) {
  try {
    yield put(loaderActions.changeStatus({ status: true }))
    const response = yield call(Api.Session.create, { session: payload })
    yield put(sessionActions.createSuccess())
    // await checkAuthQuery()
    // navigate(ROUTES.terms)
  } catch (error) {
    yield put(sessionActions.createFailed())
    showToastError(error.response)
  } finally {
    yield put(loaderActions.changeStatus({ status: false }))
  }
}

function* watchGetRequest() {
  try {
    yield put(loaderActions.changeStatus({ status: true }))
    const response = yield call(Api.Session.show)
    yield put(sessionActions.getSuccess(response.data))
    yield put(loaderActions.changeStatus({ status: false }))
  } catch (error) {
    yield put(sessionActions.getFailed())
    showToastError(error.response)
  } finally {
    yield put(loaderActions.changeStatus({ status: false }))
  }
}

function* watchDeleteRequest() {
  try {
    yield put(loaderActions.changeStatus({ status: true }))
    yield call(Api.Session.delete)
    yield put(sessionActions.deleteSuccess())
    yield put(loaderActions.changeStatus({ status: false }))
    // navigate(ROUTES.root)
    yield put(currentUserActions.reset())
  } catch (error) {
    yield put(sessionActions.deleteFailed())
    showToastError(error.response)
  } finally {
    yield put(loaderActions.changeStatus({ status: false }))
  }
}
