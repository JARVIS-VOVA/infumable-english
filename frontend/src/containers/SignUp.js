import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'

import router from '../config/createRouter'
import { resourceCreateRequest } from '../store/user/actions'
import SignUpComponent from '../components/pages/SignUp'

class SignUp extends Component {
  handleSubmit = () => {
    const { createUser, signUpForm } = this.props

    createUser(signUpForm.values)
      .then(() => router.navigate('signIn'))
  }

  render() {
    const { valid } = this.props

    return (
      <SignUpComponent
          isValidForm={valid}
          handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  isCreating: state.user.isCreating,
  signUpForm: state.form.signUp
})

const mapDispatchToProps = dispatch => ({
  createUser: data => dispatch(resourceCreateRequest({ data }))
})

SignUp.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  signUpForm: PropTypes.object,
  valid: PropTypes.bool.isRequired
}

// TODO: Remove initialValues

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signUp', initialValues: { email: 'example@gmail.com', login: 'MaryPoppins', password: 'password', passwordConfirmation: 'password' } })
)(SignUp)
