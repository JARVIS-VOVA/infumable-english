import {
  RESOURCE_CHANGE_STATUS
} from './constants'

export const resourceChangeStatus = data => ({
  type: RESOURCE_CHANGE_STATUS,
  payload: data
})
