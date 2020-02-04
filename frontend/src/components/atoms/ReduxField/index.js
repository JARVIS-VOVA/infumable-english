import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const ReduxField = ({ input, label, type, options = [], meta: { touched, error } }) => {
  const isValid = () => touched && error
  const switchBorder = () => isValid() ? 'validation-border-error' : 'validation-border-success'
  const errorMessage = () => isValid() && <span className='text-error'>{error}</span>

  return (
    <div className='wrapper-field'>
      <input
          {...input}
          className={`input ${switchBorder()}`}
          placeholder={label}
          type={type} />

      <div className='view-error'>
        {errorMessage()}
      </div>
    </div>
  )
}

ReduxField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  options: PropTypes.array,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired
}

export default ReduxField
