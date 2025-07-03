import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Api from 'src/helpers/api'
import { sessionActions, currentUserActions, loaderActions } from 'src/store/actions'
import ROUTES from 'src/constants/routes'

const useSession = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      dispatch(sessionActions.deleteRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.delete()
      dispatch(sessionActions.deleteSuccess())
      navigate(ROUTES.root)
      dispatch(currentUserActions.reset())
    } catch (error) {
      dispatch(sessionActions.deleteFailed())
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  return {
    onLogout,
  }
}

export default useSession
