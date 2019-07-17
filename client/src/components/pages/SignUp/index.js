import React from 'react'
import PropTypes from 'prop-types'

import { AuthenticationButton } from '../../atoms'
import SignUpForm from '../SignUpForm'

import './styles.scss'

const SignUp = ({ isValidForm, handleSubmit }) => (
  <>
    <h1 className='title'>SignUp</h1>

    <div className='sign-up'>
      <div className='form'>
        <SignUpForm />
      </div>

      <div className='button'>
        <AuthenticationButton
            isValidForm={isValidForm}
            handleSubmit={handleSubmit}>
          Sign Up
        </AuthenticationButton>
      </div>
    </div>
  </>
)

SignUp.propTypes = {
  isValidForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp
