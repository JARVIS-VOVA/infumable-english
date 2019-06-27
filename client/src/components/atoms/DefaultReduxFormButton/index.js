import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const AuthenticationButton = ({ isValidForm, onSubmit, children }) => (
  <button
      disabled={!isValidForm}
      className={isValidForm ? 'valid' : 'invalid'}
      onClick={onSubmit}
  >
    {children}
  </button>
)

AuthenticationButton.propTypes = {
  isValidForm: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default AuthenticationButton
