import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'

import { AuthenticationButton, ReduxField, FormByCenter } from 'Components/atoms'
import { composeValidators, required, email, minLengthPassword, passwordsMatch } from 'Validations/fieldLevelValidation'

// TODO: Remove initialValues

const SignUpForm = ({ handleSubmit }) => (
  <Form
    onSubmit={handleSubmit}
    initialValues={{ email: 'example@gmail.com', username: 'Mary Poppins', password: 'password', passwordConfirmation: 'password' }}
    render={({ handleSubmit, form, submitting, pristine, values, invalid }) => (
      <FormByCenter onSubmit={handleSubmit}>
        <Field
          name='email'
          placeholder='Email'
          type='email'
          component={ReduxField}
          validate={composeValidators(required, email)} />

        <Field
          name='username'
          placeholder='Username'
          type='text'
          component={ReduxField}
          validate={required} />

        <Field
          name='password'
          placeholder='Password'
          type='password'
          component={ReduxField}
          validate={composeValidators(required, minLengthPassword)} />

        <Field
          name='passwordConfirmation'
          placeholder='Password confirmation'
          type='password'
          component={ReduxField}
          validate={composeValidators(required, minLengthPassword, passwordsMatch(values))} />

        <div className='button'>
          <AuthenticationButton
              disabled={invalid}
              handleSubmit={handleSubmit}>
            Sign Up
          </AuthenticationButton>
        </div>
      </FormByCenter>
    )}
  />
)

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default SignUpForm
