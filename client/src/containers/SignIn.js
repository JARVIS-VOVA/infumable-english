import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'

import router from '../config/createRouter'
import { resourceCreateRequest } from '../store/session/actions'
import SignInComponent from '../components/pages/SignIn'

class SignIn extends Component {
  handleSubmit = () => {
    const { createSession, signInForm } = this.props

    createSession(signInForm.values)
      .then(() => router.navigate('word'))
  }

  render() {
    const { valid } = this.props

    return (
      <SignInComponent
          isValidForm={valid}
          handleSubmit={this.handleSubmit} />
    )
  }
}

const mapStateToProps = state => ({
  isCreating: state.session.isCreating,
  signInForm: state.form.signIn
})

const mapDispatchToProps = dispatch => ({
  createSession: data => dispatch(resourceCreateRequest({ data }))
})

SignIn.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  signInForm: PropTypes.object,
  valid: PropTypes.bool.isRequired
}

// TODO: Remove initialValues

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signIn', initialValues: { email: 'example3@gmail.com', password: 'password' } })
)(SignIn)
