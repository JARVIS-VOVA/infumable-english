import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LoaderComponent from 'src/components/organisms/Loader'

const Loader = () => {
  const { status } = useSelector(state => state.loader)

  return <LoaderComponent isLoading={status} />
}

// TODO: propTypes for useSelector

Loader.propTypes = {
  // loader: PropTypes.bool.isRequired
}

export default Loader
