import LOADER from './constants'

export default {
  changeStatus: data => ({
    type: LOADER.RESOURCE_CHANGE_STATUS,
    payload: data
  }),
}
