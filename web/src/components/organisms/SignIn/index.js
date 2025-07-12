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
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import _ from 'lodash'
import { useNavigate } from 'react-router-dom'

import { composeValidators, required, email, minLengthPassword } from 'src/helpers/validations/fieldLevelValidation'
import { loginImg } from 'src/assets/img'
import Api from 'src/helpers/api'
import { currentUserActions, loaderActions, sessionActions } from 'src/store/actions'
import showToastError from 'src/helpers/showToastError'
import ROUTES from 'src/constants/routes'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isCreating = useSelector(state => state.session.isCreating)

  const handleSubmit = async data => {
    try {
      dispatch(sessionActions.createRequest())
      dispatch(loaderActions.changeStatus({ status: true }))
      await Api.Session.create(data)
      dispatch(sessionActions.createSuccess())
      dispatch(loaderActions.changeStatus({ status: false }))
      dispatch(currentUserActions.getRequest())
      toast.success('You have successfully logged in!')
      navigate(ROUTES.terms)
    } catch (error) {
      dispatch(sessionActions.createFailed())
      dispatch(loaderActions.changeStatus({ status: false }))
      showToastError(error)
    }
  }

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

            <Button size='large' variant='contained' disabled={invalid} type='submit'>
              {isCreating ? 'Loading...' : 'Sign In'}
            </Button>
          </Box>
        )}
      />
    </>
  )
}

export default SignIn
