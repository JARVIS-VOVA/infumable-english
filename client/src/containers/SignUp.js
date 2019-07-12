import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'

import SignUpComponent from '../components/pages/SignUp'

class SignUp extends Component {
  handleSubmit = () => {
    // TODO: Add create user
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
  createUser: () => { /* Add dispatch createUser */ }
})

SignUp.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  signUpForm: PropTypes.object,
  valid: PropTypes.bool.isRequired
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'signUp' })
)(SignUp)
