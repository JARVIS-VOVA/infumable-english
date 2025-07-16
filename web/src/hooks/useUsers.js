import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import { useCreateUserMutation } from 'src/api/usersApi'
import { loaderActions, sessionActions } from 'src/store/actions'
import ROUTES from 'src/constants/routes'

const useUsers = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const [createUserRequest, { isLoading: isUserCreating }] = useCreateUserMutation()

  const createUser = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      await createUserRequest(data)
      dispatch(sessionActions.getRequest())
      toast.success('User was successfully created')
      // navigate(ROUTES.terms)
    } finally {
      dispatch(loaderActions.changeStatus({ status: false }))
    }
  }

  return {
    createUser,
    isUserCreating,
  }
}

export default useUsers
