import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

import Api from 'src/helpers/api'
import SignInComponent from 'src/components/organisms/SignIn'
import { currentUserActions, loaderActions, sessionActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'
import ROUTES from 'src/constants/routes'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isSessionCreating = useSelector(state => state.session.isCreating)

  const handleSubmit = async data => {
    try {
      dispatch(sessionActions.createRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.create(data)
      dispatch(sessionActions.createSuccess())
      dispatch(loaderActions.changeStatus({ status: false }))
      dispatch(currentUserActions.getRequest())
      toast.success('You have successfully logged in!')
      navigate(ROUTES.terms)
    } catch (error) {
      dispatch(sessionActions.createFailed())
      dispatch(loaderActions.changeStatus({ status: false }))
      showToastError(error)
    }
  }

  return <SignInComponent handleSubmit={handleSubmit} isCreating={isSessionCreating} />
}

export default SignIn
