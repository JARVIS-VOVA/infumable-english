import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { HeaderLeft, HeaderRight, HeaderItem } from 'Atoms'
import ROUTES from 'Constants/routes'

const HeaderGuest = ({ router, isToggle }) => (
  <>
    <HeaderLeft isToggle={isToggle}>
      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.ROOT}>Home</Link>
      </HeaderItem>
    </HeaderLeft>

    <HeaderRight isToggle={isToggle}>
      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </HeaderItem>

      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </HeaderItem>
    </HeaderRight>
  </>
)

HeaderGuest.propTypes = {
  router: PropTypes.object.isRequired,
  isToggle: PropTypes.bool.isRequired,
}

export default HeaderGuest
