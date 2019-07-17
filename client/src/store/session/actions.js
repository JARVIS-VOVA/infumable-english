import {
  DEFAULT_RESOURCE,
  RESOURCE_CREATE_REQUEST, RESOURCE_CREATE_SUCCESS, RESOURCE_CREATE_FAILURE,
  RESOURCE_GET_REQUEST, RESOURCE_GET_SUCCESS, RESOURCE_GET_FAILURE,
  RESOURCE_DELETE_REQUEST, RESOURCE_DELETE_SUCCESS, RESOURCE_DELETE_FAILURE
} from './constants'

export const resourceCreateRequest = ({ resource=DEFAULT_RESOURCE, data }) => ({
  type: RESOURCE_CREATE_REQUEST,
  payload: data,
  resource,
  meta: {
    thunk: true
  }
})

export const resourceCreateSuccess = (resource, data, meta) => ({
  type: RESOURCE_CREATE_SUCCESS,
  payload: data,
  resource,
  meta
})

export const resourceCreateFailure = (resource, error, meta) => ({
  type: RESOURCE_CREATE_FAILURE,
  payload: error,
  resource,
  meta
})

export const resourceGetRequest = (resource=DEFAULT_RESOURCE) => ({
  type: RESOURCE_GET_REQUEST,
  resource
})

export const resourceGetSuccess = (resource, payload) => ({
  type: RESOURCE_GET_SUCCESS,
  payload,
  resource
})

export const resourceGetFailure = (resource, error, meta) => ({
  type: RESOURCE_GET_FAILURE,
  payload: error,
  resource
})

export const resourceDeleteRequest = (resource=DEFAULT_RESOURCE) => ({
  type: RESOURCE_DELETE_REQUEST,
  resource,
  meta: {
    thunk: true
  }
})

export const resourceDeleteSuccess = (resource, meta) => ({
  type: RESOURCE_DELETE_SUCCESS,
  resource,
  meta
})

export const resourceDeleteFailure = (resource, meta) => ({
  type: RESOURCE_DELETE_FAILURE,
  resource,
  meta
})
