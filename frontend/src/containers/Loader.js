import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoaderComponent from '../components/pages/Loader'

class Loader extends Component {
  render() {
    const { loader } = this.props

    return <LoaderComponent loader={loader} />
  }
}

const mapStateToProps = state => ({
  loader: state.loader.status
})

Loader.propTypes = {
  loader: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Loader)
