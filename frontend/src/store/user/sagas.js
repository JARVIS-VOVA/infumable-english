import { takeLatest, call, put } from 'redux-saga/effects'

import { api } from '../../lib/api'

import * as actions from './actions'

import {
  RESOURCE_CREATE_REQUEST
} from './constants'

export default function* watcherSaga() {
  yield takeLatest(RESOURCE_CREATE_REQUEST, watchResourceCreateRequest)
}

function* watchResourceCreateRequest({ payload, resource, meta }) {
  try {
    const response = yield call(createResource, resource, payload)

    yield put(actions.resourceCreateSuccess(resource, meta))
  } catch (error) {
    yield put(actions.resourceCreateFailure(resource, error, meta))
  }
}

function* createResource(resource, data) {
  return yield call(api, resource, 'POST', data)
}
