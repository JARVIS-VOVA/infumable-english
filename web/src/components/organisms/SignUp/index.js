import React from 'react'
import { Form, Field } from 'react-final-form'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'
import PersonIcon from '@mui/icons-material/Person'
import _ from 'lodash'

import { useUsers } from 'src/hooks'
import { composeValidators, required, email, minLengthPassword, passwordsMatch } from 'src/helpers/validations/fieldLevelValidation'
import { loginImg } from 'src/assets/img'

const SignUp = () => {
  const { createUser, isUserCreating } = useUsers()

  return (
    <>
      <Box component='img' src={loginImg} sx={{ display: 'flex', margin: '0 auto', width: '50%', maxWidth: '300px' }} />

      <Form
        onSubmit={createUser}
        // TODO: Remove initialValues
        initialValues={{ email: 'user@example.com', username: 'Mary Poppins', password: 'password', passwordConfirmation: 'password' }}
        render={({ handleSubmit, values, invalid }) => (
          <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 auto',
              gap: 3,
              maxWidth: 500,
            }}
          >
            <Field
              name='email'
              validate={composeValidators(required, email)}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  placeholder='Email'
                  helperText={meta.touched && meta.error && meta.error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AlternateEmailIcon fontSize='small' />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Field
              name='username'
              validate={required}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  placeholder='Username'
                  helperText={meta.touched && meta.error && meta.error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <PersonIcon fontSize='small' />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Field
              name='password'
              validate={composeValidators(required, minLengthPassword)}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  type='password'
                  placeholder='Password'
                  helperText={meta.touched && meta.error && meta.error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <KeyIcon fontSize='small' sx={{ transform: 'scaleX(-1) rotate(45deg)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Field
              name='passwordConfirmation'
              validate={composeValidators(required, minLengthPassword, passwordsMatch(values.password))}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  type='password'
                  placeholder='Password confirmation'
                  helperText={meta.touched && meta.error && meta.error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <KeyIcon fontSize='small' sx={{ transform: 'scaleX(-1) rotate(45deg)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button size='large' variant='contained' disabled={invalid} type='submit'>
              {isUserCreating ? 'Loading...' : 'Sign Up'}
            </Button>
          </Box>
        )}
      />
    </>
  )
}

export default SignUp
