import React from 'react'
import PropTypes from 'prop-types'

import StyledAuthenticationButton from './styled'

const AuthenticationButton = ({ disabled, handleSubmit, children, isLoading }) => {
  const renderChildren = () => isLoading ? 'Loading...' : children

  return (
    <StyledAuthenticationButton
      disabled={disabled}
      className={disabled ? 'invalid' : 'valid'}
      onClick={handleSubmit}
    >
      {renderChildren()}
    </StyledAuthenticationButton>
  )
}

AuthenticationButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

export default AuthenticationButton
