import React from 'react'
import PropTypes from 'prop-types'

import { AuthenticationButton } from '../../atoms'
import SignInForm from '../SignInForm'

import './styles.scss'

const SignIn = ({ isValidForm, handleSubmit }) => (
  <>
    <h1 className='title'>Sign In</h1>

    <div className='sign-in'>
      <div className='form'>
        <SignInForm />
      </div>

      <div className='button'>
        <AuthenticationButton
            isValidForm={isValidForm}
            handleSubmit={handleSubmit}>
          Sign In
        </AuthenticationButton>
      </div>
    </div>
  </>
)

SignIn.propTypes = {
  isValidForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignIn
