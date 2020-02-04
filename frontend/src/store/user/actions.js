import {
  DEFAULT_RESOURCE,
  RESOURCE_CREATE_REQUEST, RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_FAILURE
} from './constants'

export const resourceCreateRequest = ({ resource=DEFAULT_RESOURCE, data }) => ({
  type: RESOURCE_CREATE_REQUEST,
  payload: data,
  resource,
  meta: {
    thunk: true
  }
})

export const resourceCreateSuccess = (resource, meta) => ({
  type: RESOURCE_CREATE_SUCCESS,
  resource,
  meta
})

export const resourceCreateFailure = (resource, error, meta) => ({
  type: RESOURCE_CREATE_FAILURE,
  payload: error,
  resource,
  meta
})
