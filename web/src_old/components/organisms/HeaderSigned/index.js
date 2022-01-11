import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ROUTES from 'Constants/routes'
import { HeaderLeft, HeaderRight, HeaderItem } from 'Atoms'

const HeaderSigned = ({ router, isToggle }) => (
  <>
    <HeaderLeft isToggle={isToggle}>
      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.ROOT}>Home</Link>
      </HeaderItem>
    </HeaderLeft>

    <HeaderRight isToggle={isToggle}>
      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.WORDS}>Words</Link>
      </HeaderItem>

      <HeaderItem isToggle={isToggle}>
        <Link to={ROUTES.LOGOUT}>Logout</Link>
      </HeaderItem>
    </HeaderRight>
  </>
)

HeaderSigned.propTypes = {
  router: PropTypes.object.isRequired,
  isToggle: PropTypes.bool.isRequired,
}

export default HeaderSigned
