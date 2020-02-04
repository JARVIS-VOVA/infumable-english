import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const AuthenticationButton = ({ isValidForm, handleSubmit, children }) => (
  <button
      disabled={!isValidForm}
      className={isValidForm ? 'valid' : 'invalid'}
      onClick={handleSubmit}
  >
    {children}
  </button>
)

AuthenticationButton.propTypes = {
  isValidForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default AuthenticationButton
