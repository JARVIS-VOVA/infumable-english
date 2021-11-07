import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash.isempty'

import NotFound from 'Components/pages/NotFound'

const PrivateRoute = ({ component: Component, currentUser, ...props }) => {
  if (isEmpty(currentUser)) return <NotFound />

  return <Component {...props} />
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.item,
})

PrivateRoute.propTypes = ({
  currentUser: PropTypes.object,
})

export default connect(mapStateToProps)(PrivateRoute)
