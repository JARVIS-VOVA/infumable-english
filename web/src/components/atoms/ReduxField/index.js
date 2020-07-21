import React from 'react'
import PropTypes from 'prop-types'

import WrapperField from './styled'

const FieldForm = ({ input, placeholder, options = [], meta: { touched, error } }) => {
  const isValid = () => touched && error
  const switchBorder = () => isValid() ? 'validation-border-error' : 'validation-border-success'
  const errorMessage = () => isValid() && <span className='text-error'>{error}</span>

  return (
    <WrapperField>
      <input
          {...input}
          className={`input ${switchBorder()}`}
          placeholder={placeholder} />

      <div className='view-error'>
        {errorMessage()}
      </div>
    </WrapperField>
  )
}

FieldForm.propTypes = {
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  }).isRequired
}

export default FieldForm
