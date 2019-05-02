import React from 'react'
import PropTypes from 'prop-types'

import { DefaultReduxFormButton } from '../../atoms'
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
        <DefaultReduxFormButton
            isValidForm={isValidForm}
            handleSubmit={handleSubmit}>
          Sign Up
        </DefaultReduxFormButton>
      </div>
    </div>
  </>
)

SignUp.propTypes = {
  isValidForm: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default SignUp
