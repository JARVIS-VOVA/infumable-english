import React from 'react'
import { Field } from 'redux-form'

import { ReduxField } from '../../atoms'
import { required, email, minLengthPassword } from '../../../validations/fieldLevelValidation'

const SignInForm = () => (
  <>
    <Field
        name='email'
        label='Email'
        type='email'
        component={ReduxField}
        validate={[required, email]} />

    <Field
        name='password'
        label='Password'
        type='password'
        component={ReduxField}
        validate={[required, minLengthPassword]} />
  </>
)

export default SignInForm
