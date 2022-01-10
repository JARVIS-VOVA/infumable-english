import React, { FC } from 'react'
import { Field, Form } from 'react-final-form'

import { useActions } from 'Hooks/useActions'
import { UserLoginType } from 'Types/index'
import { composeValidators, required, email, minLengthPassword } from 'Services/validations'
import FormField from 'Atoms/FormField'

// TODO: Remove initialValues
const initialState = {
  email: 'test@gmail.com',
  password: 'test123',
}

type initialStateType = typeof initialState

const LoginForm: FC = () => {
  const {sessionCreate} = useActions()

  const handleSubmit = (values: initialStateType) => {
    const data: UserLoginType = {
      session: {
        email: values.email,
        password: values.password,
      }
    }

    sessionCreate(data)
  }
  
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialState}
      render={({ handleSubmit }) => (
        <div>
          <p>Login Form</p>

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
              <label>Password</label>
              <Field
                name='password'
                placeholder='Password'
                type='password'
                component={FormField}
                validate={composeValidators(required, minLengthPassword)}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    />
  )
}

export default LoginForm
