import React from 'react'
import { Field, Form } from 'react-final-form'

import { useActions } from 'Hooks/useActions'
import { UserRegistrationType } from 'Types/index'
import { composeValidators, required, email, minLengthPassword, passwordsMatch } from 'Services/validations'
import FormField from 'Atoms/FormField'

// TODO: Remove initialValues
const initialState = {
  email: 'test@gmail.com',
  username: 'test',
  password: 'test123',
  passwordConfirmation: 'test123'
}

type initialStateType = typeof initialState

const RegistrationForm = () => {
  const {userCreate} = useActions()

  const handleSubmit = (values: initialStateType) => {
    const data: UserRegistrationType = {
      user: {
        email: values.email,
        username: values.username,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation
      }
    }

    userCreate(data)
  }
  
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialState}
      render={({ handleSubmit, values }) => (
        <div>
          <p>Registration Form</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Email</label>
              <Field
                name='email'
                placeholder='Email'
                type='text'
                component={FormField}
                validate={composeValidators(required, email)}
              />
            </div>

            <div>
              <label>Username</label>
              <Field
                name='username'
                placeholder='Username'
                type='text'
                component={FormField}
                validate={required}
              />
            </div>

            <div>
              <label>Password</label>
              <Field
                name='password'
                placeholder='Password'
                type='password'
                component={FormField}
                validate={composeValidators(required, minLengthPassword)}
              />
            </div>

            <div>
              <label>Confirm password</label>
              <Field
                name='passwordConfirmation'
                placeholder='Repeat password'
                type='password'
                component={FormField}
                validate={composeValidators(required, minLengthPassword, passwordsMatch(values))}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    />
  )
}

export default RegistrationForm
