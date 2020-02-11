import React from 'react'
import PropTypes from 'prop-types'

import StyledAuthenticationButton from './styled'

const AuthenticationButton = ({ disabled, handleSubmit, children }) => (
  <StyledAuthenticationButton
      disabled={disabled}
      className={disabled ? 'invalid' : 'valid'}
      onClick={handleSubmit}
  >
    {children}
  </StyledAuthenticationButton>
)

AuthenticationButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default AuthenticationButton
