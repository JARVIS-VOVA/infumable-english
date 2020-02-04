import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'

import { resourceGetRequest } from './store/session/actions'

import Nav from './containers/Nav'
import Loader from './containers/Loader'
import SwitchRoute from './SwitchRoute'

class App extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <>
        <Nav />
        <Loader />
        <SwitchRoute />
      </>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(resourceGetRequest())
})

App.propTypes = {
  getUser: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(App)
