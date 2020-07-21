import React from 'react'
import PropTypes from 'prop-types'

import SignInForm from 'Organisms/SignInForm'

const SignIn = ({ handleSubmit, isCreating }) => (
  <SignInForm handleSubmit={handleSubmit} isCreating={isCreating} />
)

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
}

export default SignIn
