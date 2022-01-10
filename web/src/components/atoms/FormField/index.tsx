import React, { FC } from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'

import WrapperField from './styled'

export interface FieldRenderProps<FieldValue, T extends HTMLElement = HTMLElement> {
  placeholder: string
  input: FieldInputProps<FieldValue, T>
  meta: FieldMetaState<FieldValue>
}

const FormField: FC<FieldRenderProps<string, HTMLElement>> = ({ placeholder, input, meta: { touched, error } }) => {
  const isValid = () => touched && error
  const switchBorder = () => isValid() ? 'validation-border-error' : 'validation-border-success'
  const errorMessage = () => isValid() && <span className='text-error'>{error}</span>
  
  return (
    <WrapperField>
      <input
        {...input}
        className={`input ${switchBorder()}`}
        placeholder={placeholder}
      />

      <div>
        {errorMessage()}
      </div>
    </WrapperField>
  )
}

export default FormField
