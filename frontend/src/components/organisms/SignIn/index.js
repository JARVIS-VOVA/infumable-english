import React from 'react'
import PropTypes from 'prop-types'

import SignInForm from 'Organisms/SignInForm'

const SignIn = ({ handleSubmit }) => (
  <SignInForm handleSubmit={handleSubmit} />
)

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default SignIn
