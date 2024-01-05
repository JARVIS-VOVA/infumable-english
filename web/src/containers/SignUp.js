import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect, useDispatch, useSelector } from 'react-redux'
import { compose } from 'redux'

// import router from '../config/createRouter'
// import { resourceCreateRequest } from 'Store/user/actions'
import SignUpComponent from 'organisms/SignUp'
import { userActions } from 'store/actions'

const SignUp = () => {
  const dispatch = useDispatch()
  const isCreating = useSelector(state => state.user.isCreating)

  const onSubmit = data => {
    dispatch(userActions.createRequest({ user: data }))
      .then(() => console.log('!!!!!!'))
      .then(() => console.log('!!!!!!', data))
      .then(() => console.log('!!!!!!'))
      // .then(() => router.navigate('signIn'))
  }

  return <SignUpComponent handleSubmit={onSubmit} isCreating={isCreating} />
}

export default SignUp
