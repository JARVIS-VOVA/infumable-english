import React from 'react'
import { Field } from 'redux-form'

import { ReduxField } from '../../atoms'
import { required, passwordsMatch, email, minLengthPassword } from '../../../validations/fieldLevelValidation'

const SignUpForm = () => (
  <>
    <Field
        name='email'
        label='Email'
        type='email'
        component={ReduxField}
        validate={[required, email]} />

    <Field
        name='login'
        label='Login'
        type='text'
        component={ReduxField}
        validate={required} />

    <Field
        name='password'
        label='Password'
        type='password'
        component={ReduxField}
        validate={[required, minLengthPassword]} />

    <Field
        name='passwordConfirmation'
        label='Password confirmation'
        type='password'
        component={ReduxField}
        validate={[required, minLengthPassword, passwordsMatch]} />
  </>
)

export default SignUpForm
