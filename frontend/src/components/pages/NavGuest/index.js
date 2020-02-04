import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BaseLink } from 'react-router5'

import { NavItem } from '../../atoms'

const NavGuest = ({ router }) => (
  <>
    <div className='left'>
      <BaseLink
          router={router}
          routeName='home'
          routeOptions={{ reload: true }}
      >
        <NavItem>Home</NavItem>
      </BaseLink>
    </div>
    <div className='right'>
      <BaseLink router={router} routeName='signUp'>
        <NavItem>Sign Up</NavItem>
      </BaseLink>
      <BaseLink router={router} routeName='signIn'>
        <NavItem>Sign In</NavItem>
      </BaseLink>
    </div>
  </>
)

NavGuest.propTypes = {
  router: PropTypes.object.isRequired
}

export default NavGuest
