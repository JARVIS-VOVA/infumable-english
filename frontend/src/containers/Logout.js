import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import router from '../config/createRouter'
import { resourceDeleteRequest } from '../store/session/actions'

class Logout extends Component {
  async componentDidMount() {
    await this.props.logoutSession()

    router.navigate('signIn')
  }

  render() {
    return null
  }
}

const mapStateToProps = state => ({
  isDeleting: state.session.isDeleting
})

const mapDispatchToProps = dispatch => ({
  logoutSession: () => dispatch(resourceDeleteRequest())
})

Logout.propTypes = {
  isDeleting: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
