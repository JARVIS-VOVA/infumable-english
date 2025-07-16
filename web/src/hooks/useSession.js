import { useDispatch, useSelector } from 'react-redux'

import { sessionActions } from 'src/store/actions'

const useSession = () => {
  const dispatch = useDispatch()

  const sessionItem = useSelector(state => state.session.item)
  const isSessionGetting = useSelector(state => state.session.isGetting)
  const isSessionCreating = useSelector(state => state.session.isCreating)

  const isAuthenticated = sessionItem.authenticated

  const createSession = data => {
    dispatch(sessionActions.createRequest(data))
  }

  const getSession = () => {
    dispatch(sessionActions.getRequest())
  }

  const onLogout = () => {
    dispatch(sessionActions.deleteRequest())
  }

  return {
    isAuthenticated,
    createSession,
    isSessionCreating,
    getSession,
    isSessionGetting,
    onLogout,
  }
}

export default useSession
