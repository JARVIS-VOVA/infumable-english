import React, { Component } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types'
import { compose } from 'redux'

import { pending, rejected, fulfilled, done } from 'redux-saga-thunk'
import { useNavigate } from 'react-router-dom'
// import { resourceCreateRequest } from '../store/session/actions'
import SignInComponent from 'organisms/SignIn'

import { sessionActions } from 'store/actions'

const SignIn = ({ error }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isCreating = useSelector(state => state.session.isCreating)

  const createSession = data => dispatch(sessionActions.createRequest(data))

  const handleSubmit = data => {
    createSession(data)
      // .then(() => handleClick())   // router.navigate('word')
      .then(response => {
        console.log('Success sign in. Response: ', response)
        navigate('/')
      })
      // .rejected(error => console.log('Error: ', error))
  }

  return <SignInComponent handleSubmit={handleSubmit} isCreating={isCreating} />
}

const mapStateToProps = state => ({
  error: rejected(state, 'CURRENT_USER/GET_REQUEST'),
  anythingWasRejected: rejected(state),
})

SignIn.propTypes = {
  // isCreating: PropTypes.bool.isRequired,
}

export default compose(
  connect(mapStateToProps),
)(SignIn)
