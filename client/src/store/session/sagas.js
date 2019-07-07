import { takeLatest, call, put } from 'redux-saga/effects'

import { api } from '../../lib/api'

import * as actions from './actions'
import { resourceChangeStatus } from '../loader/actions'

import {
  RESOURCE_CREATE_REQUEST, RESOURCE_GET_REQUEST, RESOURCE_DELETE_REQUEST
} from './constants'

export default function* watcherSaga() {
  yield takeLatest(RESOURCE_CREATE_REQUEST, watchResourceCreateRequest)
  yield takeLatest(RESOURCE_GET_REQUEST, watchResourceGetRequest)
  yield takeLatest(RESOURCE_DELETE_REQUEST, watchResourceDeleteRequest)
}

function* watchResourceCreateRequest({ payload, resource, meta }) {
  try {
    const response = yield call(createResource, resource, payload)

    yield put(actions.resourceCreateSuccess(resource, response, meta))
  } catch (error) {
    yield put(actions.resourceCreateFailure(resource, error, meta))
  }
}

function* createResource(resource, data) {
  return yield call(api, resource, 'POST', data)
}

function* watchResourceGetRequest({ resource }) {
  try {
    yield put(resourceChangeStatus({ status: true }))

    const response = yield call(getResource, resource)
    yield put(actions.resourceGetSuccess(resource, response.data))

    yield put(resourceChangeStatus({ status: false }))
  } catch (error) {
    yield put(resourceChangeStatus({ status: false }))
    yield put(actions.resourceGetFailure(resource, error))
  }
}

function* getResource(resource) {
  return yield call(api, resource, 'GET')
}

function* watchResourceDeleteRequest({ resource, meta }) {
  try {
    const response = yield call(deleteResource, resource)

    yield put(actions.resourceDeleteSuccess(resource, meta))
  } catch (error) {
    yield put(actions.resourceDeleteFailure(resource, meta))
  }
}

function* deleteResource(resource) {
  return yield call(api, resource, 'DELETE')
}
