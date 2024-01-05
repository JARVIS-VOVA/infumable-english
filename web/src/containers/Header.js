import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import HeaderComponent from 'organisms/Header'

const Header = ({ router, currentUser }) => {
  return <HeaderComponent router={router} currentUser={currentUser} />
}

const mapStateToProps = state => ({
  router: state.router,
  currentUser: state.currentUser.item,
})

Header.propTypes = {
  router: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
}

export default connect(mapStateToProps)(Header)
