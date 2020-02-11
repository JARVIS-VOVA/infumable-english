import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import isEmpty from 'lodash.isempty'

import NotFound from 'Components/pages/NotFound'

const PublicRoute = ({ component: Component, currentUser, ...props }) => {
  if (isEmpty(currentUser)) return <Component {...props} />

  return <NotFound />
}

const mapStateToProps = state => ({
  currentUser: state.currentUser.item,
})

PublicRoute.propTypes = ({
  currentUser: PropTypes.object,
})

export default connect(mapStateToProps)(PublicRoute)
