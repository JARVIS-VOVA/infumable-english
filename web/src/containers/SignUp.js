import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import SignUpComponent from 'src/components/organisms/SignUp'
import { loaderActions, userActions, currentUserActions } from 'src/store/actions'
import Api from 'src/helpers/api'
import showToastError from 'src/helpers/showToastError'
import { AUTHENTICATED_COOKIE_KEY } from 'src/App'
import ROUTES from 'src/constants/routes'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [_cookies, setCookie] = useCookies()
  const isCreating = useSelector(state => state.user.isCreating)

  const onSubmit = async data => {
    try {
      dispatch(loaderActions.changeStatus({ status: true }))
      dispatch(userActions.createRequest())
      await Api.User.create({ user: data })
      dispatch(userActions.createSuccess())
      dispatch(loaderActions.changeStatus({ status: false }))
      dispatch(currentUserActions.getRequest())
      toast.success('User was successfully created')
      navigate(ROUTES.words)
      setCookie(AUTHENTICATED_COOKIE_KEY, true)
    } catch (error) {
      dispatch(userActions.createFailed())
      dispatch(loaderActions.changeStatus({ status: false }))
      showToastError(error)
    }
  }

  return <SignUpComponent handleSubmit={onSubmit} isCreating={isCreating} />
}

export default SignUp
