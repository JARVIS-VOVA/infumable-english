import React from 'react'
import PropTypes from 'prop-types'

import SignUpForm from 'Organisms/SignUpForm'

const SignUp = ({ handleSubmit }) => (
  <SignUpForm handleSubmit={handleSubmit} />
)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp
