import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import router from '../config/createRouter'
// import { resourceCreateRequest } from 'Store/user/actions'
import SignUpComponent from 'Organisms/SignUp'
import { userActions } from 'Store/actions'

const SignUp = ({ createUser }) => {
  const onSubmit = data => {
    createUser({ user: data })
      .then(() => console.log('!!!!!!'))
      .then(() => console.log('!!!!!!', data))
      .then(() => console.log('!!!!!!'))
      // .then(() => router.navigate('signIn'))
  }

  return <SignUpComponent handleSubmit={onSubmit} />
}

const mapStateToProps = state => ({
  isCreating: state.user.isCreating,
})

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(userActions.createRequest(data)),
})

SignUp.propTypes = {
  isCreating: PropTypes.bool.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SignUp)
