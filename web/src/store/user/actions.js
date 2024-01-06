import USER from './constants'

export default {
  createRequest: () => ({
    type: USER.CREATE_REQUEST,
  }),

  createSuccess: () => ({
    type: USER.CREATE_SUCCESS,
  }),

  createFailed: () => ({
    type: USER.CREATE_FAILED,
  }),
}
