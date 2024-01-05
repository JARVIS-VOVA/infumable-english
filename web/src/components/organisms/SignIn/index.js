import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import {
  Box,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import KeyIcon from '@mui/icons-material/Key'

import { composeValidators, required, email, minLengthPassword } from 'validations/fieldLevelValidation'
import { loginImg } from 'img'

const SignIn = props => {
  const { handleSubmit, isCreating } = props

  return (
    <>
      <Box component='img' src={loginImg} sx={{ display: 'flex', margin: '0 auto', width: '50%', maxWidth: '300px' }} />

      <Form
        onSubmit={handleSubmit}
        // TODO: Remove initialValues
        initialValues={{ email: 'user@example.com', password: 'password' }}
        render={({ handleSubmit, invalid }) => (
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

            <Button size='large' variant='contained' disabled={invalid}>
              {isCreating ? 'Loading...' : 'Sign In'}
            </Button>
          </Box>
        )}
      />
    </>
  )
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
}

export default SignIn
