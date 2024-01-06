import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import Api from 'src/helpers/api'
import SignInComponent from 'src/components/organisms/SignIn'
import { currentUserActions, loaderActions, sessionActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'
import { AUTHENTICATED_COOKIE_KEY } from 'src/App'
import ROUTES from 'src/constants/routes'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSessionCreating = useSelector(state => state.session.isCreating)
  const [_cookies, setCookie, removeCookie] = useCookies()

  const handleSubmit = async data => {
    try {
      dispatch(sessionActions.createRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.create(data)
      dispatch(sessionActions.createSuccess())
      dispatch(loaderActions.changeStatus({ status: false }))
      setCookie(AUTHENTICATED_COOKIE_KEY, true)
      dispatch(currentUserActions.getRequest())
      toast.success('You have successfully logged in!')
      navigate(ROUTES.words)
    } catch (error) {
      dispatch(sessionActions.createFailed())
      dispatch(loaderActions.changeStatus({ status: false }))
      showToastError(error)
      removeCookie(AUTHENTICATED_COOKIE_KEY)
    }
  }

  return <SignInComponent handleSubmit={handleSubmit} isCreating={isSessionCreating} />
}

export default SignIn
