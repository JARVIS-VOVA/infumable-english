import { useDispatch, useSelector } from 'react-redux'

import { currentUserActions } from 'src/store/actions'

const useCurrentUser = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.currentUser.item)
  const isCurrentUserGetting = useSelector(state => state.currentUser.isGetting)

  const getCurrentUser = () => {
    dispatch(currentUserActions.getRequest())
  }

  const resetCurrentUser = () => {
    dispatch(currentUserActions.reset())
  }

  return {
    currentUser,
    getCurrentUser,
    isCurrentUserGetting,
    resetCurrentUser,
  }
}

export default useCurrentUser
