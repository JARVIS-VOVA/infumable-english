import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'

import { AuthenticationButton, ReduxField, FormByCenter } from 'Atoms'
import { composeValidators, required, email, minLengthPassword } from 'Validations/fieldLevelValidation'

const SignInForm = ({ handleSubmit }) => {
  // TODO: Remove initialValues

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={{ login: 'MaryPoppins', password: 'password' }}
      render={({ handleSubmit, form, submitting, pristine, values, invalid }) => (
        <FormByCenter onSubmit={handleSubmit}>
          <Field
            name='login'
            placeholder='Login'
            type='text'
            component={ReduxField}
            validate={required} />

          <Field
            name='password'
            placeholder='Password'
            type='password'
            component={ReduxField}
            validate={composeValidators(required, minLengthPassword)} />

          <div className='button'>
            <AuthenticationButton
                disabled={invalid}
                handleSubmit={handleSubmit}>
              Sign In
            </AuthenticationButton>
          </div>
        </FormByCenter>
      )}
    />
  )
}

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default SignInForm
