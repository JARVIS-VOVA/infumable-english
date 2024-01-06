import CURRENT_USER from './constants'

export default {
  getRequest: () => ({
    type: CURRENT_USER.GET_REQUEST,
  }),

  getSuccess: payload => ({
    type: CURRENT_USER.GET_SUCCESS,
    payload,
  }),

  getFailed: () => ({
    type: CURRENT_USER.GET_FAILED,
  }),


  logout: () => ({
    type: CURRENT_USER.LOGOUT,
  }),
}
